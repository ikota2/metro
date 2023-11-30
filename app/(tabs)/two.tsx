import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import MapView, { Circle, Polyline } from 'react-native-maps';

import SlidingPanel from '../../components/SlidingPanel';
import useMapInteraction from '../../hooks/useMapInteraction';
import { barcelonaLocation, getColorByPicto, lines, stations, stationsWithNeighbours } from '../../utils';

const TabTwoScreen = () => {
  const { selectedDetails, handleMapPress, handlers } = useMapInteraction(stations);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        zoomEnabled={true}
        zoomTapEnabled={true}
        initialRegion={barcelonaLocation}
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
        {stationsWithNeighbours.map(station => (
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
