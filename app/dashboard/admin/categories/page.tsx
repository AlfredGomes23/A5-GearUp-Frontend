import { Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getCategories } from "../_actions/getCategories";
import { CreateCategoryDialog } from "./_components/CreateCategoryDialog";
import { UpdateCategoryDialog } from "./_components/UpdateCategoryDialog";

const AdminCategoriesPage = async () => {
  const { data: categories } = await getCategories({ limit: "100" });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-muted-foreground">
            {categories.length} categor{categories.length === 1 ? "y" : "ies"} total
          </p>
        </div>
        <CreateCategoryDialog />
      </div>

      {categories.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
            <Tag className="size-10" />
            <p className="font-medium">No categories found</p>
            <p className="text-sm">Create your first category to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center bg-primary/10 rounded-lg">
                    <Tag className="size-5 text-primary/60" />
                  </div>
                  <span className="font-medium">{category.name}</span>
                </div>
                <UpdateCategoryDialog categoryId={category.id} initialName={category.name} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCategoriesPage;
