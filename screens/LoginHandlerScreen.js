import React from 'react';
import { View, Text } from 'react-native';

const LoginHandlerScreen = ({ route }) => {
  const { code } = route.params;

  // 인가 코드 사용해 로그인 처리 또는 원하는 작업 수행
  console.log("Received Code:", code);

  return (
    <View>
      <Text>LoginHandlerScreen</Text>
      <Text>Received Code: {code}</Text>
    </View>
  );
};

export default LoginHandlerScreen;