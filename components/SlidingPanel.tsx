import React, {FC, useRef, useState} from 'react';
import {View, Animated, PanResponder, Dimensions, StyleSheet, TextInput} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const panelHeight = windowHeight * 0.1; // Panel height (20% of the screen)

interface SlidingPanelProps {
  destination: { from: string, to: string };
  setDestination: React.Dispatch<React.SetStateAction<{from: string, to: string}>>;
}
const SlidingPanel: FC<SlidingPanelProps> = ({destination, setDestination, }) => {
  const { from, to } = destination;

  const handleFromChange = (station: string) => {
    setDestination(prevState => ({ ...prevState, from: station }));
  };

  const handleToChange = (station: string) => {
    setDestination(prevState => ({ ...prevState, to: station }));
  };

  return (
    <View style={styles.panel}>
      <TextInput style={styles.input} placeholder="From" value={from} onChangeText={handleFromChange} />
      <TextInput style={styles.input} placeholder="To" value={to} onChangeText={handleToChange} />
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
