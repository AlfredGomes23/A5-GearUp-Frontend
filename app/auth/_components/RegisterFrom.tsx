"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { registerAction } from "../_actions/registerAction";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import { UserRole } from "@/types/enums";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [state, action, pending] = useActionState(registerAction, false);
  const router = useRouter();

  const [role, setRole] = useState<string>(UserRole.CUSTOMER);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Registration Successful..");
      router.push('/dashboard');
    }
    if (!state.success) toast.error(state.message || "Login Failed.");
  }, [state, router]);


  return (
    <form action={action} className="p-5 space-y-4">
        <Input
          name="name"
          type="text"
          placeholder="enter your Name"
          className="border-0 outline outline-primary rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary"
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="enter your Email address"
          className="border-0 outline outline-primary rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary"
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="enter a Password"
          className="border-0 outline outline-primary rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary"
          required
        />
        <Input
          name="phone"
          type="tel"
          placeholder="enter your Phone"
          className="border-0 outline outline-primary rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary"
        />

      <ToggleGroup
        type="single"
        value={role}
        onValueChange={(val) => { if (val) setRole(val); }}
        className="flex flex-col md:flex-row justify-start md:justify-around w-full gap-2"
        >
          <Label className="text-left">Register as :</Label>
          <div className="flex justify-around gap-5">
            
        <ToggleGroupItem
          value={UserRole.CUSTOMER}
          className="w-fit text-primary line-through data-[state=on]:no-underline data-[state=on]:font-semibold rounded-sm"
        >
          {UserRole.CUSTOMER}
        </ToggleGroupItem>
        <ToggleGroupItem
          value={UserRole.PROVIDER}
          className="w-fit text-primary line-through data-[state=on]:no-underline [state=on]:font-semibold rounded-sm"
        >
          {UserRole.PROVIDER}
        </ToggleGroupItem>
          </div>
      </ToggleGroup>
      
      <input type="hidden" name="role" value={role} />

        <Button
          type="submit"
          disabled={pending}
          className="bg-transparent border border-primary w-fit mx-auto rounded-lg text-primary hover:text-accent"
        >
          {pending ? "Registering..." : "Register"}
        </Button>
    </form>
  );
};

export default RegisterForm;
