import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  followUserAction,
  getAllUsers,
  unfollowUserAction,
} from '../../redux/actions/userAction';
import Loader from '../common/Loader';
import DefaultAvatar from '../assets/user-avatar.png';
import HeaderCard from '../components/HeaderCard';
import axios from 'axios';
import {URI} from '../../redux/URI';

const SearchScreen = ({ navigation }) => {
  const [data, setData] = useState([
    {
      name: '',
      userName: '',
      avatar: { url: '' },
      followers: [],
    },
  ]);
  const [reload, setReload] = useState(false);

  const { users, user, isLoading, token } = useSelector(
    (state) => state.user,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    getAllUsers()(dispatch);
  }, [dispatch, reload]);

  useEffect(() => {
    if (users) {
      setData(users);
    }
  }, [users]);

  const handleSearchChange = (e) => {
    if (e.length !== 0) {
      const filteredUsers =
        users &&
        users.filter(
          (i) =>
            i.name.toLowerCase().includes(e.toLowerCase()) ||
            i.clubName.toLowerCase().includes(e.toLowerCase())
        );
      setData(filteredUsers);
    } else {
      setData(users);
    }
  };
  

  const renderFollowButton = (item) => {
    const isFollowing = item.followers.find((i) => i.userId === user._id);

    return (
      <TouchableOpacity
        style={[
          styles.followButton,
          { backgroundColor: isFollowing ? '#4CAF50' : '#2196F3' },
        ]}
        onPress={() => handleFollowUnfollow(item)}
      >
        <Text style={styles.followButtonText}>
          {isFollowing ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleFollowUnfollow = async (e) => {
    try {
      if (e.followers.find((i) => i.userId === user._id)) {
        await unfollowUserAction({
          userId: user._id,
          users,
          followUserId: e._id,
        })(dispatch);
      } else {
        await followUserAction({
          userId: user._id,
          users,
          followUserId: e._id,
        })(dispatch);
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SafeAreaView style={styles.container}>
          <HeaderCard />
          <View style={styles.contentContainer}>
            <Text style={styles.heading}>Bengaluru Rotarians</Text>
            <View style={styles.searchInputContainer}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/8992/8992459.png',
                }}
                style={styles.searchIcon}
              />
              <TextInput
                onChangeText={(e) => handleSearchChange(e)}
                placeholder="Search Rotarians..."
                placeholderTextColor={'#000'}
                style={styles.searchInput}
              />
            </View>
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('UserProfile', {
                      item: item,
                    })
                  }
                  style={styles.userCard}
                >
                  <View style={styles.userContainer}>
                    <Image
                      source={
                        item.avatar?.url
                          ? { uri: item.avatar?.url }
                          : DefaultAvatar
                      }
                      style={styles.avatar}
                    />
                    <View style={styles.userInfoContainer}>
                      <View style={styles.usernameContainer}>
                        <Text style={styles.username}>{item.name}</Text>
                        {item?.role === 'admin' && (
                          <Image
                            source={{
                              uri: 'https://cdn-icons-png.flaticon.com/128/10629/10629607.png',
                            }}
                            style={styles.adminIcon}
                          />
                        )}
                      </View>
                      <Text style={styles.clubName}>{item.clubName}</Text>
                      {/* <Text style={styles.followersCount}>
                        {item.followers.length} followers
                      </Text> */}
                    </View>
                    {renderFollowButton(item)}
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width:'100%',
  },
  contentContainer: {
    padding: 15,
  },
  heading: {
    fontSize: 30,
    fontWeight: '600',
    color: '#000',
  },
  searchInputContainer: {
    position: 'relative',
  },
  searchIcon: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 20,
    left: 10,
  },
  searchInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#0000000e',
    borderRadius: 8,
    paddingLeft: 40,
    color: '#000',
    marginTop: 10,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    borderWidth:2,
  },
  
  
  userContainer: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 23,
    color: '#000',
  },
  adminIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  clubName: {
    fontSize: 18,
    color: '#000',
  },
  followersCount: {
    fontSize: 16,
    color: '#444',
    marginTop: 1,
  },
  followButton: {
    borderRadius: 8,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    paddingTop: 3,
  },
  followButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlignVertical:'center',
  },
});

export default SearchScreen;
