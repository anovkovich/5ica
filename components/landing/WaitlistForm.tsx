"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Loader2, ArrowRight } from "lucide-react";
import { SuccessModal } from "./SuccessModal";

const schema = z.object({
  email: z.string().min(1, "Email je obavezan").email("Unesi validan email"),
});

type FormData = z.infer<typeof schema>;

type Props = {
  variant?: "hero" | "inline";
  source?: string;
};

export function WaitlistForm({ variant = "hero", source = "homepage" }: Props) {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/waitlist/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          source,
        }),
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        setSuccess(true);
        reset();
        toast.success(result.data?.message || "Uspešno si se prijavio/la!");
      } else {
        const errorMsg =
          result.error?.message || "Nešto nije u redu. Pokušaj ponovo.";
        toast.error(errorMsg);
      }
    } catch {
      toast.error("Nema interneta? Pokušaj ponovo.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto lg:mx-0 space-y-3"
        id={variant === "hero" ? "prijavi-se" : undefined}
      >
        {/* Email input */}
        <div className="relative">
          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 pointer-events-none"
          />
          <input
            type="email"
            placeholder="vas@email.rs"
            className="w-full pl-12 pr-4 py-3.5 text-base bg-base-100 border-2 border-base-300 rounded-2xl focus:outline-none focus:border-primary transition-colors placeholder:text-base-content/40 disabled:opacity-60"
            disabled={isSubmitting}
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="text-error text-sm ml-2 -mt-1">
            {errors.email.message}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary btn-block rounded-2xl gap-2 font-semibold h-14 text-base shadow-md hover:shadow-lg transition-shadow"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Šaljem...
            </>
          ) : (
            <>
              Obavesti me kad krene
              <ArrowRight size={18} />
            </>
          )}
        </button>

        {/* Inline disclaimer */}
        <p className="text-xs text-base-content/55 text-center leading-relaxed pt-1 px-2">
          Klikom prihvataš{" "}
          <a href="/privatnost" className="link link-primary">
            politiku privatnosti
          </a>{" "}
          i pristaješ da budeš obavešten/a o pokretanju aplikacije.
        </p>
      </form>

      <SuccessModal open={success} onClose={() => setSuccess(false)} />
    </>
  );
}
