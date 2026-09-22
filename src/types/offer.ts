export interface Offer {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  price: number;
  discount_price: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
