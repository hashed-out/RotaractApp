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
      colors={['#fff', '#0074e4']}
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
        <Text
          style={{ paddingTop: 3, color: 'black'}}
          onPress={() => navigation.navigate('Signup')}
        >
          Don't have any account? <Text>Sign up</Text>
        </Text>
        <Text
          style={{ paddingTop: 3, color: 'black' }}
          onPress={() => navigation.navigate('RecoverPassword')}
        >
          Forgot Password
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
    height:50,
    width:300,
    flex: 1,
    justifyContent: 'center',
    
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    width: '80%',
    padding: 20,
  },
  logo: {
    width: 270,
    height: 40,
    paddingLeft:20,
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
    borderRadius: 5,
    marginTop: 20,
    width:100,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default LoginScreen;
