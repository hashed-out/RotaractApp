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
  
  const ManageDesignation = ({navigation, route}: Props) => {
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [loader, setLoader] = useState(false);
  
    const {users, user, isLoading, token} = useSelector(
      (state: any) => state.user,
    );
  
    useEffect(() => {
      setLoader(true);
      try {
        axios
          .get(`${URI}/getAllDesignation`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res: any) => {
            console.log(res?.data?.designation,"det")
            setLoader(false);
            setData(res?.data?.designation);
            setList(res?.data?.designation);
          });
      } catch (error) {
        setLoader(false);
        console.error('Error getting clubs:', error);
      }
    }, []);
  
  
    const filterById = (id: any) => {
      setData((prev: any): any => {
        return prev?.filter((p: any) => p?._id !== id);
      });
    };
  
    const handleSearchChange = (e: any) => {
      if (e.length !== 0) {
        const filteredUsers =
          data &&
          data.filter((i: any) => i.designationName.toLowerCase().includes(e.toLowerCase()));
        setData(filteredUsers);
      } else {
        setData(list);
      }
    };
  
    const handleDeleteDesignation = async (id: any) => {
      // console.log('id', id);
      filterById(id);
      try {
        await axios
          .delete(`${URI}/deleteDesignation/${id}`, {
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
                Manage Designations
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
                  placeholder="Search Designation...."
                  placeholderTextColor={'#000'}
                  className="w-full h-[38px] bg-[#0000000e] rounded-[8px] pl-8 text-[#000] mt-[10px]"
                />
              </View>
              <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={({item}: any) => {
                  return (
                      <View className="flex-row my-3" style={{padding:10}}>
                        <Image
                          source={require('../assets/desgn.png')}
                          style={{height: 35, width: 35}}
                        />
                        <View className="w-[90%] flex-row justify-between border-b border-[#00000020] pb-2" >
                          <View>
                            <View className="flex-row items-center relative">
                              <Text className="pl-3 text-[18px] text-black">
                                {item?.designationName}
                              </Text>
                            </View>
                          </View>
                          <View>
                              <TouchableOpacity
                                className="rounded-[8px] w-[100px] flex-row justify-center items-center h-[35px] border border-[#0000004b]"
                                onPress={() => handleDeleteDesignation(item?._id)}>
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
  
  export default ManageDesignation;
  