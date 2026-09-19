"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminLogin } from "@/actions/auth";

const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginValues = z.infer<typeof loginSchema>;

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginValues) {
    setIsSubmitting(true);
    setErrorMsg(null);

    const res = await adminLogin(values);

    if (res.success) {
      const redirect = searchParams.get("redirect") || "/admin";
      router.push(redirect);
      router.refresh();
      return;
    }

    setErrorMsg(res.error || "Invalid email or password.");
    setIsSubmitting(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-leaf-bg px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-leaf-muted transition-colors hover:text-leaf-navy"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to website
          </Link>

          <div className="mt-8 flex flex-col items-center">
            <Image
              src="/companyLogo/companyLogo.png"
              alt="LeafClutch Technology"
              width={56}
              height={56}
            />
            <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-leaf-green-dark">
              Admin Portal
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-leaf-navy">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-leaf-muted">
              Sign in with an admin account to manage the site.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-leaf-border bg-white p-6 shadow-sm sm:p-8">
          {errorMsg && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-leaf-navy">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                className="border-leaf-border"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-leaf-navy">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="border-leaf-border pr-10"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-leaf-muted hover:text-leaf-navy"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-auto w-full bg-leaf-green-dark py-3 text-white hover:bg-leaf-green"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminLoginForm />
    </Suspense>
  );
}
