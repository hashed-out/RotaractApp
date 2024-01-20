import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Platform,
  Image,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

import { loadUser, loginUser } from '../../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  navigation: any;
};

const LoginScreen = ({ navigation }: Props) => {
  const { error, isAuthenticated } = useSelector((state: any) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const submitHandler = () => {
    loginUser(email, password)(dispatch);
  };

  useEffect(() => {
    if (error) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Email and password not matching!', ToastAndroid.LONG);
      } else {
        Alert.alert('Email and password not matching');
      }
    }
    if (isAuthenticated) {
      loadUser()(dispatch);
      if (Platform.OS === 'android') {
        ToastAndroid.show('Login successful!', ToastAndroid.LONG);
      } else {
        Alert.alert('Login successful!');
      }
    }
  }, [isAuthenticated, error]);

  return (
    <LinearGradient
      colors={['#8FBFE8', '#0074e4']}
      style={styles.container}
    >
      <Animatable.View
        animation="fadeInDown"
        duration={1500}
        style={styles.logoContainer}
      >
        <Image
          style={styles.logo}
          source={require('../assets/rl.png')}
        />
      </Animatable.View>
      <Animatable.View
        animation="fadeInUp"
        duration={1500}
        style={styles.formContainer}
      >
        <Text style={styles.welcomeText}>Welcome Back Rotarian!!</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          placeholderTextColor="#000"
          onChangeText={(text) => setEmail(text)}
          keyboardType='email-address'
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          placeholderTextColor="#000"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={submitHandler}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={{ paddingTop: 10, color: 'black', textAlign: 'center' }}>
          Don't have an account? <Text style={{ fontWeight: 'bold', color: 'blue' }}>Sign up</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('RecoverPassword')}>
        <Text style={{ paddingTop: 4, color: 'black', textAlign: 'center', textDecorationLine: 'underline' }}>
          Forgot Password
        </Text>
      </TouchableOpacity>
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
    height: 250,
    width: 300,
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
  },
  
  
  formContainer: {
    flex: 1,
    alignItems: 'center',
    width: '80%',
    padding: 20,
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
  loginButton: {
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
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default LoginScreen;
