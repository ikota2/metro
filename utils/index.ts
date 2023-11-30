import { stations } from './stations';
import {Neighbour, Station} from '../types';
const getColorByPicto = (picto: string): string => {
  return stationColors[picto] || 'gray';
};

const splitPicto = (picto: string): string[] => {
  const lines = [];
  for (let i = 0; i < picto.length; i += 2) {
    lines.push(picto.substring(i, i + 2));
  }
  return lines;
};

const stationColors: Record<string, string> = {
  'L1': 'red',
  'L2': 'purple',
  'L3': 'green',
  'L4': 'yellow',
  'L5': 'blue',
  'L9S': 'orange',
  'L9N': 'orange',
  'L10N': 'aquamarine',
  'L10S': 'aquamarine',
  'L11': 'lightgreen',
  'FM': 'darkgreen',
};

const barcelonaLocation = {
  latitude: 41.3851,
  longitude: 2.1734,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export const addNeighbours = (stations: Station[]): Station[] => {
  return stations.map((station, index) => {
    const neighbours: Neighbour[] = [];

    if (index > 0) {
      neighbours.push({
        neighbourId: stations[index - 1].id,
        timeInMinutes: 1,
      });
    }

    if (index < stations.length - 1) {
      neighbours.push({
        neighbourId: stations[index + 1].id,
        timeInMinutes: 1,
      });
    }

    return {
      ...station,
      neighbours,
    };
  });
};

export const createLinesData = (stations: Station[]) => {
  const tempLines: { [key: string]: Station[] } = {};
  stations.forEach(station => {
    const line = station.picto;
    if (!tempLines[line]) {
      tempLines[line] = [];
    }
    tempLines[line].push(station);
  });
  return tempLines;
};

const stationsWithNeighbours = addNeighbours(stations);
const lines = createLinesData(stationsWithNeighbours);



export {
  getColorByPicto,
  splitPicto,
  stations,
  barcelonaLocation,
  stationsWithNeighbours,
  lines,
}
