"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { registerAction } from "../_actions/registerAction";
import { RegisterState } from "../_actions/types";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import { UserRole } from "@/types/enums";
import { validateRegister, RegisterErrors } from "@/lib/validations";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<string>(UserRole.CUSTOMER);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [pending, setPending] = useState(false);

  const clearError = (field: keyof RegisterErrors) => {
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateRegister({ name, email, password, phone });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setPending(true);
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("phone", phone);
    formData.set("role", role);

    try {
      await registerAction({ success: false } as RegisterState, formData);
      // success redirects server-side to /auth/login; if we reach here it failed
      toast.error("Registration failed. Please try again.");
    } catch {
      // NEXT_REDIRECT caught here; ignore
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 space-y-4">
      <div>
        <Input
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); clearError("name"); }}
          placeholder="enter your Name"
          className="border-0 outline outline-primary rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary"
        />
        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
      </div>
      <div>
        <Input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
          placeholder="enter your Email address"
          className="border-0 outline outline-primary rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary"
        />
        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
      </div>
      <div>
        <Input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); clearError("password"); }}
          placeholder="enter a Password"
          className="border-0 outline outline-primary rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary"
        />
        {errors.password && <p className="text-sm text-destructive mt-1">{errors.password}</p>}
      </div>
      <div>
        <Input
          type="tel"
          value={phone}
          onChange={(e) => { setPhone(e.target.value); clearError("phone"); }}
          placeholder="enter your Phone"
          className="border-0 outline outline-primary rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary"
        />
        {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
      </div>

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
