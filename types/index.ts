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

export interface Path {
  distance: number;
  path: string[];
}

export interface SelectedDetails {
  selectedIdFrom: string | null;
  selectedIdTo: string | null;
  selectedNameFrom: string;
  selectedNameTo: string;
}
