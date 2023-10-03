import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleKakaoLogin = () => {
    // 카카오 로그인 버튼 누르면 "KakaoWebView"로 이동
    navigation.navigate('KakaoWebView');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleKakaoLogin}>
        <Image
          source={{ uri: 'https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_medium_narrow.png' }}
          style={styles.imageStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageStyle: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default WelcomeScreen;
