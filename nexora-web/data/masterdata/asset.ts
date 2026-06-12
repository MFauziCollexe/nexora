export const statCards = [
  { label: "Total Assets", value: 125, sub: "All assets", iconBg: "bg-blue-50 dark:bg-blue-950", iconColor: "text-blue-500", icon: "package" },
  { label: "Active Assets", value: 98, sub: "Currently active", iconBg: "bg-green-50 dark:bg-green-950", iconColor: "text-green-500", icon: "check" },
  { label: "Maintenance", value: 14, sub: "In maintenance", iconBg: "bg-yellow-50 dark:bg-yellow-950", iconColor: "text-yellow-500", icon: "wrench" },
  { label: "Disposed", value: 13, sub: "Disposed assets", iconBg: "bg-red-50 dark:bg-red-950", iconColor: "text-red-500", icon: "trash" },
];

export const assets = [
  { id: 1, assetCode: "AST-0001", assetName: "Forklift Toyota 2.5 Ton", category: "Kendaraan Operasional", location: "Gudang Cold Storage A", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400", purchaseDate: "10 Jan 2022" },
  { id: 2, assetCode: "AST-0002", assetName: "Reach Truck Nichiyu", category: "Kendaraan Operasional", location: "Gudang Cold Storage B", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400", purchaseDate: "18 Mar 2022" },
  { id: 3, assetCode: "AST-0003", assetName: "Mesin Genset Perkins 100KVA", category: "Genset", location: "Area Genset", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400", purchaseDate: "05 Feb 2022" },
  { id: 4, assetCode: "AST-0004", assetName: "AC Panasonic 2 PK", category: "Peralatan Kantor", location: "Ruang Meeting", status: "Maintenance", statusColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400", purchaseDate: "12 Jul 2021" },
  { id: 5, assetCode: "AST-0005", assetName: "Laptop Dell Latitude 5420", category: "Peralatan IT", location: "Kantor HR", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400", purchaseDate: "20 Apr 2023" },
  { id: 6, assetCode: "AST-0006", assetName: "Panel Listrik Main Panel", category: "Panel Listrik", location: "Ruang Panel", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400", purchaseDate: "15 Aug 2021" },
  { id: 7, assetCode: "AST-0007", assetName: "Rak Gudang Medium", category: "Peralatan Gudang", location: "Gudang Cold Storage A", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400", purchaseDate: "03 Sep 2022" },
  { id: 8, assetCode: "AST-0008", assetName: "Timbangan Digital 1 Ton", category: "Peralatan Gudang", location: "Docking Area", status: "Maintenance", statusColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400", purchaseDate: "11 Nov 2022" },
];

export default assets;
