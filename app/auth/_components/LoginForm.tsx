"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { loginAction } from "../_actions/loginAction";
import { LoginState } from "../_actions/types";
import { validateLogin, LoginErrors } from "@/lib/validations";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateLogin({ email, password });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setPending(true);
    const formData = new FormData();
    formData.set("email", email);
    formData.set("password", password);

    try {
      await loginAction(redirectTo, { success: false } as LoginState, formData);
      // success path redirects server-side; if we reach here it failed
      toast.error("Login failed. Check your credentials.");
    } catch {
      // NEXT_REDIRECT on success is caught here; ignore
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 space-y-4">
      <div>
        <Input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }}
          placeholder="enter your Email Address"
          className="border-0 outline outline-primary rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary"
        />
        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
      </div>
      <div>
        <Input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((p) => ({ ...p, password: undefined })); }}
          placeholder="enter your Password"
          className="border-0 outline outline-primary rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary"
        />
        {errors.password && <p className="text-sm text-destructive mt-1">{errors.password}</p>}
      </div>
      <Button
        type="submit"
        disabled={pending}
        className="bg-transparent border border-primary w-fit mx-auto rounded-lg text-primary hover:text-accent"
      >
        {pending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
