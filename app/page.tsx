"use client";

import {
  EnvelopeIcon,
  UserIcon,
  PhoneIcon,
  KeyIcon
} from "@heroicons/react/16/solid";
import { Button, Input, Link } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="min-h-[85dvh] w-full max-w-4xl mx-auto flex items-center justify-center flex-col">
      <header className="flex items-center justify-center flex-col gap-3 mb-4">
        <h1 className="text-3xl">Sign Up</h1>
        <p className="text-slate-400 max-w-[50ch] text-center">
          Signup from the form below to enjoy all the benefit of our exclusive
          platform.
        </p>
      </header>

      <footer className="flex items-center gap-3 mt-4">
        <p>Already have an account?</p>
        <Link href="/auth/signin">Sign In</Link>
      </footer>
    </main>
  );
}
