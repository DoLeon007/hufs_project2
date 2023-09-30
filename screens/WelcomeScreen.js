import * as React from 'react';
import { StyleSheet, Image, Text, View, Linking, TouchableOpacity } from 'react-native'; // TouchableOpacity를 import 추가
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

export default function WelcomeScreen() {
  const handleKakaoLogin = () => {
    Linking.openURL(KAKAO_AUTH_URL)
      .catch((error) => {
        console.error('링크를 열 수 없음', error);
      });
  };

  return (
    <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'white'
    }}>
      <TouchableOpacity style={styles.container} onPress={handleKakaoLogin}>
        <Image 
        source={{uri:'https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_medium_narrow.png'}} 
        alt='kakaoLogin'
        style={[styles.imageStyle, { resizeMode: 'contain' }]}
         />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignContent:"center"
  },
  imageStyle: {
    width:200,
    height:200
  }
});