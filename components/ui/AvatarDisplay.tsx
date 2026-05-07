import { getAvatar } from "@/lib/avatars";
import { cn } from "@/lib/cn";

type Size = "sm" | "md" | "lg" | "xl";

const sizeClasses: Record<Size, string> = {
  sm: "w-10 h-10 text-xl",
  md: "w-14 h-14 text-2xl",
  lg: "w-20 h-20 text-4xl",
  xl: "w-28 h-28 text-5xl",
};

export function AvatarDisplay({
  avatarId,
  size = "md",
  className,
}: {
  avatarId: string;
  size?: Size;
  className?: string;
}) {
  const avatar = getAvatar(avatarId);

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center flex-shrink-0",
        avatar.bg,
        sizeClasses[size],
        className
      )}
      role="img"
      aria-label={avatar.label}
    >
      <span aria-hidden>{avatar.emoji}</span>
    </div>
  );
}
