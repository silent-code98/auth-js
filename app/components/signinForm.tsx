"use client";
import {
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  UserIcon
} from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(1, "Enter a valid username"),
  password: z.string().min(6, "Password incorrect")
});

function SigninForm() {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const togglePassVisibility = () => setIsPassVisible((prev) => !prev);

  type formType = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<formType>({
    resolver: zodResolver(formSchema)
  });

  const loginUser: SubmitHandler<formType> = async (data) => {
    console.log({ data });
  };

  return (
    <form
      onSubmit={handleSubmit(loginUser)}
      className="grid grid-cols-1 border p-4 rounded-xl border-slate-700 gap-4 w-full max-w-md">
      <Input
        {...register("username")}
        errorMessage={errors.username?.message}
        isInvalid={!!errors.username?.message}
        label="Username"
        type="email"
        name="username"
        placeholder="Enter your username or email"
        startContent={<UserIcon className="w-6" />}
      />

      <Input
        {...register("password")}
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password?.message}
        label="Password"
        type={isPassVisible ? "text" : "password"}
        name="password"
        placeholder="Enter your password"
        startContent={<KeyIcon className="w-6" />}
        endContent={
          isPassVisible ? (
            <EyeSlashIcon className="w-6" onClick={togglePassVisibility} />
          ) : (
            <EyeIcon className="w-6" onClick={togglePassVisibility} />
          )
        }
      />
      <Button
        isDisabled={!!errors.username || !!errors.password}
        type="submit"
        color="primary"
        size="lg">
        Login
      </Button>
    </form>
  );
}

export default SigninForm;
