import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Image,
  Platform,
  StyleSheet,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, registerUser } from '../../redux/actions/userAction';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { URI } from '../../redux/URI';
import { TextInput as PaperTextInput } from 'react-native-paper';

type Props = {
  navigation: any;
};

const SignupScreen = ({ navigation }: Props) => {
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
  const { error, isAuthenticated } = useSelector((state: any) => state.user);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showWarnings, setShowWarnings] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

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
    } catch (error) {
      console.error('Error getting clubs:', error);
    }

    try {
      axios.get(`${URI}/getAllDesignation`).then((res: any) => {
        console.log(res?.data?.designation, 'details');
        setDesgns(res?.data?.designation);
      });
    } catch (error) {
      console.error('Error getting desgn:', error);
    }
  }, []);

  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
    }).then((image: ImageOrVideo | null | any) => {
      if (image) {
        setAvatar('data:image/jpeg;base64,' + image.data);
      }
    });
  };

  const validateName = (name: string) => {
    if (!name || name.length < 3 || name.length > 20) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Invalid name. Please enter a name between 3 and 20 characters.', ToastAndroid.LONG);
      } else {
        Alert.alert('Invalid name', 'Please enter a name between 3 and 20 characters.');
      }
      return false;
    }
    return true;
  };

  const validateEmail = (email: string) => {
    // You can use a regex for a basic email validation
    // This is just a simple example, you might want to use a more robust solution
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Invalid email address. Please enter a valid email.', ToastAndroid.LONG);
      } else {
        Alert.alert('Invalid email address', 'Please enter a valid email.');
      }
      return false;
    }
    return true;
  };

  const validateContactNumber = (contactNumber: string) => {
    if (!contactNumber || contactNumber.length !== 10) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Invalid contact number. Please enter a 10-digit number.', ToastAndroid.LONG);
      } else {
        Alert.alert('Invalid contact number', 'Please enter a 10-digit number.');
      }
      return false;
    }
    return true;
  };

  const validatePassword = (password: string) => {
    // Password must be at least 6 characters, maximum 12, with a mix of uppercase, lowercase, numbers, and special characters
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;
  
    if (!passwordRegex.test(password)) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          'Invalid password. Password must be 6 to 12 characters with a mix of uppercase, lowercase, numbers, and special characters.',
          ToastAndroid.LONG
        );
      } else {
        Alert.alert(
          'Invalid password',
          'Password must be 6 to 12 characters with a mix of uppercase, lowercase, numbers, and special characters.'
        );
      }
      return false;
    }
    return true;
  };
  

  const submitHandler = () => {
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isContactNumberValid = validateContactNumber(contactNumber);
    const isPasswordValid = validatePassword(password);

    // Additional validations for other fields if needed

    if (!isNameValid || !isEmailValid || !isContactNumberValid || !isPasswordValid || !avatar) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Please fill all fields and upload an avatar', ToastAndroid.LONG);
      } else {
        Alert.alert('Please fill all fields and upload an avatar');
      }
      setShowWarnings(true);
    } else {
      registerUser(name, contactNumber, email, clubName, clubId, designation, password, avatar)(dispatch);
    }
  };

  return (
    <LinearGradient colors={['#8FBFE8', '#0074e4']} style={styles.container}>
      <Animatable.View animation="fadeInDown" duration={1500} style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/rl.png')} />
      </Animatable.View>
      <Animatable.View animation="fadeInUp" duration={1500} style={styles.formContainer}>
        <Text style={styles.welcomeText}>Registration Form</Text>
        <PaperTextInput
          placeholder="Enter your name"
          value={name}
          onChangeText={text => setName(text)}
          mode='flat'
          placeholderTextColor="#fff"
          underlineColor='black'
          activeUnderlineColor='white'
          style={styles.input}
          maxLength={20}
        />
        <PaperTextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={text => setEmail(text)}
          mode='flat'
          placeholderTextColor="#fff"
          underlineColor='black'
          activeUnderlineColor='white'
          style={styles.input}
          keyboardType='email-address'
        />
        <PaperTextInput
          keyboardType="numeric"
          placeholder="Enter your Contact Number"
          value={contactNumber}
          onChangeText={text => setContactNumber(text)}
          mode='flat'
          placeholderTextColor="#fff"
          underlineColor='black'
          activeUnderlineColor='white'
          style={styles.input}
        />
        <PaperTextInput
          placeholder="Enter your Rotaract ID"
          value={rotId}
          onChangeText={text => setRotId(text)}
          mode='flat'
          placeholderTextColor="#fff"
          underlineColor='black'
          activeUnderlineColor='white'
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
            setDesignation(item.designationName);
          }}
          placeholder="Select Designation"
          labelField={'designationName'}
          valueField={'designationName'}
        />
        <View style={styles.pcontainer}>
          <PaperTextInput
            placeholder="Create password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={!isPasswordVisible}
            mode='flat'
            placeholderTextColor="#fff"
            underlineColor='black'
            activeUnderlineColor='white'
            style={styles.pinput}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image
              source={
                isPasswordVisible
                  ? { uri: 'https://cdn-icons-png.flaticon.com/128/2767/2767146.png' }
                  : { uri: 'https://cdn-icons-png.flaticon.com/128/709/709612.png' }
              }
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
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
        <Text style={{ paddingTop: 3, color: 'black', fontSize: 16 }} onPress={() => navigation.navigate('Login')}>
          Already have an account? <Text style={{ fontSize: 18, color: '#fff' }}>Login...</Text>
        </Text>
      </Animatable.View>
      {/* Modal for showing warnings */}
      {showWarnings && (
        <Modal animationType="slide" transparent={true} visible={showWarnings}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Validation Warnings</Text>
              <Text style={styles.modalText}>Please check the warnings and correct the information.</Text>
              {/* Add more specific warning messages if needed */}
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowWarnings(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  // ... (previous styles remain unchanged)
  selectedTextStyle: {
    color: '#000',
    fontSize: 16,
  },
  dropdown: {
    width: '105%',
    margin: 8,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    color: '#fff',
    borderRadius: 8, // Add border radius for rounded corners
    backgroundColor: 'transparent', // Make background transparent
    paddingHorizontal: 12, // Add horizontal padding
    justifyContent: 'center', // Center text vertically
  },
  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 40,
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
    fontSize:16,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  placeholderStyle: {
    color: '#fff',
  },
  iconStyle: {
    tintColor: '#000',
  },
  uploadButton: {
    marginTop: 10,
    marginBottom:10,
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
    color: '#fff',
  },
  signupButton: {
    backgroundColor: '#0074e4',
    padding: 10,
    borderRadius: 20, // Increase border radius for a rounded look
    marginTop: 10,
    marginBottom: 10,
    width: 150, // Adjust width for a more spacious button
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2, // Add a black border
    borderColor: '#fff', // Set the border color to black
  },
  
  signupButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  pcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pinput: {
    flex: 1,
    marginRight: 8,
    marginVertical: 10,
    backgroundColor: 'transparent',
    fontSize:16,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#0074e4',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SignupScreen;
