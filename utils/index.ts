import {stationColors} from '../assets/stationColors';

export const getColorByPicto = (picto: string): string => {
  return stationColors[picto] || 'gray';
};

export const splitPicto = (picto: string): string[] => {
  const lines = [];
  for (let i = 0; i < picto.length; i += 2) {
    lines.push(picto.substring(i, i + 2));
  }
  return lines;
};
