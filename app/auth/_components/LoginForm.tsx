"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { loginAction } from "../_actions/loginAction";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";

  const [state, action, pending] = useActionState(
    loginAction.bind(null, redirectTo),
    false,
  );

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Login Successful..");
      router.push('/');
    }
    if (!state.success) toast.error(state.message || "Login Failed.");
  }, [state, router]);

  return (
    <form action={action} className="p-5 space-y-4">
        <Input
          name="email"
          type="email"
          placeholder="enter your Email Address"
          className="border-0 outline outline-primary rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary"
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="enter your Password"
          className="border-0 outline outline-primary rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary"
          required
        />
        <Button
          type="submit"
          disabled={pending}
          className="bg-transparent border border-primary w-fit mx-auto rounded-lg text-primary hover:text-accent"
        >
          {pending ? "Logging in..." : "Login"}{" "}
        </Button>
    </form>
  );
};

export default LoginForm;
