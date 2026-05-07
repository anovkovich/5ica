"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { AVATARS, DEFAULT_AVATAR, type AvatarId } from "@/lib/avatars";
import { cn } from "@/lib/cn";

export function AvatarPicker({
  name,
  defaultValue = DEFAULT_AVATAR,
}: {
  name: string;
  defaultValue?: AvatarId;
}) {
  const [selected, setSelected] = useState<AvatarId>(defaultValue);

  return (
    <div>
      <input type="hidden" name={name} value={selected} />
      <div className="grid grid-cols-4 gap-2.5">
        {AVATARS.map((avatar) => {
          const isSelected = selected === avatar.id;
          return (
            <button
              key={avatar.id}
              type="button"
              onClick={() => setSelected(avatar.id)}
              className={cn(
                "relative aspect-square rounded-2xl flex items-center justify-center text-3xl transition-all",
                avatar.bg,
                isSelected
                  ? "ring-3 ring-primary ring-offset-2 ring-offset-base-100 scale-105"
                  : "hover:scale-105 opacity-80 hover:opacity-100"
              )}
              aria-label={avatar.label}
              aria-pressed={isSelected}
            >
              <span aria-hidden>{avatar.emoji}</span>
              {isSelected && (
                <span
                  aria-hidden
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-content flex items-center justify-center"
                >
                  <Check size={12} strokeWidth={3} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
