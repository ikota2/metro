import {Station} from '../types';
import stationData from '../assets/stations.json';

export const stations: Station[] = stationData.features.map(feature => ({
  id: feature.id,
  name: feature.properties.NOM_ESTACIO,
  latitude: feature.geometry.coordinates[1],
  longitude: feature.geometry.coordinates[0],
  picto: feature.properties.PICTO,
}));
