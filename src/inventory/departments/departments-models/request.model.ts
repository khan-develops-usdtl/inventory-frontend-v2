import { IMaster } from "../../admin/master/master.model";

export interface IRequest {
  id?: number;
  item_id: number;
  quantity: number;
  department: string;
  status: string;
  time_requested?: string;
  time_updated?: string;
  is_confirmed?: boolean;
  user: string;
  location: string;
  comment: string;
  master: IMaster;
}