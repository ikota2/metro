import React, {FC, ReactChildren, ReactNode} from 'react';
import {TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle, ImageStyle, GestureResponderEvent} from 'react-native';

type T = ViewStyle | TextStyle | ImageStyle;

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  isDisabled: boolean;
  // title: string;
  // btnStyle: StyleProp<T>;
  // textStyle: StyleProp<T>;
  children: any;
}

const MyBtn: FC<Props> = ({onPress, isDisabled, children}) => {
  return (
    <TouchableOpacity
      // style={btnStyle}
      onPress={onPress}
      disabled={isDisabled}
    >
      {/*<Text style={textStyle}>{title}</Text>*/}
      {children}
    </TouchableOpacity>
  );
};

export default MyBtn;
