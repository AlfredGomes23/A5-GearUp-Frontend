"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import { UserRole } from "@/types/enums";


const RegisterForm = () => {


  const [role, setRole] = useState<string>(UserRole.CUSTOMER);



  return (
    <form className="">
      <div className="p-5 space-y-4">
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
          required
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
      
      {/* Hidden input to ensure native form submission captures the selected role value */}
      <input type="hidden" name="role" value={role} />
    </div>

        <Button
          type="submit"         
          className="bg-transparent border border-primary w-fit mx-auto rounded-lg text-primary hover:text-accent"
        >
          { "Register"}
        </Button>
    </form>
  );
};

export default RegisterForm;
