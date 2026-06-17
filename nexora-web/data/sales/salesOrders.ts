export const statCards = [
  { label: 'Total Sales Orders', value: 87, sub: 'All orders', icon: 'file-text', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-slate-500' },
  { label: 'Confirmed', value: 42, sub: 'Ready to process', icon: 'check-circle', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-emerald-500' },
  { label: 'Released', value: 18, sub: 'In warehouse', icon: 'truck', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-blue-500' },
  { label: 'Pending', value: 27, sub: 'Awaiting confirmation', icon: 'clock', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-amber-500' },
  { label: 'Last Updated', value: 'Today', sub: 'Data synchronized', icon: 'clock', iconBg: 'bg-slate-50 dark:bg-slate-950', iconColor: 'text-emerald-500' },
];

export type OrderItem = {
  no: number;
  itemCode: string;
  itemName: string;
  type: 'Service' | 'Item';
  description: string;
  uom: string;
  qty: number;
  unitPrice: number;
  discount: number;
  tax: number;
  amount: number;
};

export type StorageReservation = {
  coldRoom: string;
  startDate: string;
  endDate: string;
  reservedCapacity: string;
  status: 'Reserved' | 'Pending' | 'Released';
};

export type TimelineStep = {
  label: string;
  date: string;
  by: string;
  done: boolean;
  active?: boolean;
};

export type SalesOrder = {
  id: number;
  soNo: string;
  date: string;
  status: 'Confirmed' | 'Released' | 'Draft' | 'Pending';
  quotationNo: string;
  deliveryDate: string;
  warehouse: string;
  currency: string;
  paymentTerms: string;
  sales: string;
  referenceNo: string;
  description: string;
  customer: string;
  address: string;
  pic: string;
  email: string;
  phone: string;
  amount: string;
  items: OrderItem[];
  storage: StorageReservation;
  notes: string;
  attachments: { name: string; size: string }[];
  subtotal: number;
  discount: number;
  tax: number;
  grandTotal: number;
  timeline: TimelineStep[];
};

export const salesOrders: SalesOrder[] = [
  {
    id: 1,
    soNo: 'SO-2026-000126',
    date: '16/06/2026',
    status: 'Confirmed',
    quotationNo: 'QT-2026-000126',
    deliveryDate: '23/06/2026',
    warehouse: 'WH01 - Cold Storage 01',
    currency: 'IDR - Indonesian Rupiah',
    paymentTerms: 'NET 30',
    sales: 'Fauzi',
    referenceNo: '-',
    description: 'Sales order based on quotation QT-2026-000126',
    customer: 'PT Maju Bersama',
    address: 'Jl. Merdeka No. 123\nJakarta Pusat, DKI Jakarta 10110\nIndonesia',
    pic: 'Budi Santoso',
    email: 'budi@majubersama.co.id',
    phone: '0812-3456-7890',
    amount: 'Rp 18.870.000',
    items: [
      { no: 1, itemCode: 'SRV-001', itemName: 'Frozen Storage', type: 'Service', description: 'Storage -20°C per pallet/day', uom: 'Pallet', qty: 100, unitPrice: 150000, discount: 0, tax: 11, amount: 15000000 },
      { no: 2, itemCode: 'SRV-002', itemName: 'Handling In', type: 'Service', description: 'Receiving & handling in', uom: 'Pallet', qty: 100, unitPrice: 10000, discount: 0, tax: 11, amount: 1000000 },
      { no: 3, itemCode: 'SRV-003', itemName: 'Handling Out', type: 'Service', description: 'Handling out / delivery', uom: 'Pallet', qty: 100, unitPrice: 10000, discount: 0, tax: 11, amount: 1000000 },
    ],
    storage: { coldRoom: 'Frozen Room A', startDate: '01/07/2026', endDate: '31/07/2026', reservedCapacity: '100 Pallet', status: 'Reserved' },
    notes: 'Mohon siapkan storage sesuai tanggal yang disepakati.\nTerima kasih.',
    attachments: [{ name: 'SO-2026-000126.pdf', size: '245 KB' }],
    subtotal: 17000000,
    discount: 0,
    tax: 1870000,
    grandTotal: 18870000,
    timeline: [
      { label: 'Quotation Created', date: '16/06/2026 08:15', by: 'Fauzi', done: true },
      { label: 'Quotation Approved', date: '16/06/2026 10:20', by: 'Fauzi', done: true },
      { label: 'Sales Order Created', date: '16/06/2026 10:25', by: 'System', done: true },
      { label: 'Confirmed', date: '16/06/2026 10:30', by: 'Fauzi', done: true, active: true },
      { label: 'Released to Warehouse', date: '-', by: '-', done: false },
      { label: 'Delivery Order', date: '-', by: '-', done: false },
      { label: 'Sales Invoice', date: '-', by: '-', done: false },
    ],
  },
  {
    id: 2,
    soNo: 'SO-2026-000125',
    date: '15/06/2026',
    status: 'Released',
    quotationNo: 'QT-2026-000125',
    deliveryDate: '22/06/2026',
    warehouse: 'WH02 - Dry Storage 01',
    currency: 'IDR - Indonesian Rupiah',
    paymentTerms: 'NET 15',
    sales: 'Rizky',
    referenceNo: 'REF-001',
    description: 'Sales order based on quotation QT-2026-000125',
    customer: 'CV Sumber Abadi',
    address: 'Jl. Gatot Subroto No. 45\nJakarta Selatan 12930\nIndonesia',
    pic: 'Ahmad Yusuf',
    email: 'ahmad@sumberabadi.co.id',
    phone: '0821-9876-5432',
    amount: 'Rp 78.500.000',
    items: [
      { no: 1, itemCode: 'ITM-001', itemName: 'Dry Storage', type: 'Service', description: 'Dry storage per pallet/day', uom: 'Pallet', qty: 200, unitPrice: 50000, discount: 0, tax: 11, amount: 10000000 },
    ],
    storage: { coldRoom: 'Dry Room B', startDate: '01/07/2026', endDate: '31/07/2026', reservedCapacity: '200 Pallet', status: 'Reserved' },
    notes: '',
    attachments: [],
    subtotal: 10000000,
    discount: 0,
    tax: 1100000,
    grandTotal: 11100000,
    timeline: [
      { label: 'Quotation Created', date: '14/06/2026 09:00', by: 'Rizky', done: true },
      { label: 'Quotation Approved', date: '14/06/2026 11:00', by: 'Rizky', done: true },
      { label: 'Sales Order Created', date: '15/06/2026 08:30', by: 'System', done: true },
      { label: 'Confirmed', date: '15/06/2026 09:00', by: 'Rizky', done: true },
      { label: 'Released to Warehouse', date: '15/06/2026 10:00', by: 'Rizky', done: true, active: true },
      { label: 'Delivery Order', date: '-', by: '-', done: false },
      { label: 'Sales Invoice', date: '-', by: '-', done: false },
    ],
  },
  {
    id: 3,
    soNo: 'SO-2026-000124',
    date: '14/06/2026',
    status: 'Pending',
    quotationNo: 'QT-2026-000124',
    deliveryDate: '21/06/2026',
    warehouse: 'WH01 - Cold Storage 01',
    currency: 'IDR - Indonesian Rupiah',
    paymentTerms: 'NET 30',
    sales: 'Diana',
    referenceNo: '-',
    description: '',
    customer: 'PT Global Sejahtera',
    address: 'Jl. Sudirman Kav. 12\nJakarta Pusat 10220\nIndonesia',
    pic: 'Siti Rahma',
    email: 'siti@globalsejahtera.co.id',
    phone: '0812-1111-2222',
    amount: 'Rp 250.000.000',
    items: [
      { no: 1, itemCode: 'SRV-001', itemName: 'Frozen Storage', type: 'Service', description: 'Storage -20°C per pallet/day', uom: 'Pallet', qty: 500, unitPrice: 150000, discount: 0, tax: 11, amount: 75000000 },
    ],
    storage: { coldRoom: 'Frozen Room B', startDate: '21/06/2026', endDate: '20/07/2026', reservedCapacity: '500 Pallet', status: 'Pending' },
    notes: '',
    attachments: [],
    subtotal: 75000000,
    discount: 0,
    tax: 8250000,
    grandTotal: 83250000,
    timeline: [
      { label: 'Quotation Created', date: '13/06/2026 10:00', by: 'Diana', done: true },
      { label: 'Quotation Approved', date: '13/06/2026 14:00', by: 'Diana', done: true },
      { label: 'Sales Order Created', date: '14/06/2026 09:00', by: 'System', done: true },
      { label: 'Confirmed', date: '-', by: '-', done: false, active: true },
      { label: 'Released to Warehouse', date: '-', by: '-', done: false },
      { label: 'Delivery Order', date: '-', by: '-', done: false },
      { label: 'Sales Invoice', date: '-', by: '-', done: false },
    ],
  },
  {
    id: 4,
    soNo: 'SO-2026-000123',
    date: '13/06/2026',
    status: 'Draft',
    quotationNo: 'QT-2026-000123',
    deliveryDate: '-',
    warehouse: 'WH03 - Ambient 01',
    currency: 'IDR - Indonesian Rupiah',
    paymentTerms: 'Due on Receipt',
    sales: 'Fauzi',
    referenceNo: '-',
    description: '',
    customer: 'PT Sukses Mandiri',
    address: 'Jl. Thamrin No. 99\nJakarta Pusat 10350\nIndonesia',
    pic: 'Bambang Wibowo',
    email: 'bambang@suksesmandiri.co.id',
    phone: '0813-5555-6666',
    amount: 'Rp 98.750.000',
    items: [],
    storage: { coldRoom: '-', startDate: '-', endDate: '-', reservedCapacity: '-', status: 'Pending' },
    notes: '',
    attachments: [],
    subtotal: 98750000,
    discount: 0,
    tax: 10862500,
    grandTotal: 109612500,
    timeline: [
      { label: 'Quotation Created', date: '12/06/2026 08:00', by: 'Fauzi', done: true },
      { label: 'Quotation Approved', date: '-', by: '-', done: false, active: true },
      { label: 'Sales Order Created', date: '-', by: '-', done: false },
      { label: 'Confirmed', date: '-', by: '-', done: false },
      { label: 'Released to Warehouse', date: '-', by: '-', done: false },
      { label: 'Delivery Order', date: '-', by: '-', done: false },
      { label: 'Sales Invoice', date: '-', by: '-', done: false },
    ],
  },
  {
    id: 5,
    soNo: 'SO-2026-000122',
    date: '12/06/2026',
    status: 'Confirmed',
    quotationNo: 'QT-2026-000122',
    deliveryDate: '19/06/2026',
    warehouse: 'WH01 - Cold Storage 01',
    currency: 'IDR - Indonesian Rupiah',
    paymentTerms: 'NET 30',
    sales: 'Rizky',
    referenceNo: 'REF-002',
    description: 'Order reguler bulanan',
    customer: 'UD Karya Utama',
    address: 'Jl. Veteran No. 22\nBandung 40112\nIndonesia',
    pic: 'Dewi Lestari',
    email: 'dewi@karyautama.co.id',
    phone: '0822-3333-4444',
    amount: 'Rp 55.200.000',
    items: [
      { no: 1, itemCode: 'SRV-002', itemName: 'Handling In', type: 'Service', description: 'Receiving & handling in', uom: 'Pallet', qty: 80, unitPrice: 10000, discount: 0, tax: 11, amount: 800000 },
      { no: 2, itemCode: 'SRV-003', itemName: 'Handling Out', type: 'Service', description: 'Handling out / delivery', uom: 'Pallet', qty: 80, unitPrice: 10000, discount: 0, tax: 11, amount: 800000 },
    ],
    storage: { coldRoom: 'Frozen Room C', startDate: '19/06/2026', endDate: '18/07/2026', reservedCapacity: '80 Pallet', status: 'Reserved' },
    notes: 'Prioritas pengiriman sebelum jam 10 pagi.',
    attachments: [{ name: 'PO-UD-Karya.pdf', size: '180 KB' }],
    subtotal: 1600000,
    discount: 0,
    tax: 176000,
    grandTotal: 1776000,
    timeline: [
      { label: 'Quotation Created', date: '11/06/2026 07:30', by: 'Rizky', done: true },
      { label: 'Quotation Approved', date: '11/06/2026 10:00', by: 'Rizky', done: true },
      { label: 'Sales Order Created', date: '12/06/2026 08:00', by: 'System', done: true },
      { label: 'Confirmed', date: '12/06/2026 09:30', by: 'Rizky', done: true, active: true },
      { label: 'Released to Warehouse', date: '-', by: '-', done: false },
      { label: 'Delivery Order', date: '-', by: '-', done: false },
      { label: 'Sales Invoice', date: '-', by: '-', done: false },
    ],
  },
  {
    id: 6,
    soNo: 'SO-2026-000121',
    date: '11/06/2026',
    status: 'Released',
    quotationNo: 'QT-2026-000121',
    deliveryDate: '18/06/2026',
    warehouse: 'WH02 - Dry Storage 01',
    currency: 'IDR - Indonesian Rupiah',
    paymentTerms: 'NET 15',
    sales: 'Diana',
    referenceNo: '-',
    description: '',
    customer: 'PT Indo Makmur',
    address: 'Jl. Diponegoro No. 55\nSurabaya 60271\nIndonesia',
    pic: 'Eko Prasetyo',
    email: 'eko@indomakmur.co.id',
    phone: '0815-7777-8888',
    amount: 'Rp 142.300.000',
    items: [
      { no: 1, itemCode: 'ITM-002', itemName: 'Dry Storage', type: 'Service', description: 'Dry storage per pallet/day', uom: 'Pallet', qty: 300, unitPrice: 50000, discount: 0, tax: 11, amount: 15000000 },
    ],
    storage: { coldRoom: 'Dry Room A', startDate: '18/06/2026', endDate: '17/07/2026', reservedCapacity: '300 Pallet', status: 'Reserved' },
    notes: '',
    attachments: [],
    subtotal: 15000000,
    discount: 0,
    tax: 1650000,
    grandTotal: 16650000,
    timeline: [
      { label: 'Quotation Created', date: '10/06/2026 08:00', by: 'Diana', done: true },
      { label: 'Quotation Approved', date: '10/06/2026 12:00', by: 'Diana', done: true },
      { label: 'Sales Order Created', date: '11/06/2026 09:00', by: 'System', done: true },
      { label: 'Confirmed', date: '11/06/2026 10:00', by: 'Diana', done: true },
      { label: 'Released to Warehouse', date: '11/06/2026 14:00', by: 'Diana', done: true, active: true },
      { label: 'Delivery Order', date: '-', by: '-', done: false },
      { label: 'Sales Invoice', date: '-', by: '-', done: false },
    ],
  },
  {
    id: 7,
    soNo: 'SO-2026-000121',
    date: '11/06/2026',
    status: 'Released',
    quotationNo: 'QT-2026-000121',
    deliveryDate: '18/06/2026',
    warehouse: 'WH02 - Dry Storage 01',
    currency: 'IDR - Indonesian Rupiah',
    paymentTerms: 'NET 15',
    sales: 'Diana',
    referenceNo: '-',
    description: '',
    customer: 'PT Indo Makmur',
    address: 'Jl. Diponegoro No. 55\nSurabaya 60271\nIndonesia',
    pic: 'Eko Prasetyo',
    email: 'eko@indomakmur.co.id',
    phone: '0815-7777-8888',
    amount: 'Rp 142.300.000',
    items: [
      { no: 1, itemCode: 'ITM-002', itemName: 'Dry Storage', type: 'Service', description: 'Dry storage per pallet/day', uom: 'Pallet', qty: 300, unitPrice: 50000, discount: 0, tax: 11, amount: 15000000 },
    ],
    storage: { coldRoom: 'Dry Room A', startDate: '18/06/2026', endDate: '17/07/2026', reservedCapacity: '300 Pallet', status: 'Reserved' },
    notes: '',
    attachments: [],
    subtotal: 15000000,
    discount: 0,
    tax: 1650000,
    grandTotal: 16650000,
    timeline: [
      { label: 'Quotation Created', date: '10/06/2026 08:00', by: 'Diana', done: true },
      { label: 'Quotation Approved', date: '10/06/2026 12:00', by: 'Diana', done: true },
      { label: 'Sales Order Created', date: '11/06/2026 09:00', by: 'System', done: true },
      { label: 'Confirmed', date: '11/06/2026 10:00', by: 'Diana', done: true },
      { label: 'Released to Warehouse', date: '11/06/2026 14:00', by: 'Diana', done: true, active: true },
      { label: 'Delivery Order', date: '-', by: '-', done: false },
      { label: 'Sales Invoice', date: '-', by: '-', done: false },
    ],
  },
];

export default salesOrders;