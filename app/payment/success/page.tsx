import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const PaymentSuccessPage = async () => {
  revalidatePath("/dashboard/customer/orders");
  revalidatePath("/dashboard/customer");
  redirect("/dashboard/customer/orders");
};

export default PaymentSuccessPage;
