import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, registerUser } from '../../redux/actions/userAction';

type Props = {
  navigation: any;
};

const SignupScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector((state: any) => state.user);

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

  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.8,
      includeBase64: true,
    }).then((image: ImageOrVideo | null) => {
      if (image) {
        setAvatar('data:image/jpeg;base64,' + image.data);
      }
    });
  };
  console.log(avatar)

  const submitHandler = () => {
    if (name === '' || email === '') {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Please fill all fields and upload an avatar', ToastAndroid.LONG);
      } else {
        Alert.alert('Please fill all fields and upload an avatar');
      }
    } else {
      registerUser(name, email, password, avatar)(dispatch);
    }
  };

  return (
    <LinearGradient colors={['#fff', '#0074e4']} style={styles.container}>
      <Animatable.View animation="fadeInDown" duration={1500} style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/rl.png')} />
      </Animatable.View>
      <Animatable.View animation="fadeInUp" duration={1500} style={styles.formContainer}>
        <Text style={styles.welcomeText}>Sign Up</Text>
        <TextInput
          placeholder="Enter your name"
          value={name}
          onChangeText={(text) => setName(text)}
          placeholderTextColor="#000"
          style={styles.input}
        />
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor="#000"
          style={styles.input}
        />
        <TextInput
          placeholder="Enter your password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          placeholderTextColor="#000"
          style={styles.input}
        />
        <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
          <View style={styles.uploadButtonContainer}>
            <Image
              source={{ uri: avatar ? avatar : 'https://cdn-icons-png.flaticon.com/128/568/568717.png' }}
              style={styles.uploadImage}
            />
            <Text style={styles.uploadText}>Upload Image</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupButton} onPress={submitHandler}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={{ paddingTop: 3, color: 'black' }} onPress={() => navigation.navigate('Login')}>
          Already have an account? <Text>Sign in</Text>
        </Text>
      </Animatable.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 60,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    width: '80%',
    padding: 20,
  },
  logo: {
    width: 470,
    height: 100,
    paddingLeft: 20,
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
