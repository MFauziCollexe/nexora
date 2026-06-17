import { redirect } from "next/navigation";

export default function SalesReturnsRedirectPage() {
  redirect("/sales/sales-management/sales-returns");
}

export const runtime = "edge";
