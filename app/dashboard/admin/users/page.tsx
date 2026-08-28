import Link from "next/link";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getUsers } from "../_actions/getUsers";
import { roleVariant, statusVariantForUser, SearchParams } from "../../_components/types";

const AdminUsersPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const sp = await searchParams;
  const params = Object.fromEntries(
    Object.entries(sp).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
  );

  const { data: users, metaData } = await getUsers({ page: params.page || "1", limit: "10" });

  const buildPageHref = (page: number) => {
    const query = new URLSearchParams({ ...params, page: String(page) }).toString();
    return `/dashboard/admin/users?${query}`;
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-muted-foreground">
          {metaData?.total ?? users.length} user{(metaData?.total ?? users.length) === 1 ? "" : "s"} total
        </p>
      </div>

      {users.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
            <Users className="size-10" />
            <p className="font-medium">No users found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {users.map((user) => (
            <Link
              key={user.id}
              href={`/dashboard/admin/users/${user.id}`}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <Badge className={roleVariant(user.role)}>
                  {user.role}
                </Badge>
                <div className="flex flex-col gap-1">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-sm text-muted-foreground">{user.email}</span>
                  {user.phone && (
                    <span className="text-sm text-muted-foreground">{user.phone}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <span className="hidden md:inline text-sm text-muted-foreground">
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </span>
                <Badge className={statusVariantForUser(user.status)}>
                  {user.status}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      )}

      {(metaData?.totalPage ?? 1) > 1 && (
        <div className="flex items-center justify-center gap-2">
          {metaData.page > 1 ? (
            <Button asChild variant="outline" size="sm">
              <Link href={buildPageHref(metaData.page - 1)}>
                <ChevronLeft /> Prev
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft /> Prev
            </Button>
          )}
          <span className="text-sm text-muted-foreground px-2">
            Page {metaData.page} of {metaData.totalPage}
          </span>
          {metaData.page < metaData.totalPage ? (
            <Button asChild variant="outline" size="sm">
              <Link href={buildPageHref(metaData.page + 1)}>
                Next <ChevronRight />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled>
              Next <ChevronRight />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
