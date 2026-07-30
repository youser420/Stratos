import { Suspense } from "react";

import { LoginForm, loginMetadata } from "@/features/auth";

export const metadata = loginMetadata;

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
