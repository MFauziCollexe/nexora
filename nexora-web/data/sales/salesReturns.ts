export const statCards = [
  { label: 'Total Sales Return', value: 34, sub: 'All returns', icon: 'file-text', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-slate-500' },
  { label: 'Approved', value: 21, sub: 'Approved returns', icon: 'check-circle', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-emerald-500' },
  { label: 'Pending', value: 8, sub: 'Awaiting approval', icon: 'clock', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-amber-500' },
  { label: 'Rejected', value: 5, sub: 'Rejected returns', icon: 'x-circle', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-rose-500' },
  { label: 'Last Updated', value: 'Today', sub: 'Data synchronized', icon: 'calendar', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-indigo-500' },
];

export type SalesReturn = {
  id: number;
  returnNo: string;
  returnDate: string;
  invoiceNo: string;
  customer: string;
  returnType: 'Return' | 'Exchange' | 'Credit Note';
  reason: string;
  amount: string;
  status: 'Approved' | 'Pending' | 'Rejected';
};

export const salesReturns: SalesReturn[] = [
  { id: 1, returnNo: 'SR-2026-000034', returnDate: '16/06/2026', invoiceNo: 'INV-2026-000126', customer: 'PT Maju Bersama', returnType: 'Return', reason: 'Damaged Product', amount: 'Rp 1.250.000', status: 'Approved' },
  { id: 2, returnNo: 'SR-2026-000033', returnDate: '15/06/2026', invoiceNo: 'INV-2026-000125', customer: 'CV Sumber Abadi', returnType: 'Return', reason: 'Wrong Item', amount: 'Rp 2.500.000', status: 'Pending' },
  { id: 3, returnNo: 'SR-2026-000032', returnDate: '14/06/2026', invoiceNo: 'INV-2026-000124', customer: 'PT Global Sejahtera', returnType: 'Return', reason: 'Expired Product', amount: 'Rp 3.000.000', status: 'Rejected' },
  { id: 4, returnNo: 'SR-2026-000031', returnDate: '13/06/2026', invoiceNo: 'INV-2026-000123', customer: 'PT Sukses Mandiri', returnType: 'Exchange', reason: 'Damaged Product', amount: 'Rp 1.750.000', status: 'Approved' },
  { id: 5, returnNo: 'SR-2026-000030', returnDate: '12/06/2026', invoiceNo: 'INV-2026-000122', customer: 'UD Karya Utama', returnType: 'Return', reason: 'Wrong Item', amount: 'Rp 900.000', status: 'Approved' },
  { id: 6, returnNo: 'SR-2026-000029', returnDate: '11/06/2026', invoiceNo: 'INV-2026-000121', customer: 'PT Indo Makmur', returnType: 'Credit Note', reason: 'Not As Described', amount: 'Rp 1.200.000', status: 'Pending' },
  { id: 7, returnNo: 'SR-2026-000028', returnDate: '10/06/2026', invoiceNo: 'INV-2026-000120', customer: 'PT Berkah Abadi', returnType: 'Return', reason: 'Expired Product', amount: 'Rp 2.100.000', status: 'Approved' },
  { id: 8, returnNo: 'SR-2026-000027', returnDate: '09/06/2026', invoiceNo: 'INV-2026-000119', customer: 'PT Sehat Selalu', returnType: 'Exchange', reason: 'Damaged Product', amount: 'Rp 750.000', status: 'Rejected' },
  { id: 9, returnNo: 'SR-2026-000026', returnDate: '08/06/2026', invoiceNo: 'INV-2026-000118', customer: 'PT Harapan Jaya', returnType: 'Return', reason: 'Wrong Item', amount: 'Rp 1.400.000', status: 'Pending' },
  { id: 10, returnNo: 'SR-2026-000025', returnDate: '07/06/2026', invoiceNo: 'INV-2026-000117', customer: 'PT Sejahtera Abadi', returnType: 'Credit Note', reason: 'Packaging Damage', amount: 'Rp 800.000', status: 'Approved' },
];

export default salesReturns;
