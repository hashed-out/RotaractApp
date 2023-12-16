import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import { URI } from '../../redux/URI';


function EventRegScreen({route}: any) {
  const navigation = useNavigation<any>();
  
  const {users, user, isLoading, token} = useSelector(
    (state: any) => state.user,
  );

  const {item, postId} = route?.params;



  const [payment, setPayment] = useState('');

  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.8,
      includeBase64: true,
    }).then((image: ImageOrVideo | null | any) => {
      if (image) {
        setPayment('data:image/jpeg;base64,' + image?.data);
      }
    });
  };


  const handleSubmit = async()=>{
    let eventId =item?._id
    let userId =user?._id
    // console.log(postid,userId,payment,"ids")
    try {
      await axios
        .post(`${URI}/registerForEvent`,{eventId,userId,payment},{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          // filterProfileById(id);
          navigation.goBack()
          console.log("registered")
        });
    } catch (error) {
      console.error('Error registering event:', error);
    }
  }

//   console.log(item,postId,"data")
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={[styles.mainContainer]}>
        <View style={[styles.header]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/545/545680.png',
              }}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
          <Text
            style={{
              paddingLeft: 16,
              fontSize: 20,
              fontWeight: '500',
              color: '#000',
            }}>
            Event Registration
          </Text>
        </View>
        <View style={[styles.container]}>
        {/* <TextInput
          placeholder="Enter your name"
          value={name}
          onChangeText={text => setName(text)}
          placeholderTextColor="#000"
          style={styles.input}
        /> */}
         <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
          <View style={styles.uploadButtonContainer}>
            <Image
              source={{
                uri: payment
                  ? payment
                  : 'https://cdn-icons-png.flaticon.com/128/568/568717.png',
              }}
              style={styles.uploadImage}
            />
            <Text style={styles.uploadText}>Add payment Screenshot</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity disabled={!payment} style={!payment?styles.signupButtonDisabled:styles.signupButton} onPress={handleSubmit}>
          <Text style={styles.signupButtonText}>Register</Text>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  signupButton: {
    backgroundColor: '#0074e4',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: 100,
  },
  signupButtonDisabled: {
    backgroundColor:'grey',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: 100,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  uploadButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  uploadButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  uploadText: {
    color: 'black',
  },
  header: {
    padding: '5%',
    display: 'flex',
    flexDirection: 'row',
  },
  adminButton: {
    backgroundColor: '#8FBFE8',
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
  },
  adminButtonText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  btn: {
    height: 74,
    width: 90,
    margin: 10,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '5%',
  },
  card: {
    width: 326,
    height: 215,
  },
  mainContainer: {
    backgroundColor: 'whire',
    flex: 1,
    // justifyContent: 'space-between',
    paddingBottom: '10%',
  },
  headerContainer: {
    paddingVertical: '2.5%',
    paddingHorizontal: '3.5%',
  },
  container: {
    alignItems:'center'
  },
  userName: {
    fontSize: 36,
    color: 'white',
    alignSelf: 'center',
  },
});

export default EventRegScreen;
