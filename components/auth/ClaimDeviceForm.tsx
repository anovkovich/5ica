"use client";

import { useState, useTransition } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { claimDeviceLinkAction } from "@/lib/actions/device-claim";

export function ClaimDeviceForm({ token }: { token: string }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      action={(formData) => {
        startTransition(async () => {
          setError(null);
          const result = await claimDeviceLinkAction(formData);
          if (result && !result.ok) {
            setError(result.error);
          }
        });
      }}
    >
      <input type="hidden" name="token" value={token} />

      {error && (
        <p className="text-error text-sm bg-error/10 rounded-xl p-3 mb-4">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="btn btn-primary btn-block rounded-2xl gap-2 font-semibold h-14 text-base shadow-md hover:shadow-lg transition-shadow"
      >
        {isPending ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Ulazim...
          </>
        ) : (
          <>
            Pristupi 5ici
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}
