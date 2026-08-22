import Image from "next/image";
import Link from "next/link";
import logo from "../../app/favicon.ico";
import x from "../../public/x.svg";
import fb from "../../public/facebook.svg";
import you from "../../public/youtube.svg";
import { navItems } from "@/lib/navigation";

export default function Footer() {
  return (
    <footer className="flex-3 pb-3 items-center">
      <div className=" flex flex-col md:flex-row gap-3 pb-3">
        {/* Navigation Links */}
        <div className=" flex gap-3 text-blue-700 mx-auto">
          <Link
            href={"/"}
            className="text-foreground hover:text-primary transition-colors text-sm font-medium"
          >
            {" "}
            Home{" "}
          </Link>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              {" "}
              {item.label}{" "}
            </Link>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex gap-3 mx-auto">
          <Link href={"/x.com"}>
            <Image src={x} alt="X" />
          </Link>
          <Link href={"/facebook.com"}>
            <Image src={fb} alt="Facebook" />
          </Link>
          <Link href={"/youtube.com"}>
            <Image src={you} alt="youtube" />
          </Link>
        </div>
      </div>
      <hr className="hidden md:block text-primary border-dashed" />
      {/* Copyright */}
      <aside className="text-center text-sm flex flex-col md:flex-row items-center justify-center gap-3 pt-3">
        <p className="">
          Copyright © {new Date().getFullYear()} - All rights reserved by{" "}
        </p>
        {/* Logo */}
          <span className="text-xl flex gap-1 font-bold text-primary">
            <Image src={logo} alt="Logo" /> GearUp
          </span>
      </aside>
    </footer>
  );
}
