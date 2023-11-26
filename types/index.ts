export interface Station {
  id: string;
  name: string;
  picto: string;
  latitude: number;
  longitude: number;
}

export interface SelectedDetails {
  selectedIdFrom: string | null;
  selectedIdTo: string | null;
  selectedNameFrom: string;
  selectedNameTo: string;
}
