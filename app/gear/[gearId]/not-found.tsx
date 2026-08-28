import Link from "next/link";
import { PackageX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/navigation";

const GearDetailNotFound = () => {
  // console.log(navItems);
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center gap-4 text-center">
      <PackageX className="size-16 text-muted-foreground" />
      <h2 className="text-2xl font-bold">Gear Not Found</h2>
      <p className="text-muted-foreground max-w-md">
        The gear you are looking for does not exist or has been removed.
      </p>
      <Button asChild variant="outline">
        <Link href={navItems.find((item) => item.label === "Gears")?.href as string}>Browse All Gear</Link>
      </Button>
    </div>
  );
};

export default GearDetailNotFound;
