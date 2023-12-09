import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const EditableTextInput = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleButtonPress = () => {
    // You can modify this logic based on your requirements
    setInputValue('New Value');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={handleInputChange}
        placeholder="Type something..."
      />
      <Button
        title="Change Value"
        onPress={handleButtonPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default EditableTextInput;