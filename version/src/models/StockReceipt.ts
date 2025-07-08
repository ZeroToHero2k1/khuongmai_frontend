import type { StockReceiptDetail } from "./StockReceiptDetail";

export interface StockReceipt {
  id?: string;
  type: string;
  receiptDate?: Date;
  note?: string;
  createdBy?: string;
  details?: StockReceiptDetail[];
}