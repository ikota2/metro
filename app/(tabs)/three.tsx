import { StyleSheet } from 'react-native';
import { useState } from 'react';

import { View } from '../../components/Themed';
import SvgF from '../../components/SvgF';
import SlidingPanel from '../../components/SlidingPanel';

export default function TabThreeScreen() {
  const [destination, setDestination] = useState({ from: '', to: '' });

  return (
    <View style={styles.container}>
      <SvgF destination={destination} setDestination={setDestination} />
      <SlidingPanel
        destination={destination}
        setDestination={setDestination}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
