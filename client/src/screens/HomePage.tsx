import {useNavigation} from '@react-navigation/native';
import {styled} from 'nativewind';
import React from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeBaseProvider, Box, VStack, Center} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import DefaultAvatar from '../assets/user-avatar.png';

function HomePage() {
  const navigation = useNavigation<any>();
  const {user} = useSelector((state: any) => state.user);

  // console.log(user,"user")

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={[styles.mainContainer]}>
        <View>
          <View style={[styles.container]}>
            <View
              className="flex-row justify-between"
              style={[styles.headerContainer]}>
              <View
                className="flex-row justify-between"
                style={{alignItems: 'center'}}>
                {/* <TouchableOpacity>
                  <Image
                    source={require('../assets/hamburger.png')}
                    style={{height: 20, width: 21}}
                  />
                </TouchableOpacity> */}
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
              <View
                className="flex-row justify-between"
                style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Notifications')}>
                  <Image
                    source={require('../assets/bell.png')}
                    style={{height: 25, width: 25}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile')}>
                  {/* <Image
                    source={require('../assets/user-avatar.png')}
                    style={{height: 40, width: 40, marginLeft: '2.5%'}}
                  /> */}
                  <Image
                    source={
                      user.avatar?.url ? {uri: user.avatar?.url} : DefaultAvatar
                    }
                    borderRadius={15}
                    style={{height: 30, width: 30, marginLeft: '2.5%'}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={[styles.userName]}>Welcome, {user?.name}</Text>
            <TouchableOpacity style={{alignItems: 'center', marginTop: '2.5%'}}>
              <View style={[styles.clubCard]}>
                <Image
                  source={require('../assets/ClubName.png')}
                  style={{height: 37, width: 36, marginRight: '2.5%'}}
                />
                <Text style={{color: 'white', fontSize: 20, width: '50%'}}>
                  {user?.clubName}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignSelf: 'center',
              width: '100%',
              paddingHorizontal: '10%',
            }}>
            <TouchableOpacity
              style={styles.eventcards}
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/3269/3269065.png',
                }}
                style={styles.eicons}
              />
              <Text style={styles.adminButtonText}>Events & Posts</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignSelf: 'center',
              width: '100%',
              paddingHorizontal: '10%',
            }}>
            <TouchableOpacity
              style={styles.eventcards}
              onPress={() => {
                navigation.navigate('Post');
              }}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/8235/8235856.png',
                }}
                style={styles.eicons}
              />
              <Text style={styles.adminButtonText}>Create Event/Post</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.btnContainer]}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Search', {
                fromRemoveUser: false,
                fromAddRegLead: false,
              })
            }>
            <View style={[styles.btnCont]}>
              <Image
                style={{width: 29, height: 29}}
                source={require('../assets/impWeb.png')}
              />
              <Text style={{color: 'black', textAlign: 'center'}}>
                Find a Rotarian
              </Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <Image
              style={[styles.btn]}
              source={require('../assets/searchproj.png')}
            />
          </TouchableOpacity> */}
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
          {/* <TouchableOpacity>
            <Image
              style={[styles.btn]}
              source={require('../assets/rotNews.png')}
            />
          </TouchableOpacity> */}
          {/* <TouchableOpacity>
            <Image
              style={[styles.btn]}
              source={require('../assets/placeholder.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={[styles.btn]}
              source={require('../assets/placeholder.png')}
            />
          </TouchableOpacity> */}
        </View>
        {user.role === 'admin' ? (
          <View
            style={{
              alignSelf: 'center',
              width: '100%',
              paddingHorizontal: '10%',
            }}>
            <TouchableOpacity
              style={styles.adminButton}
              onPress={() => {
                navigation.navigate('Admin');
              }}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/9970/9970571.png',
                }}
                style={styles.icons}
              />
              <Text style={styles.adminButtonText}>Admin Actions</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  eventcards: {
    backgroundColor: '#8FBFE8',
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  adminButtonText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  btn: {
    height: 74,
    width: 90,
    margin: 10,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '5%',
  },
  card: {
    width: 326,
    height: 215,
  },
  icons: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  eicons: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  mainContainer: {
    backgroundColor: '#fca30f',
    flex: 1,
    // justifyContent: 'space-between',
    paddingBottom: '10%',
  },
  headerContainer: {
    paddingVertical: '2.5%',
    paddingHorizontal: '3.5%',
  },
  container: {
    backgroundColor: '#17458F',
    height: 219,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  clubCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#3A6CBD',
    borderRadius: 8,
    paddingVertical: '2.5%',
    paddingHorizontal: '5%',
    alignItems: 'center',
  },
  userName: {
    fontSize: 36,
    color: 'white',
    alignSelf: 'center',
  },
  ecard: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // For Android shadow
  },
  cardText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomePage;
