"use client";

import { useState, useTransition } from "react";
import { Smartphone, Copy, Check, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { generateDeviceLinkAction } from "@/lib/actions/children";

export function DeviceLinkSection({ childId }: { childId: string }) {
  const [isPending, startTransition] = useTransition();
  const [token, setToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const link =
    token && typeof window !== "undefined"
      ? `${window.location.origin}/dete-pristup/${token}`
      : null;

  const generate = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("childId", childId);
      const result = await generateDeviceLinkAction(formData);
      if (result.ok && result.token) {
        setToken(result.token);
      } else {
        toast.error(result.error ?? "Nije uspelo");
      }
    });
  };

  const copy = async () => {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Link kopiran");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-base-200 rounded-2xl p-5">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
          <Smartphone size={20} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold mb-0.5">Pristup za telefon</h3>
          <p className="text-xs text-base-content/70 leading-snug">
            Generiši jednokratni link i pošalji detetu. Klikom se prijavi na svoj
            telefon (link traje 7 dana).
          </p>
        </div>
      </div>

      {!token ? (
        <button
          onClick={generate}
          disabled={isPending}
          className="btn btn-primary btn-block rounded-xl gap-2 font-semibold"
        >
          {isPending ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Pravim link...
            </>
          ) : (
            <>
              <Smartphone size={16} />
              Generiši pristupni link
            </>
          )}
        </button>
      ) : (
        <div className="space-y-2">
          <div className="bg-base-100 border border-base-300 rounded-xl px-3 py-2.5 text-xs font-mono break-all">
            {link}
          </div>
          <div className="flex gap-2">
            <button
              onClick={copy}
              className="btn btn-primary btn-sm flex-1 rounded-xl gap-1.5"
            >
              {copied ? (
                <>
                  <Check size={14} />
                  Kopiran
                </>
              ) : (
                <>
                  <Copy size={14} />
                  Kopiraj link
                </>
              )}
            </button>
            <button
              onClick={generate}
              disabled={isPending}
              className="btn btn-ghost btn-sm rounded-xl gap-1.5"
              title="Generiši novi (stari postaje nevažeći)"
            >
              <RefreshCw size={14} className={isPending ? "animate-spin" : ""} />
            </button>
          </div>
          <p className="text-xs text-base-content/55 leading-snug pt-1">
            Pošalji link detetu (WhatsApp, SMS, ili otvori direktno na njegovom
            telefonu). Link je jednokratan — kad se iskoristi, generiši novi za
            drugi uređaj.
          </p>
        </div>
      )}
    </div>
  );
}
