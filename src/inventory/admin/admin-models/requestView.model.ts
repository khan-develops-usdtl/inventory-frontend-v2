import { IMaster } from "../master/master.model";

export interface IRequestView {
  id?: number;
  item_id: number;
  quantity: number;
  department: string;
  status: string;
  time_requested?: string;
  time_updated?: Date;
  is_confirmed?: boolean;
  user: string;
  location: string;
  comment: string;
  master: IMaster;
}