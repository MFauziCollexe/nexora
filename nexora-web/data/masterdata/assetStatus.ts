export const statCards = [
  { label: "Total Status", value: 7, sub: "All statuses", iconBg: "bg-blue-50 dark:bg-blue-950", iconColor: "text-blue-500", icon: "list" },
  { label: "Active Status", value: 6, sub: "Currently active", iconBg: "bg-green-50 dark:bg-green-950", iconColor: "text-green-500", icon: "check" },
  { label: "Inactive Status", value: 1, sub: "Inactive status", iconBg: "bg-yellow-50 dark:bg-yellow-950", iconColor: "text-yellow-500", icon: "alert-circle" },
];

export const assetStatuses = [
  { id: 1, statusCode: "STS-01", statusName: "Active", description: "Aset dalam kondisi baik dan sedang digunakan.", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 2, statusCode: "STS-02", statusName: "Maintenance", description: "Aset sedang dalam perawatan rutin.", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 3, statusCode: "STS-03", statusName: "Repair", description: "Aset rusak dan sedang diperbaiki.", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 4, statusCode: "STS-04", statusName: "Idle", description: "Aset tidak digunakan untuk sementara waktu.", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 5, statusCode: "STS-05", statusName: "Lost", description: "Aset hilang dan dalam proses pencarian.", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 6, statusCode: "STS-06", statusName: "Disposed", description: "Aset sudah tidak digunakan dan telah dilepaskan.", status: "Active", statusColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
  { id: 7, statusCode: "STS-07", statusName: "Scrap", description: "Aset sudah tidak bernilai dan dijadikan scrap.", status: "Inactive", statusColor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400" },
];

export default assetStatuses;
