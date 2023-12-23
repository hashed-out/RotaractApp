import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
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

type Props = {
  navigation: any;
  route: any;
};

const SearchScreen = ({navigation}: Props) => {
  const [data, setData] = useState([
    {
      name: '',
      userName: '',
      avatar: {url: ''},
      followers: [],
    },
  ]);
  const [reload, setReload] = useState(false);

  // console.log(fromRemoveUser, fromAddRegLead, 'checking stat');
  const {users, user, isLoading, token} = useSelector(
    (state: any) => state.user,
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

  const handleSearchChange = (e: any) => {
    if (e.length !== 0) {
      const filteredUsers =
        users &&
        users.filter((i: any) =>
          i.name.toLowerCase().includes(e.toLowerCase()),
        );
      setData(filteredUsers);
    } else {
      setData(users);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <HeaderCard />
          <View className="p-3">
            <Text className="text-[30px] text-[#000] font-[600]">
              Bengaluru Rotarians
            </Text>
            <View className="relative">
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/8992/8992459.png',
                }}
                height={20}
                width={20}
                className="absolute top-[20px] left-2"
              />
              <TextInput
                onChangeText={e => handleSearchChange(e)}
                placeholder="Search Rotarians...."
                placeholderTextColor={'#000'}
                className="w-full h-[38px] bg-[#0000000e] rounded-[8px] pl-8 text-[#000] mt-[10px]"
              />
            </View>
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              renderItem={({item}: any) => {
                const handleFollowUnfollow = async (e: any) => {
                  try {
                    if (e.followers.find((i: any) => i.userId === user._id)) {
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
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('UserProfile', {
                        item: item,
                      })
                    }>
                    <View className="flex-row my-3">
                      <Image
                        source={
                          item.avatar?.url
                            ? {uri: item.avatar?.url}
                            : DefaultAvatar
                        }
                        width={30}
                        height={30}
                        borderRadius={100}
                        style={{height: 40, width: 40}}
                      />
                      <View className="w-[90%] flex-row justify-between border-b border-[#00000020] pb-2">
                        <View>
                          <View className="flex-row items-center relative">
                            <Text className="pl-3 text-[18px] text-black">
                              {item.name}
                            </Text>
                            {item?.role === 'Admin' && (
                              <Image
                                source={{
                                  uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828640.png',
                                }}
                                width={18}
                                height={18}
                                className="ml-1"
                              />
                            )}
                          </View>

                          <Text className="pl-3 text-[18px] text-black">
                            {item.userName}
                          </Text>
                          <Text className="pl-3 mt-1 text-[16px] text-[#444]">
                            {item.followers.length} followers
                          </Text>
                        </View>
                        <View style={{paddingRight: 10, paddingTop: 18}}>
                          <TouchableOpacity
                            className="rounded-[8px] w-[100px] flex-row justify-center items-center h-[35px] border border-[#0000004b]"
                            onPress={() => handleFollowUnfollow(item)}>
                            <Text className="text-black">
                              {item.followers.find(
                                (i: any) => i.userId === user._id,
                              )
                                ? 'Following'
                                : 'Follow'}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default SearchScreen;
