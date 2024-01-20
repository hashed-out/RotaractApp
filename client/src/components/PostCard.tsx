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

  const extractedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
  const hours = date.getHours();
  const minutes = date.getMinutes();

  let timedate;
  if (hours > 12) {
    timedate = `${hours - 12}:${minutes.toLocaleString('en-US', { minimumIntegerDigits: 2 })} pm`;
  } else {
    timedate = `${hours}:${minutes.toLocaleString('en-US', { minimumIntegerDigits: 2 })} am`;
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
  const createdAtDate = new Date(item.createdAt);
  const options2 = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedCreatedAt = createdAtDate.toLocaleDateString('en-US', options2);
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
            <Image source={{ uri:'https://cdn-icons-png.flaticon.com/128/3132/3132919.png' }} style={{height:35, width:35}}/>
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
            <Text style={styles.postDate}>Posted on {formattedCreatedAt}</Text>
          </View>
        </View>

        <Text style={styles.title}>{item.title}</Text>
        {Event && (
          <View style={styles.eventDetailsContainer}>
            <View style={styles.eventDateContainer}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/6353/6353132.png',
                }}
                style={styles.icon}
              />
              <Text style={styles.eventDate}>
              {timedate}  {extractedDate}
              </Text>
            </View>
            <View style={styles.eventVenueContainer}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/6003/6003704.png',
                }}
                style={styles.icon}
              />
              <Text style={styles.eventVenue}>{item.eventVenue}</Text>
            </View>
            <View style={styles.eventVenueContainer}>
        <Text style={ styles.textcom}><Image source={{ uri:'https://cdn-icons-png.flaticon.com/128/7204/7204809.png' }} style={styles.icon}/>{item.eventFee}</Text>
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

        {/* <Text style={styles.caption}>
          caption dncsnrndn ndjdjdd djdkdkdkdkdkkd djdkdkdkdkd djdjddkdkdkdkkdkd
        </Text> */}
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
          {Event && ( item.user._id === user._id || user?.role==='admin')  ? (
          <TouchableOpacity onPress={() => {
              navigation.navigate('RegUser', {  
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
                  {Event &&  (
          <TouchableOpacity
          onPress={() => {
            navigation.navigate('EventReg', {
              item: item,
              navigation: navigation,
              postId: postId,
            });
          }}
          style={styles.regbutton}
          >
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#000' }}>Register</Text>
        </TouchableOpacity>
          )}
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
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 22 }}>
    <Modal
      animationType="fade"
      transparent={true}
      visible={openModal}
      onRequestClose={() => {
        setOpenModal(!openModal);
      }}>
      <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: '#00000059' }}>
          <TouchableWithoutFeedback onPress={() => setOpenModal(true)}>
            <View style={{ width: '100%', backgroundColor: '#fff', flexDirection: 'row', height: 120, borderRadius: 20, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 }}>
              <TouchableOpacity
                style={{ flex: 1, backgroundColor: '#e24848', height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}
                onPress={() => deletePostHandler(item._id)}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>
                  Delete
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1, backgroundColor: 'green', height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => setOpenModal(false)}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>No</Text>
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
  textcom:{
    textAlignVertical:'center',
    fontWeight:'bold',
    color:'black',
    fontSize:20,
  },
  regbutton:{ 
    flex: 1, 
    backgroundColor: '#fff',
    height: 30,maxWidth:120,
    borderRadius: 6, 
    alignItems: 'center', justifyContent: 'center',
    marginStart:100,
    borderColor:'#000',
    borderWidth:2,
    shadowColor: '#333',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3, },

  cardContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    backgroundColor: '#fff',
    overflow: 'hidden', // Ensure rounded corners are applied
    elevation: 3, // Add shadow for a card-like effect (Android)
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
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
    marginEnd:20,
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
  regfee: {
    flexDirection: 'row',  // Set flexDirection to 'row'
    alignItems: 'center',   // Center items vertically
    paddingBottom: 10,
    resizeMode:'contain',
  },
  userName: {
    fontSize: 20,
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
    textAlign: 'justify',
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
    width: 25,
    height: 25,
    marginRight: 4,
  },
  eventDate: {
    fontSize: 16,
    color: '#000',
    textTransform: 'uppercase',
  },
  eventVenueContainer: {
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventVenue: {
    fontSize: 16,
    color: '#000',
    alignSelf:'flex-end',
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
