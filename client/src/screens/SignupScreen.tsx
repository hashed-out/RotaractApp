import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Image,
  Platform,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {loadUser, registerUser} from '../../redux/actions/userAction';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import {URI} from '../../redux/URI';

type Props = {
  navigation: any;
};

const SignupScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rotId, setRotId] = useState('');
  const [clubName, setClubName] = useState('');
  const [designation, setDesignation] = useState('');
  const [clubId, setClubId] = useState('');
  const [clubs, setClubs] = useState([]);
  const [desgns, setDesgns] = useState([]);
  const [avatar, setAvatar] = useState('');
  const dispatch = useDispatch();
  const {error, isAuthenticated} = useSelector((state: any) => state.user);

  // clubName,
  // clubId,
  // designation,

  useEffect(() => {
    if (error) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(error, ToastAndroid.LONG);
      } else {
        Alert.alert(error);
      }
    }
    if (isAuthenticated) {
      loadUser()(dispatch);
    }
  }, [error, isAuthenticated]);

  useEffect(() => {
    try {
      axios.get(`${URI}/getAllClubs`).then((res: any) => {
        console.log(res?.data?.club, 'details');
        setClubs(res?.data?.club);
      });
      dispatch;
    } catch (error) {
      console.error('Error getting clubs:', error);
    }
    try {
      axios.get(`${URI}/getAllDesignation`).then((res: any) => {
        console.log(res?.data?.designation, 'details');
        setDesgns(res?.data?.designation);
      });
      dispatch;
    } catch (error) {
      console.error('Error getting desgn:', error);
    }
  }, []);

  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.8,
      includeBase64: true,
    }).then((image: ImageOrVideo | null | any) => {
      if (image) {
        setAvatar('data:image/jpeg;base64,' + image.data);
      }
    });
  };
  console.log(avatar);

  const submitHandler = () => {
    if (name === '' || email === '') {
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          'Please fill all fields and upload an avatar',
          ToastAndroid.LONG,
        );
      } else {
        Alert.alert('Please fill all fields and upload an avatar');
      }
    } else {
      // registerUser(name, email, password, avatar,)(dispatch);
      registerUser(
        name,
        contactNumber,
        email,
        clubName,
        clubId,
        designation,
        password,
        avatar,
      )(dispatch);
    }
  };

  return (
    <LinearGradient colors={['#fff', '#0074e4']} style={styles.container}>
      <Animatable.View
        animation="fadeInDown"
        duration={1500}
        style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/rl.png')} />
      </Animatable.View>
      <Animatable.View
        animation="fadeInUp"
        duration={1500}
        style={styles.formContainer}>
        <Text style={styles.welcomeText}>Sign Up</Text>
        <TextInput
          placeholder="Enter your name"
          value={name}
          onChangeText={text => setName(text)}
          placeholderTextColor="#000"
          style={styles.input}
        />
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={text => setEmail(text)}
          placeholderTextColor="#000"
          style={styles.input}
        />
        <TextInput
          placeholder="Enter your password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          placeholderTextColor="#000"
          style={styles.input}
        />
        <TextInput
          placeholder="Enter your Rotaract ID"
          value={rotId}
          onChangeText={text => setRotId(text)}
          secureTextEntry
          placeholderTextColor="#000"
          style={styles.input}
        />
         <TextInput
         keyboardType='numeric'
          placeholder="Enter your Contact Number"
          value={contactNumber}
          onChangeText={text => setContactNumber(text)}
          secureTextEntry
          placeholderTextColor="#000"
          style={styles.input}
        />
        <Dropdown
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          placeholderStyle={styles.placeholderStyle}
          style={styles.dropdown}
          data={clubs}
          value={clubName}
          onChange={(item: any) => {
            setClubName(item.clubName);
            setClubId(item?._id);
          }}
          placeholder="Select Club Name"
          labelField={'clubName'}
          valueField={'clubName'}
        />
        <Dropdown
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          placeholderStyle={styles.placeholderStyle}
          style={styles.dropdown}
          data={desgns}
          value={designation}
          onChange={(item: any) => {
            setClubName(item.designationName);
          }}
          placeholder="Select Designation"
          labelField={'designationName'}
          valueField={'designationName'}
        />
        <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
          <View style={styles.uploadButtonContainer}>
            <Image
              source={{
                uri: avatar
                  ? avatar
                  : 'https://cdn-icons-png.flaticon.com/128/9970/9970571.png',
              }}
              style={styles.uploadImage}
            />
            <Text style={styles.uploadText}>Upload Profile Picture</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupButton} onPress={submitHandler}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text
          style={{paddingTop: 3, color: 'black'}}
          onPress={() => navigation.navigate('Login')}>
          Already have an account? <Text>Sign in</Text>
        </Text>
      </Animatable.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  selectedTextStyle: {
    color: '#000',
    fontSize: 14,
  },
  dropdown: {
    width: '100%',
    margin: 8,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    color: '#000',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -20,
    marginBottom: 20, // Add margin bottom to create some space between logo and form
  },
  logo: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
  },
  formContainer: {
    alignItems: 'center',
    width: '80%',
    padding: 20,
    alignSelf: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    color: '#000',
  },
  placeholderStyle: {
    color: '#000',
  },
  iconStyle: {
    tintColor: '#000',
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
  signupButton: {
    backgroundColor: '#0074e4',
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
});

export default SignupScreen;
