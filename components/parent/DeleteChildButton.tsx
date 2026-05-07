"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteChildAction } from "@/lib/actions/children";

export function DeleteChildButton({
  childId,
  childName,
}: {
  childId: string;
  childName: string;
}) {
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="btn btn-ghost btn-sm rounded-xl gap-1.5 text-base-content/60 hover:text-error"
      >
        <Trash2 size={14} />
        Obriši nalog
      </button>
    );
  }

  return (
    <div className="bg-error/10 border border-error/30 rounded-2xl p-4 space-y-3">
      <div>
        <p className="font-semibold text-sm">
          Obrisati nalog za {childName}?
        </p>
        <p className="text-xs text-base-content/70 leading-snug mt-1">
          Sva istorija (pitanja, XP, drugovi) će biti obrisana. Akcija je
          nepovratna.
        </p>
      </div>
      <div className="flex gap-2">
        <form action={deleteChildAction} className="flex-1">
          <input type="hidden" name="childId" value={childId} />
          <button
            type="submit"
            className="btn btn-error btn-sm w-full rounded-xl"
          >
            Da, obriši
          </button>
        </form>
        <button
          onClick={() => setConfirming(false)}
          className="btn btn-ghost btn-sm rounded-xl"
        >
          Otkaži
        </button>
      </div>
    </div>
  );
}
