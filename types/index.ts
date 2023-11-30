export interface Station {
  id: string;
  name: string;
  picto: string;
  latitude: number;
  longitude: number;
  neighbours: Neighbour[];
}

export interface Neighbour {
  neighbourId: string;
  timeInMinutes: number;
}

export interface SelectedDetails {
  selectedIdFrom: string | null;
  selectedIdTo: string | null;
  selectedNameFrom: string;
  selectedNameTo: string;
}
