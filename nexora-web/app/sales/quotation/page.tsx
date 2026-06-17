import { redirect } from "next/navigation";

export default function SalesQuotationRedirect() {
  // Redirect legacy/simpler URL to the new quotations page
  redirect("/sales/sales-management/quotations");
}

export const runtime = "edge";
