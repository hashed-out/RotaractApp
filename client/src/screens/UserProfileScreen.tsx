import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUserAction, unfollowUserAction } from '../../redux/actions/userAction';
import PostCard from '../components/PostCard';
import DefaultAvatar from '../assets/user-avatar.png';
import HeaderCard from '../components/HeaderCard';

type Props = {
  route: any;
  navigation: any;
};

const UserProfileScreen = ({ navigation, route }: Props) => {
  const { users, user, isLoading } = useSelector((state: any) => state.user);
  const [imagePreview, setImagePreview] = useState(false);
  const [active, setActive] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const { posts } = useSelector((state: any) => state.post);
  const [postData, setPostsData] = useState([]);
  const [repliesData, setRepliesData] = useState([]);
  const d = route.params?.item;
  const [data, setData] = useState(d);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (users) {
      const userData = users.find((i: any) => i._id === d?._id);
      setData(userData);
    }
    if (posts) {
      const myPosts = posts.filter((post: any) => post.replies.some((reply: any) => reply.user._id === d._id));
      setRepliesData(myPosts.filter((post: any) => post.replies.length > 0));

      const myUserPosts = posts.filter((post: any) => post.user._id === d._id);
      setPostsData(myUserPosts);
    }
  }, [users, route.params?.item, posts, d]);

  const FollowUnfollowHandler = async () => {
    try {
      if (data.followers.find((i: any) => i.userId === user._id)) {
        await unfollowUserAction({
          userId: user._id,
          users,
          followUserId: data._id,
        })(dispatch);
      } else {
        await followUserAction({
          userId: user._id,
          users,
          followUserId: data._id,
        })(dispatch);
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };


  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(data.avatar?.url);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };
  return (
    <>
      <HeaderCard />
      {data && (
        <SafeAreaView style={styles.container}>
          <View style={styles.contentContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.userInfoContainer}>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{data.name}</Text>
                  <TouchableOpacity>
                    <Text style={styles.userInfoText}>
                      {data.followers.length} followers
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.avatarContainer}
                  onPress={() => handleImageClick(data.avatar?.url)}>
                  <View style={styles.relativeContainer}>
                    <Image
                      source={data.avatar?.url ? { uri: data.avatar?.url } : DefaultAvatar}
                      style={styles.avatarImage}
                    />
                    {data.role === 'admin' && (
                      <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10629/10629607.png' }}
                        style={styles.adminIcon}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.detailContainer}>
          <Image source={require('../assets/rotcir.png')} style={styles.icon} />
          <Text style={styles.detailText}>{data?.designation}</Text>
          </View>
          <View style={styles.detailContainer}>
          <Image source={require('../assets/rotcir.png')} style={styles.icon} />
          <Text style={styles.detailText}>{user?.clubName}</Text>
          </View>
      <View style={styles.detailContainer}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/128/724/724664.png' }}
          style={styles.icon}
        />
        <Text style={styles.detailText}>+91 {data?.contactNumber}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/128/7718/7718904.png' }}
          style={styles.icon}
        />
        <Text style={styles.detailText}>{data?.email}</Text>
      </View>

                <TouchableOpacity
                  style={styles.followButton}
                  onPress={FollowUnfollowHandler}>
                  <Text style={styles.followButtonText}>
                    {data.followers.find((i: any) => i.userId === user._id)
                      ? 'Following'
                      : 'Follow'}
                  </Text>
                </TouchableOpacity>

                {data.role === 'admin' && (
                  <View style={styles.tabContainer}>
                    <TouchableOpacity onPress={() => setActive(0)}>
                      <Text
                        style={[
                          styles.tabText,
                          { opacity: active === 0 ? 1 : 0.6 },
                        ]}>
                        Events and Posts by {data?.name}
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.tabIndicator} />
                  </View>
                )}

                {data.role === 'admin' && active === 0 && (
                  <View style={styles.postsContainer}>
                    {postData &&
                      postData.map((item: any) => (
                        <PostCard
                          navigation={navigation}
                          key={item._id}
                          item={item}
                        />
                      ))}
                    {postData.length === 0 && (
                      <Text style={styles.noPostText}>
                        No Post yet!
                      </Text>
                    )}
                  </View>
                )}

                {active === 1 && (
                  <>
                    {repliesData &&
                      repliesData.map((item: any) => (
                        <PostCard
                          navigation={navigation}
                          key={item._id}
                          item={item}
                          replies={true}
                        />
                      ))}
                    {active !== 1 && postData.length === 0 && (
                      <Text style={styles.noPostText}>
                        No Post yet!
                      </Text>
                    )}
                  </>
                )}

            </ScrollView>
          </View>
          <Modal
            transparent
            visible={selectedImage !== null}
            onRequestClose={closeModal}>
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
              <Image source={data.avatar?.url ? { uri: data.avatar?.url } : DefaultAvatar} style={styles.modalImage} />
            </View>
          </Modal>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  container: {
    flex: 1,
  },

  
  contentContainer: {
    padding: 16,
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  userInfo: {
    width: '70%',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  userInfoText: {
    fontSize: 18,
    color: '#000000c7',
    paddingTop: 5,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: 10,
  },
  relativeContainer: {
    position: 'relative',
  },
  avatarImage: {
    height: 85,
    width: 85,
    borderRadius: 100,
  },
  adminIcon: {
    position: 'absolute',
    bottom: 5,
    left: -8,
    height: 30,
    width: 30,
    zIndex: 1,
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    padding: 15,
    marginVertical: 5,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  detailText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
  },
  followButton: {
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: 'black',
    paddingVertical: 10,
    alignItems: 'center',
  },
  followButtonText: {
    color: 'white',
    fontSize: 18,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#00000032',
    paddingBottom: 2,
    marginTop: 20,
  },
  tabText: {
    fontSize: 18,
    paddingLeft: 3,
    color: 'black',
  },
  tabIndicator: {
    backgroundColor: 'black',
    height: 1,
    width: '50%',
    alignSelf: 'center',
  },
  postsContainer: {
    paddingBottom: 120,
  },
  noPostText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    paddingTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  modalCloseText: {
    color: 'black',
    fontWeight: 'bold',
  },
  modalImage: {
    width: '90%',
    height: '50%',
    borderRadius:20,
    borderColor:'#fff',
    borderWidth:5,
    resizeMode: 'contain',  // Add this line to ensure the image is fully visible
  },
});

export default UserProfileScreen;
