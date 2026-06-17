export const statCards = [
  { label: 'Total Quotations', value: 125, sub: 'All quotations', icon: 'file-text', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-slate-500' },
  { label: 'Open Quotations', value: 68, sub: 'Pending follow up', icon: 'clock', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-amber-500' },
  { label: 'Expiring Soon', value: 12, sub: 'Within 7 days', icon: 'alert-circle', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-rose-500' },
  { label: 'Converted to SO', value: 45, sub: 'This month', icon: 'dollar-sign', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-emerald-500' },
  { label: 'Last Updated', value: 'Today', sub: 'Data synchronized', icon: 'dollar-sign', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-emerald-500' },
];

export const quotations = [
  { id: 1, no: 'QT-2026-000125', date: '2026-05-31', customer: 'PT Maju Bersama', validUntil: '2026-06-07', amount: 'Rp 125.000.000', status: 'Open', sales: 'Fauzi' },
  { id: 2, no: 'QT-2026-000124', date: '2026-05-30', customer: 'CV Sumber Abadi', validUntil: '2026-06-06', amount: 'Rp 78.500.000', status: 'Open', sales: 'Rizky' },
  { id: 3, no: 'QT-2026-000123', date: '2026-05-29', customer: 'PT Global Sejahtera', validUntil: '2026-06-05', amount: 'Rp 250.000.000', status: 'Sent', sales: 'Fauzi' },
  { id: 4, no: 'QT-2026-000122', date: '2026-05-28', customer: 'PT Sukses Mandiri', validUntil: '2026-06-04', amount: 'Rp 98.750.000', status: 'Expired', sales: 'Rizky' },
  { id: 5, no: 'QT-2026-000121', date: '2026-05-27', customer: 'UD Karya Utama', validUntil: '2026-06-03', amount: 'Rp 55.200.000', status: 'Converted', sales: 'Diana' },
  { id: 6, no: 'QT-2026-000120', date: '2026-05-26', customer: 'PT Indo Makmur', validUntil: '2026-06-02', amount: 'Rp 142.300.000', status: 'Open', sales: 'Fauzi' },
  { id: 7, no: 'QT-2026-000119', date: '2026-05-25', customer: 'CV Berkah Jaya', validUntil: '2026-06-01', amount: 'Rp 63.800.000', status: 'Draft', sales: 'Rizky' },
  { id: 8, no: 'QT-2026-000118', date: '2026-05-24', customer: 'PT Prima Niaga', validUntil: '2026-05-31', amount: 'Rp 175.000.000', status: 'Open', sales: 'Diana' },
  { id: 9, no: 'QT-2026-000117', date: '2026-05-23', customer: 'PT Cahaya Abadi', validUntil: '2026-05-30', amount: 'Rp 87.600.000', status: 'Sent', sales: 'Fauzi' },
  { id: 10, no: 'QT-2026-000116', date: '2026-05-22', customer: 'UD Mapan Sentosa', validUntil: '2026-05-29', amount: 'Rp 45.900.000', status: 'Draft', sales: 'Rizky' },
];

export default quotations;
