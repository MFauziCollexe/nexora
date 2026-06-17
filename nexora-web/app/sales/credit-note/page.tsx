import { redirect } from "next/navigation";

export default function SalesCreditNoteRedirect() {
  redirect("/sales/sales-management/credit-notes");
}

export const runtime = "edge";
