import React, { useRef, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, Text, StyleSheet, TouchableOpacity, View, SafeAreaView, TextInput } from 'react-native';
import { sendUserDataToDatabase } from '../apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = () => {
  return <Text style={styles.header}>프로필 작성</Text>;
};

const RecommendationText = ({ sugarGrams, onSugarGramsChange }) => {
  const inputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [placeholderValue, setPlaceholderValue] = useState(sugarGrams.toString());

  const handleEditPress = () => {
    setIsEditing(true);
    inputRef.current.focus();
    inputRef.current.setNativeProps({
      selection: { start: inputValue.length, end: inputValue.length }
    });
  };

  const handleInputLayout = () => {
    if (inputRef.current) {
      inputRef.current.setNativeProps({ selection: { start: inputValue.length, end: inputValue.length } });
    }
  };

  const handleCancelPress = () => {
    setIsEditing(false);
    setInputValue('');
    setPlaceholderValue(sugarGrams.toString());
  };

  const handleDonePress = () => {
    setIsEditing(false);
    inputRef.current.blur();
    if (inputValue === '') {
      setPlaceholderValue(sugarGrams.toString());
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.recommendationContainer}>
        <Text style={styles.text1}>~님의</Text>
        <Text style={styles.text1}>건강을 위해 추천드리는 당 섭취량은</Text>
        <Text style={styles.text2}>일일</Text>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <TextInput
            ref={inputRef}
            style={styles.gramInput}
            placeholder={isEditing ? '' : sugarGrams.toString()}
            placeholderTextColor="black"
            keyboardType="numeric"
            value={inputValue}
            onChangeText={text => {
              setInputValue(text);
              onSugarGramsChange(text);  // Notify parent about the change
            }} />
          <Text style={styles.gramText}>g</Text>
        </View>
        {isEditing ? (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.editButton} onPress={handleDonePress}>
              <Text style={styles.editText}>완료</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={handleCancelPress}>
              <Text style={styles.editText}>취소</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
            <Text style={styles.editText}>편집</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const Button = ({ handleSetProfile }) => {
  return (
    <TouchableOpacity
      style={styles.submitButton}
      onPress={handleSetProfile}
    >
      <Text style={styles.submitButtonText}>설정하기</Text>
    </TouchableOpacity>
  );
};

const LoginProfileScreen2 = ({ route, navigation }) => {
  const userData = route.params.userData;
  const handleSugarGramsChange = (newSugarGrams) => {
    userData.u_sugar_gram = parseInt(newSugarGrams, 10);  //당류 편집시 업데이트
  };

  // 토큰 저장
  const storeUserData = async () => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (e) {
      console.error("Failed to save the data to the storage", e);
    }
  };

  const handleSetProfile = async () => {
    try {
      // 데이터를 DB로 전송
      await sendUserDataToDatabase(userData);

      // 데이터를 AsyncStorage에 저장
      await storeUserData();

      // 데이터 전송 후 메인 화면
      navigation.navigate('MainTabs');
    } catch (error) {
      console.error("Failed to set the user profile:", error);
    }
  };

  const navigateToTabs = () => {
    navigation.navigate('MainTabs');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
          <Header />
          <RecommendationText
            sugarGrams={route.params.sugarGrams}
            onSugarGramsChange={handleSugarGramsChange}
          />
          <Text style={styles.text3}>이 수치는 프로필 화면에서 수정하실 수 있습니다</Text>
          <Button handleSetProfile={handleSetProfile} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
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
  recommendationContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  text1: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 1
  },
  text2: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 70,
    marginBottom: 20
  },
  text3: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 180,
    color: 'lightgray'
  },
  gramText: {
    fontSize: 70,
    fontWeight: 'bold',
  },
  submitButton: {
    width: '60%',
    height: 50,
    backgroundColor: '#9747FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 15,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16
  },
  gramInput: {
    fontSize: 70,
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomWidth: 0
  },
  editButton: {
    marginTop: 10,
    marginHorizontal: 5,
    padding: 7,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5
  },
  editText: {
    color: 'lightgray'
  }
});

export default LoginProfileScreen2;
