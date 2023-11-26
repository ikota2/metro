import React, {useMemo, useState} from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import MapView, {Circle, MapPressEvent, Polyline} from 'react-native-maps';
import getDistance from 'geolib/es/getDistance';
import stationData from '../../assets/stations.json';
import {SelectedDetails, Station} from '../../types';
import SlidingPanel from '../../components/SlidingPanel';

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

const TabTwoScreen = () => {
  const [selectedDetails, setSelectedDetails] = useState<SelectedDetails>({
    selectedIdFrom: null,
    selectedIdTo: null,
    selectedNameFrom: '',
    selectedNameTo: ''
  });

  const stations: Station[] = stationData.features.map(feature => ({
    id: feature.id,
    name: feature.properties.NOM_ESTACIO,
    latitude: feature.geometry.coordinates[1],
    longitude: feature.geometry.coordinates[0],
    picto: feature.properties.PICTO,
  }));

  const lines = useMemo(() => {
    const tempLines: { [key: string]: Station[] } = {};
    stations.forEach(station => {
      const line = station.picto;
      if (!tempLines[line]) {
        tempLines[line] = [];
      }
      tempLines[line].push(station);
    });
    return tempLines;
  }, [stations]);

  function handleMapPress(event: MapPressEvent) {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    let isZoneSelected = false;

    stations.forEach(station => {
      const distance = getDistance(
        { latitude, longitude },
        { latitude: station.latitude, longitude: station.longitude }
      );

      if (distance <= 15) {
        isZoneSelected = true;
        handleLocationClick(station.name, station.id);
      }
    });

    if (!isZoneSelected) {
      setSelectedDetails({ ...selectedDetails, selectedIdFrom: null, selectedIdTo: null });
    }
  }

  function handleLocationClick(stationName: string, stationId: string) {
    //  If the same station is selected as in 'from' or in 'to'
    if (selectedDetails.selectedNameFrom === stationName || selectedDetails.selectedNameTo === stationName) {
      if (selectedDetails.selectedNameFrom === stationName) {
        // Clear 'from' if the same station is selected again
        setSelectedDetails({
          ...selectedDetails,
          selectedIdFrom: null,
          selectedNameFrom: ''
        });
      } else {
        // Move 'to' to 'from' and clear 'to' if the same station in 'to' is selected again
        setSelectedDetails({
          selectedIdFrom: stationId,
          selectedNameFrom: stationName,
          selectedIdTo: null,
          selectedNameTo: ''
        });
      }
    }
    // If both 'from' and 'to' are already selected, start over with the new station in 'from'
    else if (selectedDetails.selectedNameFrom && selectedDetails.selectedNameTo) {
      setSelectedDetails({
        selectedIdFrom: stationId,
        selectedNameFrom: stationName,
        selectedIdTo: null,
        selectedNameTo: ''
      });
    }
    // If only 'from' is selected
    else if (selectedDetails.selectedNameFrom && !selectedDetails.selectedNameTo) {
      setSelectedDetails({
        ...selectedDetails,
        selectedIdTo: stationId,
        selectedNameTo: stationName
      });
    }
    // If nothing is selected, set the station in 'from'
    else {
      setSelectedDetails({
        selectedIdFrom: stationId,
        selectedNameFrom: stationName,
        selectedIdTo: null,
        selectedNameTo: ''
      });
    }
  }

  const handlers = {
    handleFromChange: (stationName: string) => {
      const station = stations.find(station => station.name === stationName);
      setSelectedDetails({
        ...selectedDetails,
        selectedNameFrom: stationName,
        selectedIdFrom: station ? station.id : null,
      });
    },
    handleToChange: (stationName: string) => {
      const station = stations.find(station => station.name === stationName);
      setSelectedDetails({
        ...selectedDetails,
        selectedNameTo: stationName,
        selectedIdTo: station ? station.id : null,
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        zoomEnabled={true}
        zoomTapEnabled={true}
        initialRegion={{
          latitude: 41.3851,
          longitude: 2.1734,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
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
            strokeColor={(selectedDetails.selectedIdFrom === station.id || selectedDetails.selectedIdTo === station.id) ? 'blue' : 'transparent'}
            strokeWidth={(selectedDetails.selectedIdFrom === station.id || selectedDetails.selectedIdTo === station.id) ? 2 : 0}
          />
        ))}
      </MapView>
      <SlidingPanel
        selectedDetails={selectedDetails}
        handlers={handlers}
      />
    </View>
  );
};

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
});

export default TabTwoScreen;
