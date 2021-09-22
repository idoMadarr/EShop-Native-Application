import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const InputElement = ({
  inputValue,
  onType,
  errorMsg,
  keyboard,
  holder,
  children,
}) => {
  return (
    <View style={styles.formControle}>
      <Text style={styles.label}>{children}</Text>
      <TextInput
        value={inputValue}
        onChangeText={onType}
        style={styles.input}
        keyboardType={keyboard ? 'decimal-pad' : 'default'}
        placeholder={holder}
        // multiline
        // numberOfLines={5}
      />
      <Text style={styles.errMsg}>{errorMsg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: { fontFamily: 'open-sans-bold' },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 4,
    marginVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  formControle: {
    width: '100%',
  },
  errMsg: {
    marginVertical: 5,
    color: 'red',
    fontSize: 12,
  },
});

export default InputElement;
