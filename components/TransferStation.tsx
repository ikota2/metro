import React from 'react';
import { Marker, Circle } from 'react-native-maps';
import { getColorByPicto, splitPicto } from '../utils';
import {Station} from '../types';

interface TransferStationProps {
  station: Station;
  radius: number;
}

export const TransferStation: React.FC<TransferStationProps> = ({ station, radius }) => {
  const handlePress = () => {
    console.log("Станция: ", station.name);
  };

  const stationLines = splitPicto(station.picto);

  return stationLines.map((line) => (
    <Marker
      key={station.id + line}
      coordinate={{ latitude: station.latitude, longitude: station.longitude }}
      onPress={handlePress}
    >
      <Circle
        center={{ latitude: station.latitude, longitude: station.longitude }}
        radius={radius}
        fillColor={getColorByPicto(line)}
        strokeWidth={0}
      />
    </Marker>
  ));
};
