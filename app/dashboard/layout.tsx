import { redirect } from "next/navigation";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/services/getUser";
import DashboardSidebar from "@/app/dashboard/_components/sidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const userRes = await getUser();

  if (!userRes?.success) {
    redirect("/auth/login");
  }

  return (
    <SidebarProvider>
      <DashboardSidebar user={userRes.data} />
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4 md:hidden">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
