export interface IChemical {
  id?: number;
  cas: null;
  physical_state: string;
  container_size: string;
  health_hz: number;
  fire_hz: number;
  specific_hz: number;
  special_notes: string;
  reactivity_hz: string;
  item_id?: number;
}