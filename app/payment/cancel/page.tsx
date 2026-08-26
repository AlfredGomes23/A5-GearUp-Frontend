import { redirect } from "next/navigation";

const PaymentCancelPage = async () => {
  redirect("/dashboard/customer/orders");
};

export default PaymentCancelPage;
