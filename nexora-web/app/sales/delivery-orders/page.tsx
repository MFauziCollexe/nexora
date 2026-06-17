import { redirect } from "next/navigation";

export default function SalesDeliveryOrdersRedirect() {
  redirect("/sales/sales-management/delivery-orders");
}

export const runtime = "edge";
