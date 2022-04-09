import { IChemical } from "src/inventory/departments/chemicals/chemicals.model";
import { IDepartment } from "../../departments/departments-models/departments.model";

export interface IMaster {
  id: number;
  item: string;
  manufacturer: string;
  part_number: string;
  recent_cn: string;
  recent_vendor: string;
  fisher_cn: string;
  vwr_cn: string;
  lab_source_cn: string;
  next_advance_cn: string;
  purchase_unit: string;
  average_unit_price: number;
  category: string;
  comments: string;
  type: string;
  group: string;
  is_active: boolean;
  is_department_request: boolean;
  is_office_supply: boolean;
  extractions: IDepartment[];
  massSpec: IDepartment[];
  receiving: IDepartment[];
  rd: IDepartment[];
  screening: IDepartment[];
  quality: IDepartment[];
  shipping: IDepartment[];
  safety: IDepartment[];
  chemicals: IChemical;
}