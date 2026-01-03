/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  gender: z.string().min(1, "Gender is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  age: z.string().optional(),
  address: z.string().optional(),
  phoneNum: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Signup = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      password: "",
      age: "",
      address: "",
      phoneNum: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsPending(true);
    setError("");
    console.log("values", values);
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      console.log("datas", data?.message);
      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      } else if (data.success === "mail already registered") {
        router.push(`/email-verify?email=${values.email}`);
        throw new Error("Email already registered");
      }

      toast.success("Account created successfully!");
      router.push(`/email-verify?email=${values.email}`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <section
      className="min-h-screen flex items-center justify-center 
  flex-col gap-5 py-8"
    >


      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
              {/* Logo */}
      <div className="flex justify-center mb-2">
        <Image
          src="/images/logo.svg"
          alt="logo"
          width={50}
          height={60}
          className=""
        />
      </div>
        <h2 className="text-2xl font-semibold text-center text-auth-text mb-1">
          Create Your Account
        </h2>
        <p className="text-muted-foreground text-center mb-6">
          Create your account to start booking, hosting, and sharing kitchens
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* First Name & Last Name - Side by side */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Lorem" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Ipsum" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>


            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="hello@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

       

  
            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

         

            {/* Sign Up Button */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full rounded-full hover:bg-gray-800 text-white font-semibold py-2.5 mt-2"
            >
              {isPending ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>
        </Form>

        {/* Sign In link */}
        <p className="text-sm text-gray-500 mt-6 text-center">
          Already have an account?{" "}
          <span
            className="text-primary hover:text-orange-600 cursor-pointer font-medium transition-colors"
            onClick={() => router.push("/login")}
          >
            Sign in
          </span>
        </p>
      </div>
    </section>
  );
};

export default Signup;