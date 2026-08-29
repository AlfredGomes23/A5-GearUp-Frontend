import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser as getCurrentUser } from "@/services/getUser";
import { getUser } from "../../_actions/getUser";
import { getUserRentals } from "../../_actions/getUserRentals";
import { getUserGear } from "../../_actions/getUserGear";
import { UserStatusControl } from "./UserStatusControl";
import { roleVariant, statusVariant, statusVariantForUser } from "../../../_components/types";
import { formatDate } from "@/lib/formatDate";

const UserDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const [userRes, currentRes, rentalsRes, gearRes] = await Promise.all([
    getUser(id),
    getCurrentUser(),
    getUserRentals(id, { limit: "10" }),
    getUserGear(id, { limit: "10" }),
  ]);

  const user = userRes.data;
  const isSelf = currentRes?.data?.id === id;

  if (!user) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">User not found</h1>
        <p className="text-muted-foreground">{userRes.message || "No user with this id."}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
        {!isSelf && <UserStatusControl userId={id} currentStatus={user.status} />}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Account</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Role:</span>
              <Badge className={roleVariant(user.role)}>
                {user.role}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Status:</span>
              <Badge className={statusVariantForUser(user.status)}>
                {user.status}
              </Badge>
            </div>
            <div>
              <span className="text-muted-foreground">Phone:</span> {user.phone || "—"}
            </div>
            <div>
              <span className="text-muted-foreground">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {user.role === "CUSTOMER" && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rental Orders ({rentalsRes.metaData?.total ?? rentalsRes.data.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {rentalsRes.data.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">No rental orders.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {rentalsRes.data.map((rental) => (
                  <div key={rental.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">{rental.gear?.title ?? "Unknown Gear"}</span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(rental.startDate)} — {formatDate(rental.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-primary">${rental.totalPrice}</span>
                      <Badge className={statusVariant(rental.status)}>
                        {rental.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {user.role === "PROVIDER" && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Gear Listings ({gearRes.metaData?.total ?? gearRes.data.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {gearRes.data.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">No gear listings.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {gearRes.data.map((gear) => (
                  <div key={gear.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">{gear.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {gear.brand} · Stock: {gear.stock}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-primary">${gear.pricePerDay}/day</span>
                      <Badge variant={gear.isAvailable ? "default" : "destructive"}>
                        {gear.isAvailable ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserDetailPage;
