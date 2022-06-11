import * as React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { FieldError } from 'react-hook-form';

interface Props extends TextInputProps {
  label?: string;
  error?: FieldError | undefined;
  name?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export default React.forwardRef(({ error, label, containerStyle, ...inputProps }: any, ref) => (
  <View style={[styles.container, containerStyle]}>
    <Text style={styles.label}>{label?.toLocaleUpperCase()}</Text>
    <TextInput
      placeholderTextColor={'#999'}
      style={[styles.input, !!error && styles.borderError]}
      ref={ref}
      {...inputProps}
    />
    {!!error && <Text style={styles.errorMessage}>{error.message}</Text>}
  </View>
));



const styles = StyleSheet.create({
  container: {
    width: '80%',
    borderRadius: 10,
    marginBottom: 10
  },
  borderError: {
    borderBottomColor: 'rgba(200,0,50,1)'
  },
  errorMessage: {
    fontSize: 12,
    color: 'rgba(200,0,50,1)',
    textAlign: 'left',
    paddingLeft: 5,
    marginTop: 5
  },
  label: {
    fontSize: 13,
    color: '#ccc',
    marginBottom: -4,
    marginLeft: 5,
    fontFamily: 'Nunito_600SemiBold'
  },
  input: {
    width: '100%',
    height: 56,
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 5,
    fontSize: 16,
    fontFamily: 'Nunito_600SemiBold',
    color:'#e5e5e5',
    backgroundColor: 'transparent',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
