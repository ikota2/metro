import { StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import {useState} from 'react';
import Map from '../../components/Map';
import SlidingPanel from '../../components/SlidingPanel';

export default function TabTwoScreen() {
  const [destination, setDestination] = useState({from: '', to: ''});

  return (
    <View style={styles.container}>
      <Map destination={destination} setDestination={setDestination} />
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
