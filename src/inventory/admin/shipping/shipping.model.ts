import { IMaster } from "../master/master.model";

export interface IShipping {
  id: number;
  item_id: number;
  location: string;
  quantity: number;
  min_quantity: number;
  max_quantity: number;
  usage_level: string;
  master: IMaster;
}