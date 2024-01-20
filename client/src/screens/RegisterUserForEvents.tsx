import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  Modal,
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

const RegisterUserForEvents = ({ navigation, route }: Props) => {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [reload, setReload] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { item, postId } = route?.params;
  const { users, user, isLoading, token } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoader(true);
    try {
      axios
        .get(`${URI}/getAllRegistered/${item?._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res: any) => {
          setLoader(false);
          setData(res?.data?.registeredUsersWithInfo);
          setList(res?.data?.registeredUsersWithInfo);
        });
      dispatch;
    } catch (error) {
      setLoader(false);
      console.error('Error getting registered users:', error);
    }
  }, [item]);

  const handleSearchChange = (e: any) => {
    if (e.length !== 0) {
      const filteredUsers =
        data &&
        data.filter((i: any) => i.userInfo?.name.toLowerCase().includes(e.toLowerCase()));
      setData(filteredUsers);
    } else {
      setData(list);
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(item?.url);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <HeaderCard />
          <View className="p-3">
            <Text className="text-[30px] text-[#000] font-[600]">
              Registered Users
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
                onChangeText={(e) => handleSearchChange(e)}
                placeholder="Search Users...."
                placeholderTextColor={'#000'}
                className="w-full h-[38px] bg-[#0000000e] rounded-[8px] pl-8 text-[#000] mt-[10px]"
              />
            </View>
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }: any) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('UserProfile', { item: item.userInfo })}
                  onLongPress={() => handleImageClick(item.url)}>
                  <View className="flex-row my-3">
                    <Image
                      source={
                        item?.userInfo?.avatar?.url
                          ? { uri: item?.userInfo?.avatar?.url }
                          : DefaultAvatar
                      }
                      width={30}
                      height={30}
                      borderRadius={100}
                      style={{ height: 40, width: 40 }}
                    />
                    <View className="w-[90%] flex-row justify-between border-b border-[#00000020] pb-2">
                      <View>
                        <View className="flex-row items-center relative">
                          <Text className="pl-3 text-[18px] text-black">
                            {item.userInfo?.name}
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
                        <Text className="pl-3 mt-1 text-[16px] text-[#444]">
                          {item.userInfo?.clubName}
                        </Text>
                        {/* Render user image here */}
                        <Image source={{ uri: item?.url }} style={{ height: 30, width: 10 }} />
                        {/* Long press to show image preview */}
                        <TouchableOpacity
                          style={styles.avatarContainer}
                          onPress={() => handleImageClick(item.url)}>
                          <View style={styles.relativeContainer}>
                            <Image
                              source={{ uri: item?.url }}
                              style={styles.avatarImage}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Modal for Image Preview */}
          <Modal
            transparent
            visible={selectedImage !== null}
            onRequestClose={closeModal}>
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
                <Text style={styles.modalCloseText}> X </Text>
              </TouchableOpacity>
              <Image source={
                        item?.userInfo?.avatar?.url
                          ? { uri: item?.userInfo?.avatar?.url }
                          : DefaultAvatar
                      } style={styles.modalImage} />
            </View>
          </Modal>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  previewImage: {
    height: 550,
    width: 350,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: 10,
  },
  relativeContainer: {
    position: 'relative',
  },
  imagePreviewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    height: 85,
    width: 85,
    borderRadius: 100,
  },
  // Add new styles for Modal
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
    borderRadius: 8,
    resizeMode: 'contain',  // Add this line to ensure the image is fully visible
  },
});

export default RegisterUserForEvents;
