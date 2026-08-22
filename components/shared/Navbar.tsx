"use client";

import logo from "../../app/favicon.ico";
import { CircleUser, LogOut, User } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { NavbarProps } from "@/types/types";
import { navItems } from "@/lib/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const Navbar = ({ user }: NavbarProps) => {
  const router = useRouter();

  const handleUserMenuAction = async (action: string) => {
    if (action === "logout") {
      toast.success("User Logged Out Successfully!");
    }
  };

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Added `relative` to parent container so absolute positioning targets the navbar */}
      <div className="relative flex items-center justify-between h-16">
        {/* Left: Logo */}
        <Link href="/" className="shrink-0 z-10">
          <span className="text-2xl flex items-center gap-1 font-bold text-primary">
            <Image src={logo} width={32} height={32} alt="Logo" />
            GearUp
          </span>
        </Link>

        {/* Center: Nav Links (Perfectly Centered) */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: User Dropdown / Login */}
        <div className="flex items-center gap-2 z-10">
          {user.success ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">
                      {user.data?.profile.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.data?.profile.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    await handleUserMenuAction("logout");
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/auth/login">
                    <Button
                      size="icon"
                      className="cursor-pointer text-primary hover:text-accent bg-transparent hover:bg-primary"
                    >
                      <CircleUser
                        style={{ width: 32, height: 32 }}
                        strokeWidth={1.5}
                      />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="left"
                  className="bg-transparent text-black outline outline-primary rounded-lg"
                >
                  <p>Login your Account</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
