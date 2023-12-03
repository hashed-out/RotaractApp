import {Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../src/screens/HomeScreen';
import SearchScreen from '../src/screens/SearchScreen';
import PostScreen from '../src/screens/PostScreen';
import NotificationScreen from '../src/screens/NotificationScreen';
import ProfileScreen from '../src/screens/ProfileScreen';
import {getAllPosts} from '../redux/actions/postAction';
import {useDispatch} from 'react-redux';
import {loadUser} from '../redux/actions/userAction';
import { border } from 'native-base/lib/typescript/theme/styled-system';
import { useSelector} from 'react-redux';
import DefaultAvatar from '../src/assets/user-avatar.png';
import { View } from 'native-base';
type Props = {};

const Tab = createBottomTabNavigator();

const Tabs = (props: Props) => {
  const {user} = useSelector((state: any) => state.user);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        
      }}>
      <Tab.Screen
        name="Home2"
        component={HomeScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <Image
              source={{
                uri: focused
                  ? 'https://cdn-icons-png.flaticon.com/128/738/738822.png'
                  : 'https://cdn-icons-png.flaticon.com/128/738/738822.png',
              }}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#000' : '#444',
              }}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <Image
              source={{
                uri: focused
                  ? 'https://cdn-icons-png.flaticon.com/128/4399/4399673.png'
                  : 'https://cdn-icons-png.flaticon.com/128/4399/4399673.png',
              }}
              style={{
                width: 35,
                height: 30,
                tintColor: focused ? '#000' : '#444',
                
              }}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Post"
        component={PostScreen}
        options={({route}) => ({
          tabBarStyle: {display: route.name === 'Post' ? 'none' : 'flex'},
          tabBarIcon: ({focused}) => (
            <Image
              source={{
                uri: focused
                  ? 'https://cdn-icons-png.flaticon.com/128/4792/4792960.png'
                  : 'https://cdn-icons-png.flaticon.com/128/4792/4792960.png',
              }}
              style={{
                width: 35,
                height: 30,
                tintColor: focused ? '#000' : '#444',
              }}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <Image
              source={{
                uri: focused
                  ? 'https://cdn-icons-png.flaticon.com/128/2645/2645897.png'
                  : 'https://cdn-icons-png.flaticon.com/128/2645/2645897.png',
              }}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#000' : '#444',
                zIndex: focused ? 50: 0,
              }}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <Image
            source={user.avatar?.url ? { uri: user.avatar?.url } : DefaultAvatar}
              style={{
                width: 30,
                height: 30,
                borderRadius:20,
                borderWidth:2,
              }}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
