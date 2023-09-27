import * as React from 'react';
import { Text, View } from 'react-native';
//npm install @react-navigation/bottom-tabs
//npm install @react-navigation/native 후 밑에 import 실행 가능
import { NavigationContainer} from '@react-navigation/native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { NativeBaseProvider } from "native-base";

import { SearchScreen } from './screens/SearchScreen';
import { LoginProfileScreen} from './screens/LoginProfileScreen';

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

export default function App() {
  return (
      <NativeBaseProvider>
          <NavigationContainer>
              <MyTabs />
          </NavigationContainer>
      </NativeBaseProvider>
  );
}

