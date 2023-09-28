import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, StyleSheet, TextInput, Text, View, 
  TouchableWithoutFeedback, Keyboard, TouchableOpacity 
} from 'react-native';
import { ToggleButton } from 'react-native-paper';

const LoginProfileScreen = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [selectedGender, setSelectedGender] = React.useState(null);

  const onGenderToggle = (gender) => {
    setSelectedGender(gender);
  };

  const handleSetProfile = () => {
    console.log("키:", height);
    console.log("몸무게:", weight);
    console.log("태어난 연도:", birthYear);
    console.log("성별:", selectedGender);
  };

  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    if (height && weight && birthYear && selectedGender) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [height, weight, birthYear, selectedGender]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>프로필 작성</Text>

        <View style={styles.inputContainer}>
          {renderInputComponent("키", height, setHeight, "numeric", "cm")}
          {renderInputComponent("몸무게", weight, setWeight, "numeric", "kg")}
          {renderInputComponent("태어난 연도", birthYear, setBirthYear, "numeric", "년")} 
          {renderLabel("성별")}
          <View style={styles.genderContainer}>
            <ToggleButton
              icon={({ color }) => 
                <Text style={{color: selectedGender === 'male' ? 'white' : 'lightgray', fontSize: 12}}>
                  남성
                </Text>}
              value="male"
              status={selectedGender === 'male' ? 'checked' : 'unchecked'}
              onPress={() => onGenderToggle('male')}
              style={[
                styles.genderButton,
                {
                  backgroundColor: selectedGender === 'male' ? '#9747FF' : 'white',
                  borderColor: 'lightgray',
                  borderWidth: selectedGender === 'male' ? 0 : 0.8
                }
              ]}
            />
            <ToggleButton
              icon={({ color }) => 
                <Text style={{color: selectedGender === 'female' ? 'white' : 'lightgray', fontSize: 12}}>
                  여성
                </Text>}
              value="female"
              status={selectedGender === 'female' ? 'checked' : 'unchecked'}
              onPress={() => onGenderToggle('female')}
              style={[
                styles.genderButton,
                {
                  backgroundColor: selectedGender === 'female' ? '#9747FF' : 'white',
                  borderColor: 'lightgray',
                  borderWidth: selectedGender === 'female' ? 0 : 0.8
                }
              ]}
            />
          </View>
        </View>
        <TouchableOpacity 
          style={[
            styles.submitButton,
            isButtonActive ? {} : { backgroundColor: 'lightgray' }
          ]} 
          onPress={isButtonActive ? handleSetProfile : null}
          >
          <Text style={styles.submitButtonText}>설정하기</Text> 
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const renderInputComponent = (label, value, setValue, keyboardType, unit) => (
  <View style={styles.inputWrapper}>
    <Text>{label}</Text>
    <View style={styles.inputWithUnit}>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        keyboardType={keyboardType}
      />
      {unit && <Text style={styles.unitText}>{unit}</Text>}
    </View>
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
    marginBottom: 60,
    marginTop: 20
  },
  inputContainer: {
    justifyContent: 'center',  
    width: '100%',
    alignItems: 'center',
  },
  inputWrapper: {
    alignItems: 'center',
    marginBottom: 30
  },
  inputWithUnit: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    height: 40,
    width: 100,
    borderColor: 'lightgray',
    borderBottomWidth: 1,
    padding: 10,
    marginTop: 10,
    marginLeft: 15,
    textAlign: 'center'
  },
  unitText: {
    marginTop: 10,
    fontSize: 10,
    color: 'lightgray'
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 40,
  },
  genderButton: {
    marginHorizontal: 5,
    width: 60,
    borderRadius: 30
  },
  submitButton: {
    width: '60%',
    height: 50,
    backgroundColor: '#9747FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 70, 
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16
  }
});

export default LoginProfileScreen;
