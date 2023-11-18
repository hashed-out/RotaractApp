import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ToastAndroid,
    Platform,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {loadUser, loginUser, sendRecoverPasswordEmail} from '../../redux/actions/userAction';
  import {useDispatch, useSelector} from 'react-redux';
  
  type Props = {
    navigation: any;
  };
  
  const RecoverPasswordScreen = ({navigation}: Props) => {
    const [email, setEmail] = useState('');
    const [otp,setOtp]=useState('')
    const dispatch = useDispatch();
    const {error, isAuthenticated} = useSelector((state: any) => state.user);
    const [showOtpField,setShowOtpField]=useState(false)

    const validateOTP = async ()=>{
        const status = await sendRecoverPasswordEmail(email)(dispatch);
    }

    const sendRecoveryEmail =async ()=>{
        const status = await sendRecoverPasswordEmail(email)(dispatch);
        if(status){
            if (Platform.OS === 'android') {
                ToastAndroid.show(
                  `Email containing the recovery code is sent to ${email}`,
                  ToastAndroid.LONG,
                );
              } else {
                Alert.alert(`Email containing the recovery code is sent to ${email}`);
              }
              setShowOtpField(true)
        }else{
            if (Platform.OS === 'android') {
                ToastAndroid.show(
                  'Failed to send the OTP',
                  ToastAndroid.LONG,
                );
              } else {
                Alert.alert('Failed to send the OTP');
              }
              setShowOtpField(false)
        }
        
        
    }
  
    useEffect(() => {
      if (error) {
        if (Platform.OS === 'android') {
          ToastAndroid.show(
            'Email and password not matching!',
            ToastAndroid.LONG,
          );
        } else {
          Alert.alert('Email and password not matching!');
        }
      }
      if (isAuthenticated) {
        loadUser()(dispatch);
        if (Platform.OS === 'android') {
        ToastAndroid.show('Login successful!', ToastAndroid.LONG);
        } else{
          Alert.alert('Login successful!');
        }
      }
    }, [isAuthenticated, error]);
  
    return (
      <View className="flex-[1] items-center justify-center">
        <View className="w-[70%]">
          <Text className="text-[25px] font-[600] text-center text-black">
            Recover Your Password
          </Text>
          <TextInput
            placeholder="Enter your email"
            value={email}
            placeholderTextColor={'#000'}
            onChangeText={text => setEmail(text)}
            className="w-full h-[35px] border border-[#00000072] px-2 my-2 text-black"
          />
          {
            showOtpField && (
                <TextInput
            placeholder="Enter 6 digit OTP"
            value={otp}
            placeholderTextColor={'#000'}
            onChangeText={text => setEmail(text)}
            className="w-full h-[35px] border border-[#00000072] px-2 my-2 text-black"
          />
            )
          }
          {
            showOtpField ? (<TouchableOpacity className="mt-6">
            <Text
              className="w-full text-[#fff] text-center pt-[8px] text-[20px] h-[40px] bg-black"
              onPress={validateOTP}>
              Validate OTP
            </Text>
          </TouchableOpacity>) :(
            <TouchableOpacity className="mt-6">
            <Text
              className="w-full text-[#fff] text-center pt-[8px] text-[20px] h-[40px] bg-black"
              onPress={sendRecoveryEmail}>
              Send Recovery Code
            </Text>
          </TouchableOpacity>
          )
          }
        </View>
      </View>
    );
  };
  
  export default RecoverPasswordScreen;