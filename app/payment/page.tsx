import { redirect } from "next/navigation";

const PaymentPage = () => {
  redirect("/dashboard/customer");
};

export default PaymentPage;
