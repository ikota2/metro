import React, {FC, useState} from 'react';
import { StyleSheet, View, Dimensions, ScrollView, Text } from 'react-native';
import Svg, { Circle, Rect, G } from 'react-native-svg';
import {yellow} from 'colorette';

const deviceSize = Dimensions.get('window');
const locations = [
  {
    id: '1',
    x: 25,
    y: 25,
  },
  {
    id: '2',
    x: 75,
    y: 25,
  },
  {
    id: '3',
    x: 125,
    y: 25,
  },
  {
    id: '4',
    x: 175,
    y: 25,
  },
  {
    id: '5',
    x: 225,
    y: 25,
  },
];

interface SvgFProps {
  destination: { from: string, to: string };
  setDestination: React.Dispatch<React.SetStateAction<{from: string, to: string}>>;
}

const SvgF: FC<SvgFProps> = ({ destination, setDestination }) => {
  // const [log, setLog] = useState([]);
  const { from, to } = destination
  function handleLocationClick(id: string) {
    if (!from || (from && to)) {
      setDestination({ from: id, to: '' });
    } else {
      setDestination({ ...destination, to: id });
    }
  };

  const determineFillColor = (id: string) => {
    if (id === from || id === to) {
      return 'green'; // Selected station color
    }
    return 'yellow'; // Default color
  };

  // const renderLog = () => {
  //   return log.map((item, index) => (
  //     <Text key={index}>{item || '--outside click--'}</Text>
  //   ));
  // };

  return (
    <View style={styles.container}>
      <View style={{ overflow: 'hidden' }}>
        <Svg
          style={{
            backgroundColor: '#CCC',
            margin: 0,
            padding: 0,
          }}
          height="250"
          width={deviceSize.width}
        >
          <Rect
            x="0"
            y="0"
            onPress={() => handleLocationClick('')}
            fill="#222222"
            width="100%"
            height="100%"
          />
          <G>
            {locations.map(({id, x, y}) => (
              <Circle
                key={id}
                cx={x}
                cy={y}
                onPress={() => handleLocationClick(id)}
                r="15"
                fill={determineFillColor(id)}
              />
            ))}
          </G>
        </Svg>
      </View>
      {/*<ScrollView>{renderLog()}</ScrollView>*/}
      {/*{from?.length > 0 && to?.length > 0 && <View>*/}
      {/*  <Text>`${from} ${to}`</Text>*/}
      {/*</View>}*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    backgroundColor: '#CCC',
    flexDirection: 'column',
  },
});

export default SvgF;
