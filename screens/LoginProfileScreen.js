import React, { useState } from 'react';
import { 
  SafeAreaView, StyleSheet, TextInput, Text, View, 
  TouchableWithoutFeedback, Keyboard 
} from 'react-native';

const LoginProfileScreen = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>프로필 작성</Text>

        <View style={styles.inputContainer}>
          {renderInputComponent("키", height, setHeight, "numeric")}
          {renderInputComponent("몸무게", weight, setWeight, "numeric")}
          {renderLabel("태어난 연도")}
          {renderLabel("성별")}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const renderInputComponent = (label, value, setValue, keyboardType) => (
  <View style={styles.inputWrapper}>
    <Text>{label}</Text>
    <TextInput
      style={styles.input}
      onChangeText={setValue}
      value={value}
      keyboardType={keyboardType}
    />
  </View>
);

const renderLabel = (label) => (
  <View style={styles.inputWrapper}>
    <Text>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',  
  },
  header: {
    fontSize: 24,
    marginBottom: 80,
    marginTop: 40
  },
  inputContainer: {
    justifyContent: 'center',  
    width: '100%',
    alignItems: 'center',
  },
  inputWrapper: {
    alignItems: 'center',
    marginBottom: 40
  },
  input: {
    height: 40,
    width: 100,
    borderColor: 'lightgray',
    borderBottomWidth: 1,
    padding: 10,
    marginTop: 10,
    textAlign: 'center'
  },
});

export default LoginProfileScreen;
