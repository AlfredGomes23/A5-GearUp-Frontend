import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategories } from "@/app/gear/_actions/getCategories";
import CreateGearForm from "../../_components/CreateGearForm";

const NewGearPage = async () => {
  const { data: categories } = await getCategories();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
      <Link
        href="/dashboard/provider/gear"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="size-4" />
        Back to My Gears
      </Link>

      <div>
        <h1 className="text-2xl font-bold">Create New Gear</h1>
        <p className="text-muted-foreground">
          Add a new gear item to your inventory
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gear Details</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateGearForm categories={categories} />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewGearPage;
