import React, { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

const CLIENT_ID = process.env.REACT_APP_KAKAO_REST_API_KEY;
const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const KakaoWebView = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState(null);

  const handleNavigationStateChange = async (newNavState) => {
    const url = newNavState.url;
    if (url.includes('localhost:3000/auth/kakao/callback?code=')) {
      const extractedCode = url.split('=')[1];
      setCode(extractedCode);

      // 인가 코드 서버로 전송
      await sendCodeToServer(extractedCode);

      // 로그인 처리 후 LoginHandlerScreen으로 이동
      navigation.navigate('LoginHandlerScreen', { code: extractedCode });
    }
  };

  const sendCodeToServer = async (code) => {
    try {
      const response = await fetch('http://10.10.0.75:4000/user', {
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
