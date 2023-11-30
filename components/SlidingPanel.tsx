import React, { FC } from 'react';
import { View, Dimensions, StyleSheet, TextInput } from 'react-native';
import {SelectedDetails} from '../types';

const windowHeight = Dimensions.get('window').height;
const panelHeight = windowHeight * 0.1;

interface SlidingPanelProps {
  selectedDetails: SelectedDetails;
  handlers: {
    handleFromChange: (stationName: string) => void,
    handleToChange: (stationName: string) => void
  }
}
const SlidingPanel: FC<SlidingPanelProps> = ({selectedDetails, handlers, }) => {
  const { handleFromChange, handleToChange } = handlers;
  const { selectedNameFrom, selectedNameTo } = selectedDetails;

  // TODO ids to names, wrong stations, autocomplete
  // if (selectedNameFrom.length > 0 && selectedNameTo.length > 0) {
  //   console.log(dijkstra(stationsWithNeighbours, selectedIdFrom, selectedIdTo));
  //  LOG  {"path": ["ESTACIONS.318", "ESTACIONS.317", "ESTACIONS.316"], "time": 2}
  // }

  return (
    <View style={styles.panel}>
      <TextInput style={styles.input} placeholder="From" value={selectedNameFrom} onChangeText={handleFromChange} />
      <TextInput style={styles.input} placeholder="To" value={selectedNameTo} onChangeText={handleToChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: panelHeight,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  input: {
    width: '40%',
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
});

export default SlidingPanel;
