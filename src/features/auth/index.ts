export { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
export { LoginForm } from "@/features/auth/components/login-form";
export { SignUpForm } from "@/features/auth/components/signup-form";
export {
  VerifyEmailContent,
  VerifyEmailPageContent,
} from "@/features/auth/components/verify-email-content";
export {
  authClient,
  requestPasswordReset,
  signIn,
  signOut,
  signUp,
  useSession,
} from "@/features/auth/client";
export {
  clearOnboardingCompleteCookie,
  resolvePostAuthRedirect,
  syncOnboardingCompleteCookie,
} from "@/features/auth/actions/auth.actions";
export { signOutUser } from "@/features/auth/sign-out";
export {
  forgotPasswordMetadata,
  loginMetadata,
  signUpMetadata,
  verifyEmailMetadata,
} from "@/features/auth/metadata";
export {
  forgotPasswordSchema,
  loginSchema,
  signUpSchema,
  type ForgotPasswordInput,
  type LoginInput,
  type SignUpInput,
} from "@/features/auth/schemas";
