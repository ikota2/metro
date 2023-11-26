import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import MapView, {Circle, Geojson, Polyline} from 'react-native-maps';
import { FeatureCollection, Geometry } from 'geojson';
import stationData from '../../assets/stations.json';
import {Station,} from '../../types';


const stationColors: any = {
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
const getColorByPicto = (picto: string): string => {
  return stationColors[picto] || 'gray';
};

export default function TabTwoScreen() {
  // const [destination, setDestination] = useState({from: '', to: ''});
  const stations: Station[] = stationData.features.map(feature => ({
    id: feature.id,
    name: feature.properties.NOM_ESTACIO,
    latitude: feature.geometry.coordinates[1],
    longitude: feature.geometry.coordinates[0],
    picto: feature.properties.PICTO,
  }));
  const lines: { [key: string]: Station[] } = {};
  stations.forEach(station => {
    const line = station.picto;
    if (!lines[line]) {
      lines[line] = [];
    }
    lines[line].push(station);
  });
  const myPlace: FeatureCollection<Geometry> = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [64.165329, 48.844287],
        }
      }
    ]
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
         showsUserLocation={true}
         zoomEnabled={true}
         zoomTapEnabled={true}
         initialRegion={{
           latitude: 41.3851,
           longitude: 2.1734,
           latitudeDelta: 0.0922,
           longitudeDelta: 0.0421,
         }}
      >
        <Geojson
          geojson={myPlace}
          strokeColor="red"
          fillColor="green"
          strokeWidth={2}
        />
        {Object.keys(lines).map(line => (
          <Polyline
            key={line}
            coordinates={lines[line].map(({ latitude, longitude }) => ({ latitude, longitude }))}
            strokeColor={getColorByPicto(line)}
            strokeWidth={2}
          />
        ))}
        {stations.map(station => (
          <Circle
            key={station.id}
            center={{ latitude: station.latitude, longitude: station.longitude }}
            radius={15}
            fillColor={getColorByPicto(station.picto)}
            // strokeWidth={0}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  customMarker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
  },
});
