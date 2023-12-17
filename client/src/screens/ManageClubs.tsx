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

const ManageClubs = ({navigation, route}: Props) => {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [reload, setReload] = useState(false);
  const [loader, setLoader] = useState(false);
  // const {fromRemoveUser, fromAddRegLead,fromAddDistGov,fromAddIndLead,fromAddAdmin} = route?.params;

  const {users, user, isLoading, token} = useSelector(
    (state: any) => state.user,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setLoader(true);
    try {
      axios
        .get(`${URI}/getAllClubs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res: any) => {
          console.log(res?.data?.club,"det")
          setLoader(false);
          setData(res?.data?.club);
          setList(res?.data?.club);
        });
    } catch (error) {
      setLoader(false);
      console.error('Error getting clubs:', error);
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

  const filterById = (id: any) => {
    setData((prev: any): any => {
      return prev?.filter((p: any) => p?._id !== id);
    });
  };

  const handleSearchChange = (e: any) => {
    if (e.length !== 0) {
      const filteredUsers =
        data &&
        data.filter((i: any) => i.clubName.toLowerCase().includes(e.toLowerCase()));
      setData(filteredUsers);
    } else {
      setData(list);
    }
  };

  const handleDeleteClub = async (id: any) => {
    // console.log('id', id);
    filterById(id);
    try {
      await axios
        .delete(`${URI}/deleteClub/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          // filterById(id);
        });
    } catch (error) {
      console.error('Error deleting user:', error);
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
              Manage Clubs
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
                placeholder="Search Club...."
                placeholderTextColor={'#000'}
                className="w-full h-[38px] bg-[#0000000e] rounded-[8px] pl-8 text-[#000] mt-[10px]"
              />
            </View>
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              renderItem={({item}: any) => {
                return (
                    <View className="flex-row my-3" style={{padding:20}}>
                      <Image
                        source={require('../assets/club.png')}
                        style={{height: 35, width: 35}}
                      />
                      <View className="w-[90%] flex-row justify-between border-b border-[#00000020] pb-2" >
                        <View>
                          <View className="flex-row items-center relative">
                            <Text className="pl-3 text-[18px] text-black">
                              {item?.clubName}
                            </Text>
                          </View>
                        </View>
                        <View>
                            <TouchableOpacity
                              className="rounded-[8px] w-[100px] flex-row justify-center items-center h-[35px] border border-[#0000004b]"
                              onPress={() => handleDeleteClub(item?._id)}>
                              <Text className="text-black">Remove</Text>
                            </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                );
              }}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default ManageClubs;
