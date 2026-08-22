"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LoginForm = () => {

  return (
    <form className="space-y-4">
      <div className="p-5 space-y-3 rounded-lg border-none outline-none shadow-none">
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
          className="bg-transparent border border-primary w-fit mx-auto rounded-lg text-primary hover:text-accent"
        >
          {"Login"}{" "}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
