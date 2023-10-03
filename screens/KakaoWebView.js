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

  const handleWebViewNavigationStateChange = (newNavState) => {
    // WebView의 URL 변경 => 인가 코드 추출
    const url = newNavState.url;
    if (url.includes('localhost:3000/auth/kakao/callback?code=')) {
      const extractedCode = url.split('=')[1];
      setCode(extractedCode);
      // 인가 코드 받으면 LoginHandlerScreen으로 이동
      navigation.navigate('LoginHandlerScreen', { code: extractedCode });
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: KAKAO_AUTH_URL }}
        onNavigationStateChange={handleWebViewNavigationStateChange}
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
