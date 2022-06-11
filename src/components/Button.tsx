import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacityProps,
  TextProps,
  TouchableOpacity,
  StyleProp,
  ViewStyle
} from 'react-native';

interface Props extends TouchableOpacityProps {
  title: string;
  textProps?: TextProps;
}

export default ({ title, textProps, style, ...inputProps } : Props) => (
  <TouchableOpacity {...inputProps} style={[styles.container, style]}>
    <Text {...textProps} style={styles.text}>{ title }</Text>
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#FA9032'
  },
  text:{
    textAlign: 'center',
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    color: '#fff'
  }
});