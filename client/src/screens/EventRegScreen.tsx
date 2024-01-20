import React, { useState } from 'react';
import { ScrollView, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import HeaderCard from '../components/HeaderCard';
import { URI } from '../../redux/URI';
import Clipboard from '@react-native-clipboard/clipboard';
function EventRegScreen({ route }: any) {
  const navigation = useNavigation<any>();
  const { users, user, isLoading, token } = useSelector((state: any) => state.user);

  const { item, postId } = route?.params;
  console.log(item?._id, 'id');

  const [payment, setPayment] = useState('');

  const cancelImageSelection = () => {
    setPayment('');
  };

  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 350,
      height: 800,
      cropping: true,
      compressImageQuality: 0.8,
      includeBase64: true,
    }).then((image: ImageOrVideo | null | any) => {
      if (image) {
        setPayment('data:image/jpeg;base64,' + image?.data);
      }
    });
  };

  const handleSubmit = async () => {
    let eventId = item?._id;
    let userId = user?._id;

    try {
      await axios.post(
        `${URI}/registerForEvent`,
        { eventId, userId, payment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ).then(() => {
        navigation.goBack();
        console.log('registered');
      });
    } catch (error) {
      console.error('Error registering event:', error);
    }
  };
  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderCard />
      <ScrollView contentContainerStyle={styles.mainContainer}>
        {/* <View style={styles.header}>
          <Text style={styles.title}>Event Registration</Text>
        </View> */}
        <Text style={styles.title}><Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/1068/1068969.png' }} style={styles.eicon} />  Event Registration</Text>
        <View style={styles.container}>
          <Text style={styles.etitle}>{item?.title}</Text>
          <View style={styles.fee}>
            <Text style={styles.feet}>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/7204/7204809.png' }} style={styles.icon} />{item.eventFee}</Text>
          </View>
          <View style={styles.paymentInfo}>
            <Text style={styles.title}>Account Details</Text>
  <Text style={styles.paymentInfoText}>
    <Text style={styles.paymentInfoLabel}>Bank Name:</Text> Canara Bank
    <TouchableOpacity onPress={() => copyToClipboard('Canara Bank')}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/128/60/60990.png' }}
        style={styles.copyIcon}
      />
    </TouchableOpacity>
  </Text>
  <Text style={styles.paymentInfoText}>
    <Text style={styles.paymentInfoLabel}>Branch Name:</Text> R T Nagar
    <TouchableOpacity onPress={() => copyToClipboard('R T Nagar')}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/128/60/60990.png' }}
        style={styles.copyIcon}
      />
    </TouchableOpacity>
  </Text>
  <Text style={styles.paymentInfoText}>
    <Text style={styles.paymentInfoLabel}>Account Number:</Text> 123431342134
    <TouchableOpacity onPress={() => copyToClipboard('123431342134')}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/128/60/60990.png' }}
        style={styles.copyIcon}
      />
    </TouchableOpacity>
  </Text>
  <Text style={styles.paymentInfoText}>
    <Text style={styles.paymentInfoLabel}>IFSC code:</Text> CNRB003235
    <TouchableOpacity onPress={() => copyToClipboard('CNRB003235')}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/128/60/60990.png' }}
        style={styles.copyIcon}
      />
    </TouchableOpacity>
  </Text>
</View>
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
            <View style={styles.uploadButtonContainer}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/12561/12561540.png',
                }}
                style={styles.uploadImage}
              />
              <Text style={styles.uploadText}>Add Payment Screenshot of Rs.{item.eventFee}/-</Text>
            </View>
          </TouchableOpacity>
          {payment && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: payment }} style={styles.image} />
            </View>
          )}
          <TouchableOpacity
            disabled={!payment}
            style={!payment ? styles.signupButtonDisabled : styles.signupButton}
            onPress={handleSubmit}>
            <Text style={styles.signupButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    alignSelf:'center',
    borderBottomColor:'#000',
    borderBottomWidth:2,
    marginBottom:10,
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5,
    padding:5,
  },
  uButton: {
    width: 40,
    height: 40,
  },
  etitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    // marginBottom: 12,
    textAlign: 'justify',
    alignSelf:'flex-start',
    paddingStart:15,
  },
  signupButton: {
    backgroundColor: '#0074e4',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: 100,
  },
  signupButtonDisabled: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: 100,
  },
  fee: {
    // paddingTop: 8,
    flexDirection: 'row',
  },
  feet: {
    textAlignVertical: 'center',
    fontWeight: 'bold',
    color: 'green',
    fontSize: 25,
  },
  icon: {
    width: 35,
    height: 35,
    marginRight: 4,
    tintColor:'green',
  },
  eicon: {
    height:30,
    width:30,
    marginRight: 4,
    alignSelf:'center',
    marginTop:6,
    
  },
  signupButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  paymentInfo: {
  alignItems: 'flex-start',
  borderWidth: 2,
  borderColor: '#000', // Set a color that matches your theme
  borderRadius: 10, // Add some border radius for a smoother look
  padding: 20,
  marginVertical: 20,
  backgroundColor: '#f2f2f2', // Set a background color
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  },
  uploadButton: {
    // marginTop: 20,
    alignItems: 'center',
  },
  uploadButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  uploadText: {
    color: 'black',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    paddingTop:10,
  },
  paymentDetails: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0074e4', // Set a color that matches your theme
    borderRadius: 10, // Add some border radius for a smoother look
    padding: 20,
    marginVertical: 20,
    backgroundColor: '#f2f2f2', // Set a background color
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  paymentInfoText: {
    paddingLeft: 10,
    fontSize: 18,
    color: '#333',
    marginVertical: 5,
  },
  paymentInfoLabel: {
    fontWeight: 'bold',
  },
  copyIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
    // tintColor: '#0074e4', // Set a color that matches your theme
  },
  mainContainer: {
    flexGrow: 1,
    paddingBottom: '10%',
  },
  imageContainer: {
    margin: 8,
    position: 'relative', // Ensure the cancel icon is positioned relative to this container
  },
  image: {
    width: 70,
    height: 160,
    zIndex: 1,
  },

});

export default EventRegScreen;
