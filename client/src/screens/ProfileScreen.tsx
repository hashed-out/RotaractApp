import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Dimensions} from 'react-native';
import {loadUser, logoutUser} from '../../redux/actions/userAction';
import PostCard from '../components/PostCard';
import DefaultAvatar from '../assets/user-avatar.png';
import HeaderCard from '../components/HeaderCard';
import HomePage from './HomePage';
import { URI } from '../../redux/URI';
import { background } from 'native-base/lib/typescript/theme/styled-system';
type Props = {
  navigation: any;
};

const {width} = Dimensions.get('window');

const ProfileScreen = ({navigation}: Props) => {
  const [active, setActive] = useState(0);
  const {user} = useSelector((state: any) => state.user);
  const {posts} = useSelector((state: any) => state.post);
  const [data, setData] = useState([]);
  const [repliesData, setRepliesData] = useState([]);
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    logoutUser()(dispatch);
  };
  useEffect(() => {
    if (posts && user) {
      const myPosts = posts.filter((post) => post.user._id === user._id);
      setData(myPosts);
    }
  }, [posts, user]);

  useEffect(() => {
    if (posts && user) {
      const myReplies = posts.filter((post: any) =>
        post.replies.some((reply: any) => reply.user._id === user._id),
      );
      setRepliesData(myReplies.filter((post: any) => post.replies.length > 0));
    }
  }, [posts, user]);
  console.log(user)

  const fadeIn = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeIn]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
        <HeaderCard />
        <Animated.View style={[styles.profileContainer, { opacity: fadeIn }]}>
          
          <View style={styles.avatarContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditProfile')}
              >
                <Image
                  source={
                    user.avatar?.url
                      ? { uri: user.avatar?.url }
                      : DefaultAvatar
                  }
                  borderRadius={100}
                  style={styles.avatar}
                />
              </TouchableOpacity>
              {user.role === 'admin' && (
                <Image
                  source={{
                    uri:
                      'https://cdn-icons-png.flaticon.com/128/10629/10629607.png',
                  }}
                  style={styles.adminIcon}
                />
              )}
            </View>
            <View style={styles.headerContainer}>
            <View>
              <Text style={styles.userName}>{user?.name}</Text>
                <Text style={styles.followers}>
                  {user?.followers.length} Followers
                </Text>
            </View>
          </View>

          <View style={styles.detailContainer}>
          <Image source={require('../assets/rotcir.png')} style={styles.icon} />
  <Text style={styles.detailText}>{user?.designation} at {user?.clubName}</Text>
          </View>
          <View style={styles.card}>
      <View style={styles.detailContainer}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/128/724/724664.png' }}
          style={styles.icon}
        />
        <Text style={styles.detailText}>{user?.contactNumber}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/128/7718/7718904.png' }}
          style={styles.icon}
        />
        <Text style={styles.detailText}>{user?.email}</Text>
      </View>
    </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={logoutHandler}
              style={[styles.button, styles.logoutButton]}
            >
              <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        {user.role === 'admin' ? (
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => setActive(0)}>
              <Text
                style={[
                  styles.tabText,
                  { opacity: active === 0 ? 1 : 0.6 },
                
                ]}
              >
                Your Events
              </Text>
            </TouchableOpacity>
          </View>
          ):null}
        </Animated.View>

        {user.role === 'admin' && active === 0 && (
          <>
            {data &&
              data.map((item) => (
                <PostCard
                  key={item._id}
                  item={item}
                  navigation={navigation}
                />
              ))}
            {data.length === 0 && (
              <Text style={styles.noPostsText}>
                You have no posts yet!
              </Text>
            )}
          </>
        )}

      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileContainer: {
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignSelf:'center',
  },
  userName: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
  },
  followers: {
    fontSize: 16,
    color: '#000',
  },
  designation: {
    marginTop:5,
    fontSize: 20,
    color: '#000000',
  },
  avatarContainer: {
    position: 'relative',
    marginTop: 10,
    alignSelf:'center'
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 100,
  },
  adminIcon: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    marginLeft: -4,
    height: 30,
    width: 30,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#333333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
  },
  logoutButton: {
    borderColor: 'blue',
  },
  tabContainer: {
    borderTopWidth: 1,
    borderTopColor: '#00000032',
    marginTop: 20,
  },
  tabText: {
    fontSize: 18,
    paddingLeft: 3,
    color: '#000',
    alignSelf:'center',
  },
  noPostsText: {
    height:'auto',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 14,
    color: '#000',

  },
});

export default ProfileScreen;
