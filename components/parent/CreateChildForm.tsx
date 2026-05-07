"use client";

import { useState, useTransition } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AvatarPicker } from "@/components/ui/AvatarPicker";
import { createChildAction } from "@/lib/actions/children";

const GRADES = [1, 2, 3, 4, 5, 6, 7, 8];

export function CreateChildForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      action={(formData) => {
        startTransition(async () => {
          setError(null);
          const result = await createChildAction(formData);
          if (result && !result.ok) {
            setError(result.error);
            toast.error(result.error);
          }
        });
      }}
      className="space-y-5"
    >
      {/* Nadimak */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Nadimak deteta
        </label>
        <input
          name="displayName"
          type="text"
          required
          minLength={2}
          maxLength={30}
          placeholder="Marko"
          autoFocus
          disabled={isPending}
          className="w-full px-4 py-3 text-base bg-base-100 border-2 border-base-300 rounded-2xl focus:outline-none focus:border-primary transition-colors placeholder:text-base-content/40 disabled:opacity-60"
        />
        <p className="text-xs text-base-content/55 mt-1.5 ml-1">
          Bez prezimena. Privatnost dece je prioritet.
        </p>
      </div>

      {/* Razred */}
      <div>
        <label className="block text-sm font-medium mb-2">Razred</label>
        <div className="grid grid-cols-4 gap-2">
          {GRADES.map((g) => (
            <label
              key={g}
              className="cursor-pointer relative"
            >
              <input
                type="radio"
                name="grade"
                value={g}
                required
                defaultChecked={g === 5}
                className="peer sr-only"
                disabled={isPending}
              />
              <div className="aspect-square flex items-center justify-center rounded-xl border-2 border-base-300 font-bold transition-all peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-content hover:border-primary/40 peer-disabled:opacity-50">
                {g}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Avatar */}
      <div>
        <label className="block text-sm font-medium mb-2">Avatar</label>
        <AvatarPicker name="avatarId" />
      </div>

      {error && (
        <p className="text-error text-sm bg-error/10 rounded-xl p-3">
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
            Kreiram...
          </>
        ) : (
          <>
            Kreiraj nalog
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}
