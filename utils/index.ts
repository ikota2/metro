import { stations } from './stations';

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

export {
  getColorByPicto,
  splitPicto,
  stations,
  barcelonaLocation
}
