import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Image} from 'react-native';
import getTimeDuration from '../common/TimeGenerator';
import Share from 'react-native-share';
import DefaultAvatar from '../assets/user-avatar.png';
import {
  addLikes,
  getAllPosts,
  removeLikes,
} from '../../redux/actions/postAction';
import axios from 'axios';
import {URI} from '../../redux/URI';
import PostDetailsCard from './PostDetailsCard';

type Props = {
  navigation: any;
  item: any;
  isReply?: boolean | null;
  postId?: string | null;
  replies?: boolean | null;
  isEvent?: boolean | null;
};

const PostCard = ({
  item,
  isReply,
  navigation,
  postId,
  replies,
  isEvent,
}: Props) => {
  const {user, token, users} = useSelector((state: any) => state.user);
  const {posts} = useSelector((state: any) => state.post);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    name: '',
    avatar: {
      url: 'https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png',
    },
  });
  const time = item?.createdAt;
  const formattedDuration = getTimeDuration(time);
  //const datetime= item?.eventDate;
  const Event = item?.isEvent;

  const datetime = item.eventDate;
  const date = new Date(datetime);

  const extractedDate = date.toDateString();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  let timedate;
  if (hours > 12) {
    timedate = `${hours - 12}:${minutes} pm`;
  } else {
    timedate = `${hours}:${minutes} am`;
  }

  const profileHandler = async (e: any) => {
    await axios
      .get(`${URI}/get-user/${e._id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        if (res.data.user._id !== user._id) {
          navigation.navigate('UserProfile', {
            item: res.data.user,
          });
        } else {
          navigation.navigate('Profile');
        }
      });
  };

  const reactsHandler = (e: any) => {
    if (item.likes.length !== 0) {
      const isLikedBefore = item.likes.find((i: any) => i.userId === user._id);
      if (isLikedBefore) {
        removeLikes({postId: postId ? postId : e._id, posts, user})(dispatch);
      } else {
        addLikes({postId: postId ? postId : e._id, posts, user})(dispatch);
      }
    } else {
      addLikes({postId: postId ? postId : e._id, posts, user})(dispatch);
    }
  };

  const deletePostHandler = async (e: any) => {
    console.log('deletepost');
    console.log(`${URI}/delete-post/${e}`);
    try {
      await axios.delete(`${URI}/delete-post/${e}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAllPosts()(dispatch);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  useEffect(() => {
    if (users) {
      const updatedUsers = [...users, user];
      const userData = updatedUsers.find(
        (user: any) => user._id === item.user._id,
      );
      setUserInfo(userData);
    }
  }, [users]);
  const url = 'https://rotoconnect.com/';
  const title = 'RotoConnect';
  const message = item.title + 'mesgsd';

  const options = {
    title,
    url,
    message,
  };
  const share = async (customOptions = options) => {
    try {
      await Share.open(customOptions);
    } catch (err) {
      console.log(err);
    }
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const options: any = {year: 'numeric', month: 'long', day: 'numeric'};
    return currentDate.toLocaleDateString(undefined, options);
  };

  return (
    <View>
      <View style={styles.cardContainer}>
        {item.user._id === user._id || user?.role === 'admin' ? (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() =>
              (item.user._id === user._id || user?.role === 'admin') &&
              setOpenModal(true)
            }>
            <Text style={styles.deleteIcon}>...</Text>
          </TouchableOpacity>
        ) : null}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => profileHandler(item.user)}>
            <Image
              source={
                userInfo?.avatar?.url
                  ? {uri: userInfo?.avatar?.url}
                  : DefaultAvatar
              }
              style={styles.userProfilePhoto}
            />
          </TouchableOpacity>
          <View style={styles.userInfoContainer}>
            <TouchableOpacity onPress={() => profileHandler(userInfo)}>
              <Text style={styles.userName}>{userInfo?.name}</Text>
            </TouchableOpacity>
            <Text style={styles.postDate}>Posted on {getCurrentDate()}</Text>
          </View>
        </View>

        <Text style={styles.title}>{item.title}</Text>
        {Event && (
          <View style={styles.eventDetailsContainer}>
            <View style={styles.eventDateContainer}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/591/591576.png',
                }}
                style={styles.icon}
              />
              <Text style={styles.eventDate}>
                {extractedDate}{' '}
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/2784/2784459.png',
                  }}
                  style={styles.icon}
                />{' '}
                {timedate}
              </Text>
            </View>
            <View style={styles.eventVenueContainer}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/11529/11529542.png',
                }}
                style={styles.icon}
              />
              <Text style={styles.eventVenue}>{item.eventVenue}</Text>
            </View>
          </View>
        )}

        {item.image && (
          <View className="ml-[20px] my-3">
            <Image
              source={{uri: item.image.url}}
              style={{aspectRatio: 1, borderRadius: 10, zIndex: 1111}}
              resizeMode="contain"
            />
          </View>
        )}

        <Text style={styles.caption}>
          caption dncsnrndn ndjdjdd djdkdkdkdkdkkd djdkdkdkdkd djdjddkdkdkdkkdkd
        </Text>
        <View className="flex-row items-center left-[10px] top-[5px]">
          <TouchableOpacity onPress={() => reactsHandler(item)}>
            {item.likes.length > 0 ? (
              <>
                {item.likes.find((i: any) => i.userId === user._id) ? (
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/2589/2589175.png',
                    }}
                    width={30}
                    height={30}
                  />
                ) : (
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/2589/2589197.png',
                    }}
                    width={30}
                    height={30}
                  />
                )}
              </>
            ) : (
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/2589/2589197.png',
                }}
                width={30}
                height={30}
              />
            )}
          </TouchableOpacity>
          {Event &&  (
           <TouchableOpacity
            onPress={() => {
              navigation.navigate('EventReg', {
                item: item,
                navigation: navigation,
                postId: postId,
              });
            }}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/6997/6997143.png',
              }}
              width={30}
              height={30}
              className="ml-5"
            />
          </TouchableOpacity>
