import { IMaster } from "src/inventory/admin/master/master.model";

export interface IDepartment {
  id?: number;
  item_id: number;
  location?: string;
  quantity?: number;
  total_quantity?: number;
  min_quantity?: number;
  max_quantity?: number;
  usage_level?: string;
  master: IMaster;
  expiration_date?: string;
  received_date: string;
}