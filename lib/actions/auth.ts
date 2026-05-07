"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { deleteSession } from "@/lib/sessions";
import { SESSION_COOKIE_NAME } from "@/lib/auth";

/**
 * Logout Server Action — koristi se iz <form action={logoutAction}>.
 *
 * Briše sesiju iz baze, briše cookie, redirektuje na /prijavi-se.
 * Server Actions (za razliku od Server Components) mogu da setuju cookies u Next 16.
 */
export async function logoutAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    await deleteSession(token);
  }

  cookieStore.delete(SESSION_COOKIE_NAME);

  redirect("/prijavi-se");
}
