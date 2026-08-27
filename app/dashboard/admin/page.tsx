import Link from "next/link";
import { ChevronRight, Users, Banknote, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUsers } from "./_actions/getUsers";
import { getAdminRentals } from "./_actions/getAdminRentals";
import { getAdminPayments } from "./_actions/getAdminPayments";
import { roleVariant, statusVariant, statusVariantForUser } from "../_components/types";

const AdminDashboard = async () => {
  const { data: users } = await getUsers({ limit: "100" });
  const { data: rentals } = await getAdminRentals({ limit: "5" });
  const { data: payments } = await getAdminPayments({ limit: "5" });

  const customers = users.filter((u) => u.role === "CUSTOMER").length;
  const providers = users.filter((u) => u.role === "PROVIDER").length;
  const activeUsers = users.filter((u) => u.status === "ACTIVE").length;

  const placed = rentals.filter((r) => r.status === "PLACED").length;
  const confirmed = rentals.filter((r) => r.status === "CONFIRMED").length;
  const returned = rentals.filter((r) => r.status === "RETURNED").length;

  const completedPayments = payments.filter((p) => p.status === "COMPLETED").length;
  const pendingPayments = payments.filter((p) => p.status === "PENDING").length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview of users, rentals &amp; payments.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Total</span>
                <span className="text-xl font-bold">{users.length}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Customers</span>
                <span className="text-xl font-bold text-green-600 dark:text-green-400">{customers}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Providers</span>
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{providers}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Active</span>
                <span className="text-xl font-bold">{activeUsers}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rental Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Placed</span>
                <span className="text-xl font-bold">{placed}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Confirmed</span>
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{confirmed}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Returned</span>
                <span className="text-xl font-bold text-green-600 dark:text-green-400">{returned}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Completed</span>
                <span className="text-xl font-bold text-green-600 dark:text-green-400">{completedPayments}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Pending</span>
                <span className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{pendingPayments}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Users</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard/admin/users">
                View All <ChevronRight className="size-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
                <Users className="size-10" />
                <p className="font-medium">No users yet</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {users.slice(0, 5).map((user) => (
                  <Link
                    key={user.id}
                    href={`/dashboard/admin/users/${user.id}`}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">{user.email}</span>
                      <span className="text-sm text-muted-foreground">
                        {user.name || user.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={roleVariant(user.role) as "default" | "secondary" | "destructive" | "outline"}>
                        {user.role}
                      </Badge>
                      <Badge variant={statusVariantForUser(user.status) as "default" | "secondary" | "destructive" | "outline"}>
                        {user.status}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Rentals</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard/admin/rental-orders">
                View All <ChevronRight className="size-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {rentals.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
                <Package className="size-10" />
                <p className="font-medium">No rentals yet</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {rentals.map((rental) => (
                  <Link
                    key={rental.id}
                    href={`/dashboard/admin/rental-orders/${rental.id}`}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">{rental.gear?.title ?? "Unknown Gear"}</span>
                      <span className="text-sm text-muted-foreground">
                        {rental.customer?.email ?? "Unknown"} · {rental.startDate} — {rental.endDate}
                      </span>
                    </div>
                    <Badge variant={statusVariant(rental.status) as "default" | "secondary" | "destructive" | "outline"}>
                      {rental.status}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Payments</CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard/admin/payments">
              View All <ChevronRight className="size-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
              <Banknote className="size-10" />
              <p className="font-medium">No payments yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {payments.map((payment) => (
                <Link
                  key={payment.id}
                  href={`/dashboard/admin/payments/${payment.id}`}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">Order #{payment.rentalOrder?.id.slice(0, 8) ?? "Unknown"}</span>
                    <span className="text-sm text-muted-foreground">
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleDateString()
                        : new Date(payment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-primary">${payment.amount}</span>
                    <Badge variant={statusVariant(payment.status) as "default" | "secondary" | "destructive" | "outline"}>
                      {payment.status}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
