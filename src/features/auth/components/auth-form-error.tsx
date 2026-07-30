type AuthFormErrorProps = {
  message: string;
};

export function AuthFormError({ message }: AuthFormErrorProps) {
  return (
    <div
      role="alert"
      className="border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive"
    >
      {message}
    </div>
  );
}
