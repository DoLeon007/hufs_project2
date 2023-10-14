import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, StyleSheet, TextInput, Text, View,
  TouchableWithoutFeedback, Keyboard, TouchableOpacity
} from 'react-native';
import { ToggleButton } from 'react-native-paper';

//임의의 토큰 값 설정, 사용 
//다음 화면에서도 사용
const generateRandomToken = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
const token = generateRandomToken(); 
//

const LoginProfileScreen = ({ navigation }) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [selectedGender, setSelectedGender] = React.useState(null);
  const [activityLevel, setActivityLevel] = useState(null);
  const [showYearWarning, setShowYearWarning] = useState(false);

  const onGenderToggle = (gender) => {
    setSelectedGender(gender);
  };

  const handleBirthYearChange = (value) => {
    const numericValue = parseInt(value, 10);
    const currentYear = new Date().getFullYear();

    if (numericValue < 1920 || numericValue > currentYear) {
      setShowYearWarning(true);
    } else {
      setShowYearWarning(false);
    }
    setBirthYear(value);
};

  const calculateSugarIntake = () => {
    const heightInMeters = parseFloat(height) / 100;
    const standardWeight = selectedGender === 'male' ? Math.pow(heightInMeters, 2) * 22 : Math.pow(heightInMeters, 2) * 21;

    let activityMultiplier;
    switch (activityLevel) {
      case 'low': activityMultiplier = 27.5; break;
      case 'medium': activityMultiplier = 32.5; break;
      case 'high': activityMultiplier = 37.5; break;
      default: activityMultiplier = 0;
    }

    const dailyIntake = standardWeight * activityMultiplier;
    const sugarIntakeKcal = parseFloat((dailyIntake * 0.1).toFixed(1));
    const sugarIntakeGrams = parseFloat((sugarIntakeKcal / 4).toFixed(1));

    return {
      kcal: sugarIntakeKcal,
      grams: sugarIntakeGrams
    };
  };

  const handleSetProfile = () => {
    const sugar = calculateSugarIntake();
    console.log("당 섭취량 (kcal):", sugar.kcal);
    console.log("당 섭취량 (g):", sugar.grams);
    console.log("키:", height);
    console.log("몸무게:", weight);
    console.log("태어난 연도:", birthYear);
    console.log("성별:", selectedGender);
  
    const currentYear = new Date().getFullYear();
    const age = currentYear - parseInt(birthYear);
    const token = generateRandomToken();
  
    const userData = {
      u_code: null,
      u_token: token,
      u_name: null,
      height: parseInt(height),
      weight: parseInt(weight),
      age: age,
      sex: selectedGender,
      activity_level: activityLevel,
      u_sugar_gram: sugar.grams
    };
  
    navigation.navigate('LoginProfile2', { sugarGrams: sugar.grams, userData: userData });
  };
  

  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    if (height && weight && birthYear && selectedGender && activityLevel) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [height, weight, birthYear, selectedGender, activityLevel]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>프로필 작성</Text>
        <View style={styles.profileContainer}>
          <View style={styles.inputContainer}>
            {renderInputComponent("키", height, setHeight, "numeric", "cm")}
            {renderInputComponent("몸무게", weight, setWeight, "numeric", "kg")}
            {renderInputComponent("태어난 연도", birthYear, setBirthYear, "numeric", "년", handleBirthYearChange, showYearWarning)}
            {renderLabel("성별")}
            <View style={styles.genderContainer}>
              <ToggleButton
                icon={({ color }) =>
                  <Text style={{ color: selectedGender === 'male' ? 'white' : 'lightgray', fontSize: 12 }}>
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
                  <Text style={{ color: selectedGender === 'female' ? 'white' : 'lightgray', fontSize: 12 }}>
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
            {renderLabel("활동지수")}
            <View style={styles.activityContainer}>
              <ToggleButton
                icon={({ color }) =>
                  <Text style={{ color: activityLevel === 'low' ? 'white' : 'lightgray', fontSize: 12 }}>
                    적음
                  </Text>}
                value="low"
                status={activityLevel === 'low' ? 'checked' : 'unchecked'}
                onPress={() => setActivityLevel('low')}
                style={[
                  styles.activityButton,
                  {
                    backgroundColor: activityLevel === 'low' ? '#9747FF' : 'white',
                    borderColor: 'lightgray',
                    borderWidth: activityLevel === 'low' ? 0 : 0.8
                  }
                ]}
              />
              <ToggleButton
                icon={({ color }) =>
                  <Text style={{ color: activityLevel === 'medium' ? 'white' : 'lightgray', fontSize: 12 }}>
                    보통
                  </Text>}
                value="medium"
                status={activityLevel === 'medium' ? 'checked' : 'unchecked'}
                onPress={() => setActivityLevel('medium')}
                style={[
                  styles.activityButton,
                  {
                    backgroundColor: activityLevel === 'medium' ? '#9747FF' : 'white',
                    borderColor: 'lightgray',
                    borderWidth: activityLevel === 'medium' ? 0 : 0.8
                  }
                ]}
              />
              <ToggleButton
                icon={({ color }) =>
                  <Text style={{ color: activityLevel === 'high' ? 'white' : 'lightgray', fontSize: 12 }}>
                    많음
                  </Text>}
                value="high"
                status={activityLevel === 'high' ? 'checked' : 'unchecked'}
                onPress={() => setActivityLevel('high')}
                style={[
                  styles.activityButton,
                  {
                    backgroundColor: activityLevel === 'high' ? '#9747FF' : 'white',
                    borderColor: 'lightgray',
                    borderWidth: activityLevel === 'high' ? 0 : 0.8
                  }
                ]}
              />
            </View>
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

const renderInputComponent = (label, value, setValue, keyboardType, unit, yearHandler, showYearWarning) => (
  <View style={styles.inputWrapper}>
    <Text>{label}</Text>
    <View style={styles.inputWithUnit}>
      <TextInput
        style={styles.input}
        onChangeText={yearHandler || setValue}
        value={value}
        keyboardType={keyboardType}
      />
      {unit && <Text style={styles.unitText}>{unit}</Text>}
    </View>
    {label === "태어난 연도" && showYearWarning ? <Text style={styles.warningText}>잘못된 정보입니다</Text> : null}
  </View>
);

const renderLabel = (label) => (
  <View style={styles.inputWrapper}>
    <Text>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 24,
    marginBottom: 40,
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
    marginTop: 30,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16
  },
  activityContainer: {
    flexDirection: 'row'
  },
  activityButton: {
    marginHorizontal: 5,
    width: 60,
    borderRadius: 30
  },
  profileContainer: {
    width: '100%',
    alignItems: 'center',
  },
  warningText: {
    color: 'red',
    marginTop: 5,
    fontSize: 12
  },
});

export default LoginProfileScreen;
