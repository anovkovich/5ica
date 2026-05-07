/**
 * Avatar paleta — emoji za V1, kasnije će biti SVG ilustracije.
 * Svaki avatar ima ID koji se čuva u DB i emoji + boju za rendering.
 */

export type AvatarId =
  | "lion"
  | "cat"
  | "dog"
  | "fox"
  | "panda"
  | "tiger"
  | "unicorn"
  | "frog"
  | "rabbit"
  | "owl"
  | "eagle"
  | "wolf";

export const AVATARS: Array<{
  id: AvatarId;
  emoji: string;
  bg: string;
  label: string;
}> = [
  { id: "lion", emoji: "🦁", bg: "bg-amber-200", label: "Lav" },
  { id: "cat", emoji: "🐱", bg: "bg-orange-200", label: "Maca" },
  { id: "dog", emoji: "🐶", bg: "bg-yellow-200", label: "Cuko" },
  { id: "fox", emoji: "🦊", bg: "bg-orange-300", label: "Lisac" },
  { id: "panda", emoji: "🐼", bg: "bg-slate-200", label: "Panda" },
  { id: "tiger", emoji: "🐯", bg: "bg-amber-300", label: "Tigar" },
  { id: "unicorn", emoji: "🦄", bg: "bg-pink-200", label: "Jednorog" },
  { id: "frog", emoji: "🐸", bg: "bg-green-200", label: "Žaba" },
  { id: "rabbit", emoji: "🐰", bg: "bg-pink-100", label: "Zec" },
  { id: "owl", emoji: "🦉", bg: "bg-stone-300", label: "Sova" },
  { id: "eagle", emoji: "🦅", bg: "bg-amber-100", label: "Orao" },
  { id: "wolf", emoji: "🐺", bg: "bg-slate-300", label: "Vuk" },
];

export const DEFAULT_AVATAR: AvatarId = "lion";

export function getAvatar(id: string): (typeof AVATARS)[number] {
  return AVATARS.find((a) => a.id === id) ?? AVATARS[0];
}
