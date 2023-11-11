import React from 'react';
import { StyleSheet, View, Dimensions, ScrollView, Text } from 'react-native';
import Svg, { Circle, Rect, G } from 'react-native-svg';

const deviceSize = Dimensions.get('window');
const locations = [
  {
    id: 'liceu',
    x: 25,
    y: 25,
  },
  {
    id: 'paralel',
    x: 75,
    y: 25,
  },
  {
    id: 'les tres tores',
    x: 125,
    y: 25,
  },
];

export default class SvgClass extends React.Component {
  state = {
    log: [],
    selected: null,
  };

  handleLocationClick = (id: string | null) => {
    this.setState({
      log: [id, ...this.state.log],
      selected: id,
    });
  };

  renderLocations = () => {
    return locations.map((loc) => (
      <Circle
        key={loc.id}
        cx={loc.x}
        cy={loc.y}
        onPress={() => this.handleLocationClick(loc.id)}
        r="15"
        fill={loc.id === this.state.selected ? 'red' : 'yellow'}
      />
    ));
  };

  renderLog = () => {
    return this.state.log.map((item, index) => (
      <Text key={index}>{item || '--outside click--'}</Text>
    ));
  };

  render() {
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
              onPress={() => this.handleLocationClick(null)}
              fill="#222222"
              width="100%"
              height="100%"
            />
            <G>{this.renderLocations()}</G>
          </Svg>
        </View>
        <ScrollView>{this.renderLog()}</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: '#CCC',
    flexDirection: 'column',
  },
});
