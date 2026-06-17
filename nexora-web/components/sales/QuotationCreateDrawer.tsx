"use client";

import DrawerForm from "@/components/masterdata/DrawerForm";
import QuotationCreateForm from "@/components/sales/QuotationCreateForm";

export default function QuotationCreateDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <DrawerForm open={open} title="Add Quotation" className="w-[95vw] max-w-[1200px]" onClose={onClose}>
      <QuotationCreateForm onCancel={onClose} />
    </DrawerForm>
  );
}
