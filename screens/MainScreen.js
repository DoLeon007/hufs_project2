import * as React from 'react';
import { StyleSheet, Image, Text, View, Linking, TouchableOpacity } from 'react-native'; // TouchableOpacity를 import 추가
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { NativeBaseProvider } from "native-base";

import { SearchScreen } from './SearchScreen';
import { WelcomeScreen } from './WelcomeScreen';
import { LoginProfileScreen } from './LoginProfileScreen';

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

function HomeScreen() {
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

function ReportScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
    </View>
  );
}
function BookmarkScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
    </View>
  );
}
function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>      
      <Tab.Screen 
        name="홈" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          )
        }}          
      />
      
      <Tab.Screen 
      name="리포트" 
      component={ReportScreen} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="barschart" size={size} color={color} />
        )
      }}   
      />
      
      <Tab.Screen 
        name="검색" 
        component={SearchScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={size} color={color} />
          )
        }}   
      />
      
      <Tab.Screen 
      name="북마크" 
      component={BookmarkScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="book" size={size} color={color} />
        )
      }}   
      />
      
      <Tab.Screen 
      name="프로필" 
      component={BookmarkScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="user" size={size} color={color} />
        )
      }}   
      />
    </Tab.Navigator>
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

export default function MainScreen() {
  return (
      <NativeBaseProvider>
          <NavigationContainer>
              <MyTabs />
          </NavigationContainer>
      </NativeBaseProvider>
  );
}

