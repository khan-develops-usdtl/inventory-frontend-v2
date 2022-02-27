import { IMaster } from "src/inventory/admin/master/master.model";

export class Extractions {
  id: number;
  item_id: number;
  location: string;
  quantity: number;
  min_quantity: number;
  max_quantity: number;
  usage_level: string;
  master: IMaster;
}