import { ObjectId } from "mongodb";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { getChildById } from "@/lib/children";
import { AvatarDisplay } from "@/components/ui/AvatarDisplay";
import { DeviceLinkSection } from "@/components/parent/DeviceLinkSection";
import { DeleteChildButton } from "@/components/parent/DeleteChildButton";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DetePage({ params }: Props) {
  const { id } = await params;

  if (!ObjectId.isValid(id)) notFound();

  const user = await getCurrentUser();
  if (!user) return null;

  const child = await getChildById(new ObjectId(id), user._id);
  if (!child) notFound();

  return (
    <div className="px-4 py-5 space-y-6">
      <Link
        href="/roditelj"
        className="inline-flex items-center gap-1.5 text-sm text-base-content/70 hover:text-primary"
      >
        <ArrowLeft size={16} />
        Nazad
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4">
        <AvatarDisplay avatarId={child.avatarId} size="xl" />
        <div className="min-w-0">
          <h1 className="text-2xl font-extrabold tracking-tight truncate">
            {child.displayName}
          </h1>
          <p className="text-sm text-base-content/70">
            {child.grade}. razred
          </p>
        </div>
      </div>

      {/* Device link */}
      <DeviceLinkSection childId={child._id.toString()} />

      {/* Aktivnost (placeholder za buduće) */}
      <div className="bg-base-100 border border-base-300 rounded-2xl p-5">
        <h3 className="font-bold mb-1">Aktivnost</h3>
        <p className="text-sm text-base-content/70">
          {child.lastLoginAt
            ? `Poslednji put aktivan/na: ${formatDate(child.lastLoginAt)}`
            : "Još uvek nije pristupio/la 5ici."}
        </p>
      </div>

      {/* Delete */}
      <div className="pt-4 border-t border-base-200">
        <DeleteChildButton
          childId={child._id.toString()}
          childName={child.displayName}
        />
      </div>
    </div>
  );
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("sr-Latn-RS", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
