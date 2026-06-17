import { redirect } from "next/navigation";

export default function SalesDeliveryNotesRedirect() {
  redirect("/sales/sales-management/delivery-notes");
}

export const runtime = "edge";
