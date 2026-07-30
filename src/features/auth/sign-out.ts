"use client";

import {
  clearOnboardingCompleteCookie,
} from "@/features/auth/actions/auth.actions";
import { signOut } from "@/features/auth/client";

export async function signOutUser() {
  await clearOnboardingCompleteCookie();
  await signOut();
  window.location.assign("/");
}
