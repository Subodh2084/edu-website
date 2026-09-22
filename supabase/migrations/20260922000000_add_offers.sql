CREATE TABLE IF NOT EXISTS public.offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL CHECK (char_length(trim(title)) >= 3),
  description TEXT NOT NULL CHECK (char_length(trim(description)) >= 5),
  thumbnail_url TEXT,
  price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
  discount_price NUMERIC(12, 2) NOT NULL CHECK (discount_price >= 0 AND discount_price <= price),
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS one_active_offer ON public.offers ((is_active)) WHERE is_active;

CREATE OR REPLACE FUNCTION public.deactivate_other_offers()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_active THEN
    UPDATE public.offers SET is_active = false, updated_at = now()
    WHERE id <> NEW.id AND is_active;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE TRIGGER deactivate_other_offers_before_save
  BEFORE INSERT OR UPDATE OF is_active ON public.offers
  FOR EACH ROW EXECUTE FUNCTION public.deactivate_other_offers();

CREATE TRIGGER set_offers_updated_at BEFORE UPDATE ON public.offers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active offer" ON public.offers FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access offers" ON public.offers FOR ALL
  USING (public.is_admin()) WITH CHECK (public.is_admin());

INSERT INTO storage.buckets (id, name, public) VALUES ('offers', 'offers', true)
ON CONFLICT (id) DO NOTHING;
CREATE POLICY "Public read offer images" ON storage.objects FOR SELECT USING (bucket_id = 'offers');
CREATE POLICY "Admin manage offer images" ON storage.objects FOR ALL
  USING (bucket_id = 'offers' AND public.is_admin())
  WITH CHECK (bucket_id = 'offers' AND public.is_admin());
