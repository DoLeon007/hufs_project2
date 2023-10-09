import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { NativeBaseProvider } from "native-base";

import WelcomeScreen from './screens/WelcomeScreen';
import KakaoWebView from './screens/KakaoWebView';
import { BookmarkScreen } from './screens/BookmarkScreen';
import { SearchScreen } from './screens/SearchScreen';
import LoginProfileScreen from './screens/LoginProfileScreen'; 
import LoginProfileScreen2 from './screens/LoginProfileScreen2'; 

function HomeScreen() {
  return (
    <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'white'
    }}>
    </View>
  );
}
function ReportScreen() {
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
const Stack = createStackNavigator(); 

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
          headerShown: true,
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
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="user" size={size} color={color} />
        )
      }}   
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="LoginProfile">

      {/*<Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />*/}
      {/*<Stack.Screen name="KakaoWebView" component={KakaoWebView} />*/}
      <Stack.Screen name="LoginProfile" component={LoginProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginProfile2" component={LoginProfileScreen2} options={{ headerShown: false }} />
      <Stack.Screen name="MainTabs" component={MyTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}


export default function App() {
  return (
      <NativeBaseProvider>
          <NavigationContainer>
              <AppNavigator /> 
          </NavigationContainer>
      </NativeBaseProvider>
  );
} 