<<<<<<< HEAD
          {item.user._id === user._id || user?.role === 'admin' ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('RegUser', {
                  //Sanath add registration page here
                  item: item,
                });
              }}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/3269/3269065.png',
                }}
                width={25}
                height={25}
                className="ml-5"
              />
            </TouchableOpacity>
          ) : null}
=======
          )}
          {Event && ( item.user._id === user._id || user?.role==='admin')  ? (
          <TouchableOpacity onPress={() => {
              navigation.navigate('EventReg', {  
                item: item,
                navigation: navigation,
                postId: postId,
              });}}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/3269/3269065.png',
              }}
              width={25}
              height={25}
              className="ml-5"
            />
          </TouchableOpacity>
          ):null}

>>>>>>> pp
        </View>
        {!isReply && (
          <View className="pl-[10px] pt-4 flex-row">
            <TouchableOpacity
              onPress={() =>
                item.likes.length !== 0 &&
                navigation.navigate('PostLikeCard', {
                  item: item.likes,
                  navigation: navigation,
                })
              }>
              <Text className="text-[16px[ text-[#0000009b]">
                {item.likes.length} {item.likes.length > 1 ? 'likes' : 'like'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {replies && (
          <>
            {item?.replies?.map((i: any) => (
              <PostDetailsCard
                navigation={navigation}
                key={i._id}
                item={i}
                isReply={true}
                postId={item._id}
              />
            ))}
          </>
        )}
        {openModal && (
          <View className="flex-[1] justify-center items-center mt-[22]">
            <Modal
              animationType="fade"
              transparent={true}
              visible={openModal}
              onRequestClose={() => {
                setOpenModal(!openModal);
              }}>
              <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
                <View className="flex-[1] justify-end bg-[#00000059]">
                  <TouchableWithoutFeedback onPress={() => setOpenModal(true)}>
                    <View className="w-full bg-[#fff] h-[120] rounded-[20px] p-[20px] items-center shadow-[#000] shadow-inner">
                      <TouchableOpacity
                        className="w-full bg-[#00000010] h-[50px] rounded-[10px] items-center flex-row pl-5"
                        onPress={() => deletePostHandler(item._id)}>
                        <Text className="text-[18px] font-[600] text-[#e24848]">
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: '#1450a3',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    backgroundColor: '#fff',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userProfilePhoto: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  userInfoContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postDate: {
    fontSize: 12,
    color: '#777',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  eventDetailsContainer: {
    flexDirection: 'column',
    marginBottom: 1,
  },
  eventDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  eventDate: {
    fontSize: 14,
    color: '#333',
  },
  eventVenueContainer: {
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  eventVenue: {
    fontSize: 14,
    color: '#333',
  },
  deleteIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
  },
  postImage: {
    height: 240,
    borderRadius: 12,
    marginBottom: 16,
  },
  caption: {
    fontSize: 14,
    color: '#555',
  },
});

export default PostCard;
