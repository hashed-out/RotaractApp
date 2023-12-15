import {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabs from './Tabs';
import UserProfileScreen from '../src/screens/UserProfileScreen';
import CreateRepliesScreen from '../src/screens/CreateRepliesScreen';
import PostDetailsScreen from '../src/screens/PostDetailsScreen';
import PostLikeCard from '../src/components/PostLikeCard';
import FollowerCard from '../src/components/FollowerCard';
import EditProfile from '../src/components/EditProfile';
import HomePage from '../src/screens/HomePage';
import NotificationScreen from '../src/screens/NotificationScreen';
import ProfileScreen from '../src/screens/ProfileScreen';
import PostScreen from '../src/screens/PostScreen';
import HomeScreen from '../src/screens/HomeScreen';
import SearchScreen from '../src/screens/SearchScreen';
import AdminScreen from '../src/screens/Admin/AdminScreen';
import RegionalLeadersScreen from '../src/screens/RegionalLeadersScreen';
import GetAllUsersScreen from '../src/screens/GetAllUsersScreen';
import DistrictGovScreen from '../src/screens/DistrictGovScreen';
import IndiaLeadersScreen from '../src/screens/IndiaLeadersScreen';

type Props = {};

const Main = (props: Props) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* <Stack.Screen name="Home" component={Tabs} /> */}
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Admin" component={AdminScreen} />
      <Stack.Screen name="AllUser" component={GetAllUsersScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="RegionalLeader" component={RegionalLeadersScreen} />
      <Stack.Screen name="DistGov" component={DistrictGovScreen} />
      <Stack.Screen name="IndiaLeaders" component={IndiaLeadersScreen} />
      <Stack.Screen name="PostDetails" component={PostDetailsScreen} />
      <Stack.Screen name="PostLikeCard" component={PostLikeCard} />
      <Stack.Screen name="FollowerCard" component={FollowerCard} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default Main;
