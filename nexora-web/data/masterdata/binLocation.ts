export const statCards = [
  { label: "Total Locations", value: 48, sub: "All bin locations", iconBg: "bg-blue-50 dark:bg-blue-950", iconColor: "text-blue-500", icon: "users" },
  { label: "Active Locations", value: 42, sub: "Currently active", iconBg: "bg-green-50 dark:bg-green-950", iconColor: "text-green-500", icon: "check" },
  { label: "Inactive Locations", value: 6, sub: "Currently inactive", iconBg: "bg-red-50 dark:bg-red-950", iconColor: "text-red-500", icon: "lock" },
  { label: "Full Locations", value: 15, sub: "At max capacity", iconBg: "bg-orange-50 dark:bg-orange-950", iconColor: "text-orange-500", icon: "shield" },
  { label: "Available Space", value: "73%", sub: "Overall utilization", iconBg: "bg-slate-50 dark:bg-slate-950", iconColor: "text-slate-500", icon: "crown" },
];

export const warehouses = [
  "All Warehouse",
  "Gudang Cold Storage A",
  "Gudang Cold Storage B",
  "Gudang Dry Storage",
  "Gudang Bahan Baku",
  "Gudang Finished Goods",
  "Gudang Sparepart",
  "Transit Warehouse",
  "Gudang Cabang Surabaya",
];

export const binLocations = [
  { id: 1, code: "BIN-CSA-01", name: "Cold Storage A - Rack 1", warehouse: "Gudang Cold Storage A", aisle: "A", rack: "R01", shelf: "S1", bin: "B01", maxCapacity: 500, capacityUom: "KG", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 2, code: "BIN-CSA-02", name: "Cold Storage A - Rack 2", warehouse: "Gudang Cold Storage A", aisle: "A", rack: "R01", shelf: "S2", bin: "B02", maxCapacity: 500, capacityUom: "KG", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 3, code: "BIN-CSB-01", name: "Cold Storage B - Rack 1", warehouse: "Gudang Cold Storage B", aisle: "B", rack: "R01", shelf: "S1", bin: "B01", maxCapacity: 1000, capacityUom: "KG", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 4, code: "BIN-DRY-01", name: "Dry Storage - Pallet 1", warehouse: "Gudang Dry Storage", aisle: "C", rack: "R01", shelf: "S1", bin: "P01", maxCapacity: 200, capacityUom: "PCS", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 5, code: "BIN-DRY-02", name: "Dry Storage - Pallet 2", warehouse: "Gudang Dry Storage", aisle: "C", rack: "R01", shelf: "S2", bin: "P02", maxCapacity: 200, capacityUom: "PCS", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 6, code: "BIN-BB-01", name: "Bahan Baku - Rack A1", warehouse: "Gudang Bahan Baku", aisle: "D", rack: "R02", shelf: "S1", bin: "B01", maxCapacity: 300, capacityUom: "KG", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 7, code: "BIN-FG-01", name: "Finished Goods - Rack 1", warehouse: "Gudang Finished Goods", aisle: "E", rack: "R01", shelf: "S1", bin: "B01", maxCapacity: 150, capacityUom: "PCS", status: "Inactive", statusColor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400" },
  { id: 8, code: "BIN-SP-01", name: "Sparepart - Cabinet A", warehouse: "Gudang Sparepart", aisle: "F", rack: "R01", shelf: "S1", bin: "C01", maxCapacity: 100, capacityUom: "PCS", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
];

export default binLocations;
