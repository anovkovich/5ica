"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";

const schema = z.object({
  email: z.string().min(1, "Email je obavezan").email("Unesi validan email"),
});

type FormData = z.infer<typeof schema>;

export function MagicLinkForm() {
  const [sent, setSent] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        setSent(data.email);
      } else {
        toast.error(result.error?.message || "Nešto nije u redu.");
      }
    } catch {
      toast.error("Nema interneta? Pokušaj ponovo.");
    }
  };

  if (sent) {
    return (
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/15 text-success">
          <CheckCircle2 size={32} />
        </div>
        <h2 className="text-2xl font-bold">Link je poslat!</h2>
        <p className="text-base-content/70">
          Otišao je na <strong>{sent}</strong>. Proveri inbox (i spam folder)
          — link traje 15 minuta.
        </p>
        <button
          onClick={() => setSent(null)}
          className="btn btn-ghost btn-sm"
        >
          Pokušaj sa drugim email-om
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="relative">
        <Mail
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 pointer-events-none"
        />
        <input
          type="email"
          placeholder="vas@email.rs"
          autoFocus
          className="w-full pl-12 pr-4 py-3.5 text-base bg-base-100 border-2 border-base-300 rounded-2xl focus:outline-none focus:border-primary transition-colors placeholder:text-base-content/40 disabled:opacity-60"
          disabled={isSubmitting}
          {...register("email")}
        />
      </div>
      {errors.email && (
        <p className="text-error text-sm ml-2">{errors.email.message}</p>
      )}

      <button
        type="submit"
        className="btn btn-primary btn-block rounded-2xl gap-2 font-semibold h-14 text-base shadow-md hover:shadow-lg transition-shadow"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Šaljem link...
          </>
        ) : (
          <>
            Pošalji mi link
            <ArrowRight size={18} />
          </>
        )}
      </button>

      <p className="text-xs text-base-content/60 text-center pt-2">
        Bez šifara — samo magic link na tvoj email.
      </p>
    </form>
  );
}
