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

const GetAllUsersScreen = ({navigation, route}: Props) => {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [reload, setReload] = useState(false);
  const [loader, setLoader] = useState(false);
  const {fromRemoveUser, fromAddRegLead,fromAddDistGov,fromAddIndLead,fromAddAdmin} = route?.params;

  const {users, user, isLoading, token} = useSelector(
    (state: any) => state.user,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setLoader(true);
    try {
      axios
        .get(`${URI}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res: any) => {
          setLoader(false);
          setData(res?.data?.users);
          setList(res?.data?.users);
        });
      dispatch;
    } catch (error) {
      setLoader(false);
      console.error('Error getting reg leaders:', error);
    }
  }, [reload]);

  const updateOneProfile = (item: any) => {
    setData((prev: any) => {
      return prev.map((user: any) => {
        if (user?._id === item?._id) return item;
        return user;
      });
    });
  };

  const filterProfileById = (id: any) => {
    setData((prev: any): any => {
      return prev?.filter((p: any) => p?._id !== id);
    });
  };

  const handleSearchChange = (e: any) => {
    if (e.length !== 0) {
      const filteredUsers =
        data &&
        data.filter((i: any) => i.name.toLowerCase().includes(e.toLowerCase()));
      setData(filteredUsers);
    } else {
      setData(list);
    }
  };

  const handleDeleteUser = async (id: any) => {
    // console.log('id', id);
    try {
      await axios
        .delete(`${URI}/deleteUser/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          filterProfileById(id);
        });
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAddUserAsRegionalLeader = async (item: any) => {
    try {
      await axios
        .put(`${URI}/addRegionalLeader/${item?._id}`,{},{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          updateOneProfile({
            ...item,
            isRegionalLeader: item?.isRegionalLeader ? false : true,
          });
        });
    } catch (error) {
      console.error('Error adding user as regional leader:', error);
    }
  };

  const handleAddUserAsIndianLeader = async (item: any) => {
    // console.log(item?._id,item?.isRegionalLeader)
    try {
      await axios
        .put(`${URI}/addIndianLeader/${item?._id}`,{}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          updateOneProfile({
            ...item,
            isIndiaLeader: item?.isIndiaLeader ? false : true,
          });
        });
    } catch (error) {
      console.error('Error adding user as Indian leader:', error);
    }
  };


  const handleAddUserAsDistrictGovernor = async (item: any) => {
    // console.log(item?._id,item?.isRegionalLeader)
    try {
      await axios
        .put(`${URI}/addDistrictGoverner/${item?._id}`,{}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          updateOneProfile({
            ...item,
            isDistrictGoverner: item?.isDistrictGoverner ? false : true,
          });
        });
    } catch (error) {
      console.error('Error adding user as District Governor:', error);
    }
  };

  const handleAddUserAsAdmin = async (item: any) => {
    // console.log(item?._id,item?.isRegionalLeader)
    try {
      await axios
        .put(`${URI}/addAdmin/${item?._id}`,{}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          updateOneProfile({
            ...item,
            role: item?.role==='admin' ? 'user' : 'admin',
          });
        });
    } catch (error) {
      console.error('Error adding user as Admin:', error);
    }
  };



  return (
    <>
      {loader ? (
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
                          <View style={{paddingRight: 10, paddingTop: 18}}>
                            {fromRemoveUser ? (
                              <TouchableOpacity
                                className="rounded-[8px] w-[100px] flex-row justify-center items-center h-[35px] border border-[#0000004b]"
                                onPress={() => handleDeleteUser(item?._id)}>
                                <Text className="text-black">Remove</Text>
                              </TouchableOpacity>
                            ) : null}
                            {fromAddRegLead ? (
                              <TouchableOpacity
                                style={{padding: 10}}
                                className="rounded-[8px]  flex-row justify-center items-centerborder border border-[#0000004b]"
                                onPress={() =>
                                  handleAddUserAsRegionalLeader(item)
                                }>
                                <Text className="text-black">
                                  {item?.isRegionalLeader
                                    ? 'Regional Leader'
                                    : 'Add as Regional Leader'}
                                </Text>
                              </TouchableOpacity>
                            ) : null}
                            {fromAddDistGov ? (
                              <TouchableOpacity
                                style={{padding: 10}}
                                className="rounded-[8px]  flex-row justify-center items-centerborder border border-[#0000004b]"
                                onPress={() =>
                                  handleAddUserAsDistrictGovernor(item)
                                }>
                                <Text className="text-black">
                                  {item?.isDistrictGoverner
                                    ? 'District Governer'
                                    : 'Add as District Governer'}
                                </Text>
                              </TouchableOpacity>
                            ) : null}
                            {fromAddIndLead ? (
                              <TouchableOpacity
                                style={{padding: 10}}
                                className="rounded-[8px]  flex-row justify-center items-centerborder border border-[#0000004b]"
                                onPress={() =>
                                  handleAddUserAsIndianLeader(item)
                                }>
                                <Text className="text-black">
                                  {item?.isIndiaLeader
                                    ? 'Indian Leader'
                                    : 'Add as Indian Leader'}
                                </Text>
                              </TouchableOpacity>
                            ) : null}
                            {fromAddAdmin? (
                              <TouchableOpacity
                                style={{padding: 10}}
                                className="rounded-[8px]  flex-row justify-center items-centerborder border border-[#0000004b]"
                                onPress={() =>
                                  handleAddUserAsAdmin(item)
                                }>
                                <Text className="text-black">
                                  {item?.role==='admin'
                                    ? 'Admin'
                                    : 'Add as Admin'}
                                </Text>
                              </TouchableOpacity>
                            ) : null}
                          </View>
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

export default GetAllUsersScreen;
