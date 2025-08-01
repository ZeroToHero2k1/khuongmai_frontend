export interface Warehouse {
  id?: string;
  name: string;
  location?: string;
  managerName?: string;
  phone?: string;
  existExportReceipts?: boolean;
  existImportReceipts?: boolean;
}