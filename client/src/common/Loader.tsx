import React from 'react';
import { Center, NativeBaseProvider, Spinner } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { StyleSheet, Image } from 'react-native';

type Props = {};

const Loader = (props: Props) => {
  return (
    <LinearGradient style={styles.container} colors={['#fff', '#0074e4']}>
      <Animatable.View
        animation="fadeInDown"
        duration={1500}
        style={styles.logoContainer}
      >
        <Image
          style={styles.logo}
          source={require('../assets/rl.png')}
        />
        <Spinner size="lg" color="black" />
      </Animatable.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode:'cover',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
  },
});

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3" backgroundColor={'#fff'}>
        <Loader />
      </Center>
    </NativeBaseProvider>
  );
};
