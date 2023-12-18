import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Dimensions} from 'react-native';
import {loadUser, logoutUser} from '../../redux/actions/userAction';
import PostCard from '../components/PostCard';
import DefaultAvatar from '../assets/user-avatar.png';

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
      const myPosts = posts.filter((post: any) => post.user._id === user._id);
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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="relative">
        <View>
          <View
            className="flex-row justify-between"
            style={{width: width, padding: 10}}>
            <View>
              <Text className="text-[#000] text-[30px]">{user?.name}</Text>
              <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate('FollowerCard', {
              //     followers: user?.followers,
              //     following: user?.following,
              //   })
              // }
              >
              <Text className="text-[16px] text-[#444]">
                {user?.followers.length} followers
              </Text>
            </TouchableOpacity>
              <Text className="text-[#0000009d] text-[20px]">
                Contact: {user?.contactNumber}
              </Text>
            </View>
            
            <View className="relative">
              <Image
                source={user.avatar?.url ? { uri: user.avatar?.url } : DefaultAvatar}
                height={80}
                width={80}
                borderRadius={100}
                style={{height:80,width:80}}
              />
              {user.role === 'admin' && (
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828640.png',
                  }}
                  width={18}
                  height={18}
                  className="ml-2 absolute bottom-0 left-0"
                />
              )}
            </View>
          </View>
          <Text className="p-3 mt-[-20] text-[#000000d4] font-sans leading-6 text-[18px]">
            {user?.bio}
          </Text>
          <View className="p-3">
            <View>
              <Text className="text-[#0000009d] text-[20px]">
                Contact: {user?.contactNumber}
              </Text>
            </View>
            <View>
              <Text className="text-[#0000009d] text-[20px]">
                Contact: {user?.contactNumber}
              </Text>
            </View>
          </View>
          <View className="px-8 py-3 flex-row w-full items-center">
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}>
              <Text
                className="w-[100] pt-1 text-center h-[30px] text-[#000]"
                style={{
                  borderColor: '#666',
                  borderWidth: 1,
                  backgroundColor: 'transparent',
                  borderRadius:15,
                }}>
                Edit Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="ml-5" onPress={logoutHandler}>
              <Text
                className="w-[100] pt-1 text-center h-[30px] text-[#000]"
                style={{
                  borderColor: '#666',
                  borderWidth: 1,
                  backgroundColor: 'transparent',
                  borderRadius:15,
                }}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
          <View
            className="border-b border-b-[#00000032] px-4 py-3"
            style={{width: '100%', alignContent:'center'}}>
            <View className="w-[100%] m-auto flex-row justify-center">
              <TouchableOpacity onPress={() => setActive(0)}>
                <Text
                  className="text-[18px] pl-3 text-[#000]"
                  style={{opacity: active === 0 ? 1 : 0.6}}>
                  Your Events
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {active === 0 ? (
            <View className="w-[100%] absolute h-[1px] bg-black left-[-10px] bottom-0" />
          ) : (
            <View className="w-[100%] absolute h-[1px] bg-black right-[-10px] bottom-0" />
          )}
        </View>
        {active === 0 && (
          <>
            {data &&
              data.map((item: any) => (
                <PostCard navigation={navigation} key={item._id} item={item} />
              ))}
          </>
        )}



        {active === 0 && (
          <>
            {data.length === 0 && (
              <Text className="text-black text-[14px] mt-8 text-center">
                You have no posts yet!
              </Text>
            )}
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default ProfileScreen;
