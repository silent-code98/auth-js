import SigninForm from "@/app/components/signinForm";
import { Link } from "@nextui-org/react";

export default function SignIn() {
  return (
    <main className="min-h-[85dvh] w-full max-w-4xl mx-auto flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col gap-3 mb-4">
        <h1 className="text-3xl">Sign In</h1>
        <p className="text-slate-400 max-w-[50ch] text-center">
          Sign in to your account to manage services.
        </p>
      </div>

      <SigninForm />

      <div className="flex items-center gap-3 mt-4">
        <p>Don&apos;t have an account?</p>
        <Link href="/auth/signup">Sign Up</Link>
      </div>
    </main>
  );
}
