export const statCards = [
  { label: 'Total DO', value: 102, sub: 'All delivery orders', icon: 'truck', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-slate-500' },
  { label: 'Completed', value: 48, sub: 'Fully delivered', icon: 'check-circle', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-emerald-500' },
  { label: 'In Delivery', value: 22, sub: 'In transit', icon: 'square', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-blue-500' },
  { label: 'Pending', value: 26, sub: 'Awaiting processing', icon: 'clock', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-amber-500' },
  { label: 'Last Updated', value: 'Today', sub: 'Data synchronized', icon: 'calendar', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-indigo-500' },
];

export type DeliveryOrder = {
  id: number;
  doNo: string;
  doDate: string;
  soNo: string;
  customer: string;
  warehouse: string;
  deliveryDate: string;
  status: 'Completed' | 'In Delivery' | 'Pending' | 'Cancelled';
  deliveryType: 'Own Fleet' | 'External';
  amount: string;
};

export const deliveryOrders: DeliveryOrder[] = [
  { id: 1, doNo: 'DO-2026-000126', doDate: '2026-06-16', soNo: 'SO-2026-000126', customer: 'PT Maju Bersama', warehouse: 'WH01 - Cold Storage 01', deliveryDate: '2026-06-16', status: 'Completed', deliveryType: 'Own Fleet', amount: 'Rp 18.870.000' },
  { id: 2, doNo: 'DO-2026-000125', doDate: '2026-06-15', soNo: 'SO-2026-000125', customer: 'CV Sumber Abadi', warehouse: 'WH02 - Dry Storage 01', deliveryDate: '2026-06-17', status: 'In Delivery', deliveryType: 'External', amount: 'Rp 78.500.000' },
  { id: 3, doNo: 'DO-2026-000124', doDate: '2026-06-14', soNo: 'SO-2026-000124', customer: 'PT Global Sejahtera', warehouse: 'WH01 - Cold Storage 01', deliveryDate: '2026-06-16', status: 'Pending', deliveryType: 'Own Fleet', amount: 'Rp 250.000.000' },
  { id: 4, doNo: 'DO-2026-000123', doDate: '2026-06-13', soNo: 'SO-2026-000123', customer: 'PT Sukses Mandiri', warehouse: 'WH03 - Ambient 01', deliveryDate: '2026-06-15', status: 'Pending', deliveryType: 'External', amount: 'Rp 98.750.000' },
  { id: 5, doNo: 'DO-2026-000122', doDate: '2026-06-12', soNo: 'SO-2026-000122', customer: 'UD Karya Utama', warehouse: 'WH01 - Cold Storage 01', deliveryDate: '2026-06-14', status: 'Completed', deliveryType: 'Own Fleet', amount: 'Rp 55.200.000' },
  { id: 6, doNo: 'DO-2026-000121', doDate: '2026-06-11', soNo: 'SO-2026-000121', customer: 'PT Indo Makmur', warehouse: 'WH02 - Dry Storage 01', deliveryDate: '2026-06-13', status: 'In Delivery', deliveryType: 'External', amount: 'Rp 142.300.000' },
  { id: 7, doNo: 'DO-2026-000120', doDate: '2026-06-10', soNo: 'SO-2026-000120', customer: 'PT Berkah Abadi', warehouse: 'WH03 - Ambient 01', deliveryDate: '2026-06-12', status: 'Cancelled', deliveryType: 'Own Fleet', amount: 'Rp 32.500.000' },
  { id: 8, doNo: 'DO-2026-000119', doDate: '2026-06-09', soNo: 'SO-2026-000119', customer: 'PT Sehat Selalu', warehouse: 'WH01 - Cold Storage 01', deliveryDate: '2026-06-11', status: 'Completed', deliveryType: 'Own Fleet', amount: 'Rp 27.500.000' },
  { id: 9, doNo: 'DO-2026-000118', doDate: '2026-06-08', soNo: 'SO-2026-000118', customer: 'PT Harapan Jaya', warehouse: 'WH02 - Dry Storage 01', deliveryDate: '2026-06-10', status: 'Pending', deliveryType: 'External', amount: 'Rp 19.400.000' },
  { id: 10, doNo: 'DO-2026-000117', doDate: '2026-06-07', soNo: 'SO-2026-000117', customer: 'PT Sejahtera Abadi', warehouse: 'WH01 - Cold Storage 01', deliveryDate: '2026-06-09', status: 'In Delivery', deliveryType: 'Own Fleet', amount: 'Rp 63.000.000' },
];

export default deliveryOrders;
