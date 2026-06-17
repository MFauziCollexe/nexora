export const statCards = [
  { label: 'Total Delivery Notes', value: 124, sub: 'All delivery notes', icon: 'file-text', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-slate-500' },
  { label: 'Completed', value: 78, sub: 'Goods received', icon: 'check-circle', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-emerald-500' },
  { label: 'In Process', value: 28, sub: 'Partially received', icon: 'truck', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-blue-500' },
  { label: 'Pending', value: 14, sub: 'Awaiting receipt', icon: 'clock', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-amber-500' },
  { label: 'Last Updated', value: 'Today', sub: 'Data synchronized', icon: 'calendar', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-indigo-500' },
];

export type DeliveryNote = {
  id: number;
  dnNo: string;
  dnDate: string;
  doNo: string;
  customer: string;
  deliveryDate: string;
  receiver: string;
  status: 'Completed' | 'In Process' | 'Pending';
  amount: string;
};

export const deliveryNotes: DeliveryNote[] = [
  { id: 1, dnNo: 'DN-2026-000126', dnDate: '16/06/2026', doNo: 'DO-2026-000126', customer: 'PT Maju Bersama', deliveryDate: '16/06/2026', receiver: 'Budi Santoso', status: 'Completed', amount: 'Rp 18.870.000' },
  { id: 2, dnNo: 'DN-2026-000125', dnDate: '15/06/2026', doNo: 'DO-2026-000125', customer: 'CV Sumber Abadi', deliveryDate: '17/06/2026', receiver: 'Rizky Pratama', status: 'In Process', amount: 'Rp 78.500.000' },
  { id: 3, dnNo: 'DN-2026-000124', dnDate: '14/06/2026', doNo: 'DO-2026-000124', customer: 'PT Global Sejahtera', deliveryDate: '16/06/2026', receiver: 'Diana Putri', status: 'Pending', amount: 'Rp 250.000.000' },
  { id: 4, dnNo: 'DN-2026-000123', dnDate: '13/06/2026', doNo: 'DO-2026-000123', customer: 'PT Sukses Mandiri', deliveryDate: '14/06/2026', receiver: 'Fauzi Rahman', status: 'Completed', amount: 'Rp 98.750.000' },
  { id: 5, dnNo: 'DN-2026-000122', dnDate: '12/06/2026', doNo: 'DO-2026-000122', customer: 'UD Karya Utama', deliveryDate: '14/06/2026', receiver: 'Rizky Pratama', status: 'Completed', amount: 'Rp 55.200.000' },
  { id: 6, dnNo: 'DN-2026-000121', dnDate: '11/06/2026', doNo: 'DO-2026-000121', customer: 'PT Indo Makmur', deliveryDate: '13/06/2026', receiver: 'Budi Santoso', status: 'In Process', amount: 'Rp 142.300.000' },
  { id: 7, dnNo: 'DN-2026-000120', dnDate: '10/06/2026', doNo: 'DO-2026-000120', customer: 'PT Berkah Abadi', deliveryDate: '12/06/2026', receiver: 'Diana Putri', status: 'Pending', amount: 'Rp 32.500.000' },
  { id: 8, dnNo: 'DN-2026-000119', dnDate: '09/06/2026', doNo: 'DO-2026-000119', customer: 'PT Sehat Selalu', deliveryDate: '11/06/2026', receiver: 'Fauzi Rahman', status: 'Completed', amount: 'Rp 27.500.000' },
  { id: 9, dnNo: 'DN-2026-000118', dnDate: '08/06/2026', doNo: 'DO-2026-000118', customer: 'PT Harapan Jaya', deliveryDate: '10/06/2026', receiver: 'Rizky Pratama', status: 'Pending', amount: 'Rp 19.400.000' },
  { id: 10, dnNo: 'DN-2026-000117', dnDate: '07/06/2026', doNo: 'DO-2026-000117', customer: 'PT Sejahtera Abadi', deliveryDate: '09/06/2026', receiver: 'Budi Santoso', status: 'In Process', amount: 'Rp 63.000.000' },
  { id: 11, dnNo: 'DN-2026-000116', dnDate: '06/06/2026', doNo: 'DO-2026-000116', customer: 'PT Makmur Sentosa', deliveryDate: '08/06/2026', receiver: 'Ayu Permata', status: 'Completed', amount: 'Rp 44.000.000' },
  { id: 12, dnNo: 'DN-2026-000115', dnDate: '05/06/2026', doNo: 'DO-2026-000115', customer: 'PT Jaya Abadi', deliveryDate: '07/06/2026', receiver: 'Sinta Dewi', status: 'Pending', amount: 'Rp 22.450.000' },
];

export default deliveryNotes;
