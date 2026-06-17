import { redirect } from "next/navigation";

export default function SalesCreditNotesRedirect() {
  // Redirect legacy/simpler URL to the new credit notes page
  redirect("/sales/sales-management/credit-notes");
}

export const runtime = "edge";
