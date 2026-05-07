"use server";

import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import {
  createChild,
  getChildById,
  deleteChild as deleteChildLib,
} from "@/lib/children";
import {
  createDeviceLink,
  revokeAllPendingForChild,
} from "@/lib/device-links";

const ALLOWED_AVATARS = [
  "lion",
  "cat",
  "dog",
  "fox",
  "panda",
  "tiger",
  "unicorn",
  "frog",
  "rabbit",
  "owl",
  "eagle",
  "wolf",
];

export type CreateChildResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Kreira nalog za dete + odmah generiše prvi device-link.
 * Posle redirektuje na detail stranu sa device link-om.
 */
export async function createChildAction(
  formData: FormData
): Promise<CreateChildResult> {
  const user = await getCurrentUser();
  if (!user || user.type !== "parent") {
    return { ok: false, error: "Nisi autentifikovan" };
  }

  const displayName = String(formData.get("displayName") ?? "").trim();
  const gradeRaw = String(formData.get("grade") ?? "");
  const avatarId = String(formData.get("avatarId") ?? "lion");

  if (displayName.length < 2 || displayName.length > 30) {
    return { ok: false, error: "Nadimak mora imati 2-30 karaktera" };
  }

  const grade = parseInt(gradeRaw, 10);
  if (!Number.isFinite(grade) || grade < 1 || grade > 8) {
    return { ok: false, error: "Razred mora biti između 1 i 8" };
  }

  if (!ALLOWED_AVATARS.includes(avatarId)) {
    return { ok: false, error: "Nepoznat avatar" };
  }

  let childId: ObjectId;
  try {
    const child = await createChild({
      parentId: user._id,
      displayName,
      grade,
      avatarId,
    });
    childId = child._id;
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Greška pri kreiranju",
    };
  }

  revalidatePath("/roditelj");
  redirect(`/roditelj/dete/${childId.toString()}`);
}

/**
 * Generiše novi device-link za dete. Stari pending linkovi se invalidiraju.
 */
export async function generateDeviceLinkAction(formData: FormData): Promise<{
  ok: boolean;
  token?: string;
  error?: string;
}> {
  const user = await getCurrentUser();
  if (!user || user.type !== "parent") {
    return { ok: false, error: "Nisi autentifikovan" };
  }

  const childIdRaw = String(formData.get("childId") ?? "");
  if (!ObjectId.isValid(childIdRaw)) {
    return { ok: false, error: "Nevažeći ID deteta" };
  }

  const childId = new ObjectId(childIdRaw);
  const child = await getChildById(childId, user._id);
  if (!child) {
    return { ok: false, error: "Dete nije nađeno" };
  }

  await revokeAllPendingForChild(childId);
  const { token } = await createDeviceLink({
    childId,
    parentId: user._id,
  });

  revalidatePath(`/roditelj/dete/${childIdRaw}`);
  return { ok: true, token };
}

/**
 * Briše dete (soft delete).
 */
export async function deleteChildAction(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user || user.type !== "parent") return;

  const childIdRaw = String(formData.get("childId") ?? "");
  if (!ObjectId.isValid(childIdRaw)) return;

  await deleteChildLib(new ObjectId(childIdRaw), user._id);

  revalidatePath("/roditelj");
  redirect("/roditelj");
}
