import React, { useState, useEffect } from 'react';
import { View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

const CLIENT_ID = process.env.REACT_APP_KAKAO_REST_API_KEY;
const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const KakaoWebView = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState(null);
  const [codeSent, setCodeSent] = useState(false); // 인가 코드를 이미 서버로 보냈는지 확인하는 상태 변수

  useEffect(() => {
    if (code && !codeSent) {
      sendCodeToServer(code);
      setCodeSent(true);
      navigation.navigate('LoginHandlerScreen', { code }); // 로그인 처리 후 이동
    }
  }, [code, codeSent]);

  const handleNavigationStateChange = (newNavState) => {
    const url = newNavState.url;
    if (url.includes('localhost:3000/auth/kakao/callback?code=')) {
      const extractedCode = url.split('=')[1];
      setCode(extractedCode);
    }
  };

  const sendCodeToServer = async (code) => {
    try {
      const response = await fetch('http://localhost:4000/auth/kakao/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        console.log('Authorization code sent to the server successfully.');
      } else {
        console.error('Failed to send authorization code to the server.');
      }
    } catch (error) {
      console.error('Error sending authorization code to the server:', error);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: KAKAO_AUTH_URL }}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default KakaoWebView;
