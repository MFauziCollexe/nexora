"use client";

import { useParams } from "next/navigation";
import QuotationCreateForm from "@/components/sales/QuotationCreateForm";

export default function QuotationDetailPage() {
  const params = useParams();

  return (
    <div className="p-4">
      <QuotationCreateForm quotationId={Number(params.id)} readOnly />
    </div>
  );
}
