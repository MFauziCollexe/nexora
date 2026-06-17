export const statCards = [
  { label: 'Total Invoices', value: 156, sub: 'All invoices', icon: 'file-text', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-slate-500' },
  { label: 'Paid', value: 98, sub: 'Fully paid', icon: 'check-circle', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-emerald-500' },
  { label: 'Unpaid', value: 42, sub: 'Outstanding', icon: 'dollar-sign', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-amber-500' },
  { label: 'Overdue', value: 16, sub: 'Past due date', icon: 'alert-circle', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-rose-500' },
  { label: 'Last Updated', value: 'Today', sub: 'Data synchronized', icon: 'clock', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-indigo-500' },
];

export type Invoice = {
  id: number;
  invoiceNo: string;
  date: string;
  customer: string;
  soNo: string;
  dueDate: string;
  amount: string;
  paidAmount: string;
  status: 'Paid' | 'Partial' | 'Unpaid' | 'Overdue';
  sales: string;
};

export const invoices: Invoice[] = [
  { id: 1, invoiceNo: 'INV-2026-000126', date: '16/06/2026', customer: 'PT Maju Bersama', soNo: 'SO-2026-000126', dueDate: '16/07/2026', amount: 'Rp 18.870.000', paidAmount: 'Rp 18.870.000', status: 'Paid', sales: 'Fauzi' },
  { id: 2, invoiceNo: 'INV-2026-000125', date: '15/06/2026', customer: 'CV Sumber Abadi', soNo: 'SO-2026-000125', dueDate: '15/07/2026', amount: 'Rp 78.500.000', paidAmount: 'Rp 50.000.000', status: 'Partial', sales: 'Rizky' },
  { id: 3, invoiceNo: 'INV-2026-000124', date: '14/06/2026', customer: 'PT Global Sejahtera', soNo: 'SO-2026-000124', dueDate: '14/07/2026', amount: 'Rp 250.000.000', paidAmount: 'Rp 0', status: 'Unpaid', sales: 'Diana' },
  { id: 4, invoiceNo: 'INV-2026-000123', date: '13/06/2026', customer: 'PT Sukses Mandiri', soNo: 'SO-2026-000123', dueDate: '13/07/2026', amount: 'Rp 98.750.000', paidAmount: 'Rp 0', status: 'Overdue', sales: 'Fauzi' },
  { id: 5, invoiceNo: 'INV-2026-000122', date: '12/06/2026', customer: 'UD Karya Utama', soNo: 'SO-2026-000122', dueDate: '12/07/2026', amount: 'Rp 55.200.000', paidAmount: 'Rp 55.200.000', status: 'Paid', sales: 'Rizky' },
  { id: 6, invoiceNo: 'INV-2026-000121', date: '11/06/2026', customer: 'PT Indo Makmur', soNo: 'SO-2026-000121', dueDate: '11/07/2026', amount: 'Rp 142.300.000', paidAmount: 'Rp 70.000.000', status: 'Partial', sales: 'Diana' },
  { id: 7, invoiceNo: 'INV-2026-000120', date: '10/06/2026', customer: 'CV Berkah Abadi', soNo: 'SO-2026-000120', dueDate: '10/07/2026', amount: 'Rp 32.500.000', paidAmount: 'Rp 0', status: 'Unpaid', sales: 'Fauzi' },
  { id: 8, invoiceNo: 'INV-2026-000119', date: '09/06/2026', customer: 'PT Sehat Selalu', soNo: 'SO-2026-000119', dueDate: '09/07/2026', amount: 'Rp 27.500.000', paidAmount: 'Rp 27.500.000', status: 'Paid', sales: 'Rizky' },
  { id: 9, invoiceNo: 'INV-2026-000118', date: '08/06/2026', customer: 'PT Prima Niaga', soNo: 'SO-2026-000118', dueDate: '08/07/2026', amount: 'Rp 175.000.000', paidAmount: 'Rp 175.000.000', status: 'Paid', sales: 'Diana' },
  { id: 10, invoiceNo: 'INV-2026-000117', date: '07/06/2026', customer: 'PT Cahaya Abadi', soNo: 'SO-2026-000117', dueDate: '07/07/2026', amount: 'Rp 87.600.000', paidAmount: 'Rp 87.600.000', status: 'Paid', sales: 'Fauzi' },
];

export default invoices;
