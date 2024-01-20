import {useNavigation} from '@react-navigation/native';
import {styled} from 'nativewind';
import React, {useEffect} from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import {NativeBaseProvider, Box, VStack, Center} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector,useDispatch} from 'react-redux';
import {getAllPosts} from '../../redux/actions/postAction';
import DefaultAvatar from '../assets/user-avatar.png';
import { getAllUsers } from '../../redux/actions/userAction'
import * as Animatable from 'react-native-animatable';

function HomePage() {
  const navigation = useNavigation<any>();
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllPosts()(dispatch);
    getAllUsers()(dispatch);
  }, [dispatch]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animatable.View animation="fadeInUp" duration={1500} style={styles.mainContainer}>
        <View style={styles.container}>
          {/* Header */}
          <View className="flex-row justify-between" style={styles.headerContainer}>
            {/* Left side */}
            <View className="flex-row justify-between" style={{ alignItems: 'center' }}>
              <Image
                source={require('../assets/rlw.png')}
                style={{
                  height: 53,
                  width: 150,
                  marginLeft: '3.5%',
                  resizeMode: 'contain',
                }}
              />
            </View>
            {/* Right side */}
            <View className="flex-row justify-between" style={{ alignItems: 'center' }}>
              {/* <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                <Image source={require('../assets/bell.png')} style={{ height: 30, width: 30,marginRight:20, }} />
              </TouchableOpacity> */}
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Image
                  source={user.avatar?.url ? { uri: user.avatar?.url } : DefaultAvatar}
                  borderRadius={25}
                  style={{ height: 50, width: 50, marginLeft: '2.5%',borderColor:'#fff', borderWidth:2,}}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* User information */}
          <Text style={styles.userName}>Welcome!!</Text>
          <Text style={styles.userName}>{user?.name}</Text>
          <TouchableOpacity style={{ alignItems: 'center', marginTop: '2.5%' }}>
            <View style={styles.clubCard}>
              <Image
                source={require('../assets/ClubName.png')}
                style={{ height: 37, width: 36, marginRight: '2.5%' }}
              />
              <Text style={{ color: 'white', fontSize: 20 }}>{user?.clubName}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Event and Post buttons */}
        <View style={{ marginTop: '10%' }}>
          <View style={{ alignSelf: 'center', width: '100%', paddingHorizontal: '10%' }}>
            <TouchableOpacity
              style={styles.eventcards}
              onPress={() => {
                navigation.navigate('Home');
              }}
            >
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/3269/3269065.png',
                }}
                style={styles.eicons}
              />
              <Text style={styles.adminButtonText}>Events & Posts</Text>
            </TouchableOpacity>
          </View>

          {/* Create Event/Post button (only for admin) */}
          {user.role === 'admin' && (
            <View style={{ alignSelf: 'center', width: '100%', paddingHorizontal: '10%' }}>
              <TouchableOpacity
                style={styles.eventcards}
                onPress={() => {
                  navigation.navigate('Post');
                }}
              >
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/8235/8235856.png',
                  }}
                  style={styles.eicons}
                />
                <Text style={styles.adminButtonText}>Create Event/Post</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Find a Rotarian button with animation */}
        <Animatable.View
          animation="slideInUp"
          duration={1000}
          style={[styles.btnContainer, { marginTop: user?.role === 'admin' ? '5%' : '20%' }]}
        >
          <TouchableOpacity onPress={() => navigation.navigate('Search', { fromRemoveUser: false, fromAddRegLead: false })}>
            <View style={styles.btnCont}>
              <Image style={{ width: 29, height: 29 }} source={require('../assets/impWeb.png')} />
              <Text style={{ color: 'black', textAlign: 'center' }}>Find a Rotarian</Text>
            </View>
          </TouchableOpacity>
          {/* Add other buttons as needed */}
	<TouchableOpacity
            onPress={() => Linking.openURL('https://rotaryreachout.com/')}>
            <View style={[styles.btnCont]}>
              <Image
                style={{width: 29, height: 29}}
                source={require('../assets/impWeb.png')}
              />
              <Text style={{color: 'black', textAlign: 'center'}}>
                Important Websites
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('IndiaLeaders')}>
            <View style={[styles.btnCont]}>
              <Image
                style={{width: 29, height: 29}}
                source={require('../assets/impWeb.png')}
              />
              <Text style={{color: 'black', textAlign: 'center'}}>
                India Leaders
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('DistGov')}>
            <View style={[styles.btnCont]}>
              <Image
                style={{width: 29, height: 29}}
                source={require('../assets/impWeb.png')}
              />
              <Text style={{color: 'black', textAlign: 'center'}}>
                District Governers
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegionalLeader')}>
            <View style={[styles.btnCont]}>
              <Image
                style={{width: 29, height: 29}}
                source={require('../assets/impWeb.png')}
              />
              <Text style={{color: 'black', textAlign: 'center'}}>
                Regional Leaders
              </Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>

        {/* Admin Actions button (only for admin) */}
        {user?.role === 'admin' && (
          <Animatable.View animation="slideInUp" duration={1000}>
            <View style={{ alignSelf: 'center', width: '100%', paddingHorizontal: '10%' }}>
              <TouchableOpacity
                style={styles.adminButton}
                onPress={() => {
                  navigation.navigate('Admin');
                }}
              >
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/9970/9970571.png',
                  }}
                  style={styles.icons}
                />
                <Text style={styles.adminButtonText}>Admin Actions</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        )}
      </Animatable.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    flex: 1,
    paddingBottom: '10%',
  },
  container: {
    backgroundColor: '#17458F',
    height: 219,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: '2.5%',
    paddingHorizontal: '3.5%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 30,
    color: 'white',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  clubCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#3A6CBD',
    borderRadius: 8,
    paddingVertical: '2.5%',
    paddingHorizontal: '5%',
    alignItems: 'center',
  },
  eventcards: {
    backgroundColor: '#8FBFE8',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  adminButtonText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  btnCont: {
    backgroundColor: '#8FBFE8',
    borderRadius: 5,
    height: 74,
    width: 90,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminButton: {
    backgroundColor: '#8FBFE8',
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  eicons: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  icons: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
});

export default HomePage;