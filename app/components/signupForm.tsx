"use client";

import {
  EnvelopeIcon,
  UserIcon,
  PhoneIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon
} from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import validator from "validator";
import { z } from "zod";

// form schema
const formSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "You must enter your firstname")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special chars allowed"),
    lastName: z
      .string()
      .min(2, "You must enter your last name")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special chars allowed"),
    email: z.string().email("Enter a valid email address"),
    phone: z
      .string()
      .refine(validator.isMobilePhone, "Enter a valid phone number"),
    password: z
      .string()
      .min(6, "password must be at least 6 chars")
      .max(16, "password must be less 16 chars"),
    confirmPassword: z
      .string()
      .min(6, "password must be at least 6 chars")
      .max(16, "password must be less 16 chars"),
    termsConsent: z.literal(true, {
      errorMap: () => ({
        message: "Please accept the terms and conditions to continue"
      })
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm password doesn't match",
    path: ["password", "confirmPasswordk"]
  });

export default function SignupForm() {
  // toggle password visibility
  const [isPassVisible, setIsPassVisible] = useState(false);
  const togglePassVisibility = () => setIsPassVisible((prev) => !prev);
  // toggle terms and conditions consent - boolean
  // const [termsAccepted, setTermsAccepted] = useState(false);

  type formType = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<formType>({
    resolver: zodResolver(formSchema)
  });

  const saveUser: SubmitHandler<formType> = async (data) => {
    console.log({ data });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(saveUser)}
      className="grid grid-cols-2 border p-4 rounded-xl border-slate-700 gap-4">
      <Input
        errorMessage={errors.firstName?.message}
        isInvalid={!!errors.firstName}
        {...register("firstName")}
        type="text"
        name="firstName"
        placeholder="First Name"
        startContent={<UserIcon className="w-6" />}
      />
      <Input
        errorMessage={errors.lastName?.message}
        isInvalid={!!errors.lastName}
        {...register("lastName")}
        type="text"
        name="lastName"
        placeholder="Last Name"
        startContent={<UserIcon className="w-6" />}
      />
      <Input
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
        {...register("email")}
        type="email"
        name="email"
        placeholder="Username or Email"
        startContent={<EnvelopeIcon className="w-6" />}
        className="col-span-2"
      />
      <Input
        errorMessage={errors.phone?.message}
        isInvalid={!!errors.phone}
        {...register("phone")}
        type="tel"
        name="phone"
        placeholder="Phone"
        startContent={<PhoneIcon className="w-6" />}
        className="col-span-2"
      />

      <Input
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password}
        {...register("password")}
        type={isPassVisible ? "text" : "password"}
        name="password"
        placeholder="Password"
        startContent={<KeyIcon className="w-6" />}
        endContent={
          isPassVisible ? (
            <EyeSlashIcon
              className="w-6 cursor-pointer"
              onClick={togglePassVisibility}
            />
          ) : (
            <EyeIcon
              className="w-6 cursor-pointer"
              onClick={togglePassVisibility}
            />
          )
        }
      />
      <Input
        errorMessage={errors.confirmPassword?.message}
        isInvalid={!!errors.confirmPassword}
        {...register("confirmPassword")}
        type={isPassVisible ? "text" : "password"}
        name="confirmPassword"
        placeholder="Confirm password"
        startContent={<KeyIcon className="w-6" />}
      />

      <Controller
        control={control}
        name="termsConsent"
        render={({ field }) => (
          <Checkbox
            onChange={field.onChange}
            onBlur={field.onBlur}
            isInvalid={!!errors.termsConsent}>
            I accept the <Link href="/">terms</Link> &{" "}
            <Link href="/">conditions</Link>
          </Checkbox>
        )}
      />

      <Button
        // disabled={!termsAccepted}
        isDisabled={!!errors.termsConsent}
        size="lg"
        type="submit"
        className="col-span-2 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-30"
        color="primary">
        Sign Up
      </Button>
    </form>
  );
}
