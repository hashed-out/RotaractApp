import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TextInput} from 'react-native';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import axios from 'axios';
import {URI} from '../../redux/URI';
import {loadUser} from '../../redux/actions/userAction';
import DefaultAvatar from '../assets/user-avatar.png';
import { useFocusEffect } from '@react-navigation/native';


type Props = {
  navigation: any;
};

const EditProfile = ({ navigation }: Props) => {
  const { user, token } = useSelector((state: any) => state.user);
  const [avatar, setAvatar] = useState(user?.avatar?.url);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: user.name,
    contactNumber: user.contactNumber,
    email: user.email,
  });

  const reloadUserData = async () => {
    try {
      const res = await axios.get(`${URI}/user-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedUser = res.data.user;
      setAvatar(updatedUser.avatar.url);
      // setUserData({
      //   name: updatedUser.name,
      //   contactNumber: updatedUser.contactNumber,
      //   email: updatedUser.email,
      // });
    } catch (error) {
      console.error('Error reloading user data:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Reload user data including avatar when the screen comes into focus
      reloadUserData();
    }, [token]) // Dependency on token ensures that it reloads only when the token changes
  );

  const handleSubmitHandler = async () => {
    if (userData.name.length !== 0) {
      try {
        const res = await axios.put(
          `${URI}/update-profile`,
          {
            name: userData.name,
            contactNumber: userData.contactNumber,
            email: userData.email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Update the local user data in the Redux store
        dispatch(loadUser());
        // Optionally, you can also navigate to the user profile screen
        // navigation.navigate('UserProfile', { item: res.data.user });
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  const ImageUpload = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
    }).then((image: ImageOrVideo | null) => {
      if (image) {
        axios
          .put(
            `${URI}/update-avatar`,
            {
              avatar: 'data:image/jpeg;base64,' + image?.data,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res: any) => {
            setAvatar(res.data.user.avatar.url);
          })
          .catch((error) => {
            console.error('Error updating avatar:', error);
          });
      }
    });
  };

  return (
    <SafeAreaView>
      <View className="flex-row items-center justify-between p-3">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/2961/2961937.png',
              }}
              width={25}
              height={25}
            />
          </TouchableOpacity>
          <Text className="text-[20px] left-4 font-[600] text-[#000]">
            Edit Profile
          </Text>
        </View>
        <TouchableOpacity onPress={handleSubmitHandler}>
          <Text className="text-[20px] text-black">Submit</Text>
        </TouchableOpacity>
      </View>
      <View className="h-[90%] items-center justify-center">
        <View className="w-[90%] p-3 min-h-[300] h-max border rounded-[10px] border-[#0000002e]">
          <View className="flex-row">
            <View className="w-full flex-row justify-between">
              <View>
                <Text className="text-[18px] font-[600] text-black">Name</Text>
                <TextInput
                  value={userData.name}
                  onChangeText={e => setUserData({...userData, name: e})}
                  placeholder="Enter your name..."
                  placeholderTextColor={'#000'}
                  className="text-[16px] text-[#000000b0]"
                />
              </View>
              <TouchableOpacity onPress={ImageUpload}>
                <Image
                  source={avatar ? {uri: avatar} : DefaultAvatar}
                  width={60}
                  height={60}
                  style={{height:60,width:60}}
                  borderRadius={100}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="w-full border-t border-[#00000015] pt-2">
        <Text className="text-[18px] font-[600] text-black">Contact Number</Text>
        <TextInput
          value={userData.contactNumber}
          onChangeText={(e) => setUserData({ ...userData, contactNumber: e })}
          placeholder="Enter your mobile number..."
          placeholderTextColor={'#000'}
          className="text-[16px] mb-2 text-[#000000b0]"
        />
        <Text className="text-[18px] font-[600] text-black">Email-Id</Text>
        <TextInput
          value={userData.email}
          onChangeText={(e) => setUserData({ ...userData, email: e })}
          placeholder="Enter your email address..."
          placeholderTextColor={'#000'}
          className="text-[16px] text-[#000000b0]"
        />
      </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;