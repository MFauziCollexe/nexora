export const statCards = [
  { label: 'Total Credit Notes', value: 28, sub: 'All credit notes', icon: 'file-text', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-slate-500' },
  { label: 'Issued', value: 18, sub: 'Credit notes issued', icon: 'check-circle', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-emerald-500' },
  { label: 'Unused', value: 7, sub: 'Not yet applied', icon: 'clock', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-amber-500' },
  { label: 'Used', value: 3, sub: 'Already applied', icon: 'credit-card', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-blue-500' },
  { label: 'Last Updated', value: 'Today', sub: 'Data synchronized', icon: 'calendar', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-indigo-500' },
];

export type CreditNote = {
  id: number;
  creditNoteNo: string;
  date: string;
  invoiceNo: string;
  customer: string;
  reason: string;
  amount: string;
  usedAmount: string;
  status: 'Used' | 'Unused' | 'Partial';
  expiresOn: string;
};

export const creditNotes: CreditNote[] = [
  { id: 1, creditNoteNo: 'CN-2026-000028', date: '16/06/2026', invoiceNo: 'INV-2026-000126', customer: 'PT Maju Bersama', reason: 'Overpayment', amount: 'Rp 2.500.000', usedAmount: 'Rp 2.500.000', status: 'Used', expiresOn: '16/06/2027' },
  { id: 2, creditNoteNo: 'CN-2026-000027', date: '15/06/2026', invoiceNo: 'INV-2026-000125', customer: 'CV Sumber Abadi', reason: 'Return Item', amount: 'Rp 1.750.000', usedAmount: 'Rp 0', status: 'Unused', expiresOn: '15/06/2027' },
  { id: 3, creditNoteNo: 'CN-2026-000026', date: '14/06/2026', invoiceNo: 'INV-2026-000124', customer: 'PT Global Sejahtera', reason: 'Price Adjustment', amount: 'Rp 5.000.000', usedAmount: 'Rp 0', status: 'Unused', expiresOn: '14/06/2027' },
  { id: 4, creditNoteNo: 'CN-2026-000025', date: '13/06/2026', invoiceNo: 'INV-2026-000123', customer: 'PT Sukses Mandiri', reason: 'Return Item', amount: 'Rp 3.250.000', usedAmount: 'Rp 3.250.000', status: 'Used', expiresOn: '13/06/2027' },
  { id: 5, creditNoteNo: 'CN-2026-000024', date: '12/06/2026', invoiceNo: 'INV-2026-000122', customer: 'UD Karya Utama', reason: 'Service Adjustment', amount: 'Rp 1.100.000', usedAmount: 'Rp 0', status: 'Unused', expiresOn: '12/06/2027' },
  { id: 6, creditNoteNo: 'CN-2026-000023', date: '11/06/2026', invoiceNo: 'INV-2026-000121', customer: 'PT Indo Makmur', reason: 'Overpayment', amount: 'Rp 2.000.000', usedAmount: 'Rp 1.200.000', status: 'Partial', expiresOn: '11/06/2027' },
  { id: 7, creditNoteNo: 'CN-2026-000022', date: '10/06/2026', invoiceNo: 'INV-2026-000120', customer: 'PT Berkah Abadi', reason: 'Return Item', amount: 'Rp 1.800.000', usedAmount: 'Rp 0', status: 'Unused', expiresOn: '10/06/2027' },
  { id: 8, creditNoteNo: 'CN-2026-000021', date: '09/06/2026', invoiceNo: 'INV-2026-000119', customer: 'PT Sehat Selalu', reason: 'Price Adjustment', amount: 'Rp 850.000', usedAmount: 'Rp 850.000', status: 'Used', expiresOn: '09/06/2027' },
  { id: 9, creditNoteNo: 'CN-2026-000020', date: '08/06/2026', invoiceNo: 'INV-2026-000118', customer: 'PT Harapan Jaya', reason: 'Return Item', amount: 'Rp 1.600.000', usedAmount: 'Rp 0', status: 'Unused', expiresOn: '08/06/2027' },
  { id: 10, creditNoteNo: 'CN-2026-000019', date: '07/06/2026', invoiceNo: 'INV-2026-000117', customer: 'PT Sejahtera Abadi', reason: 'Overpayment', amount: 'Rp 1.900.000', usedAmount: 'Rp 1.900.000', status: 'Used', expiresOn: '07/06/2027' },
];

export default creditNotes;
