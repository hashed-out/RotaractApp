import {useNavigation} from '@react-navigation/native';
import {styled} from 'nativewind';
import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import DefaultAvatar from '../assets/user-avatar.png';

function HomePage() {
  const navigation = useNavigation<any>();
  const {user} = useSelector((state: any) => state.user);

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
                <TouchableOpacity>
                  <Image
                    source={require('../assets/hamburger.png')}
                    style={{height: 20, width: 21}}
                  />
                </TouchableOpacity>
                <Image
                  source={require('../assets/HomePageLogo.png')}
                  style={{height: 53, width: 142, marginLeft: '3.5%'}}
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
            <Text style={[styles.userName]}>Welcome, {user?.userName}</Text>
            <TouchableOpacity style={{alignItems: 'center', marginTop: '2.5%'}}>
              <Image
                source={require('../assets/ClubName.png')}
                style={{height: 60, width: 220, marginLeft: '3.5%'}}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={{alignSelf: 'center', marginTop: '2.5%'}}>
            <Image
              style={[styles.card]}
              source={require('../assets/Card.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.btnContainer]}>
          <TouchableOpacity onPress={() => navigation.navigate('Search',{fromRemoveUser:false,fromAddRegLead:false})}>
            <Image
              style={[styles.btn]}
              source={require('../assets/findRot.png')}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <Image
              style={[styles.btn]}
              source={require('../assets/searchproj.png')}
            />
          </TouchableOpacity> */}
          <TouchableOpacity>
            <Image
              style={[styles.btn]}
              source={require('../assets/impWeb.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('IndiaLeaders')}>
            <Image
              style={[styles.btn]}
              source={require('../assets/indiaLead.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('DistGov')}>
            <Image
              style={[styles.btn]}
              source={require('../assets/DistGov.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RegionalLeader')}>
            <Image
              style={[styles.btn]}
              source={require('../assets/regLead.png')}
            />
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
              <Text style={styles.adminButtonText}>Admin</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  adminButton: {
    backgroundColor: '#8FBFE8',
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
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
  mainContainer: {
    backgroundColor: 'whire',
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
  userName: {
    fontSize: 36,
    color: 'white',
    alignSelf: 'center',
  },
});

export default HomePage;
