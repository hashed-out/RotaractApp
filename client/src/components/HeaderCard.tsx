import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HeaderCard: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backIconContainer}
      >
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/545/545680.png',
          }}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/rlw.png')}
          style={styles.logo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Center the content horizontally with space between
    padding: 8,
    width: '100%',
    backgroundColor: '#3A6CBD', // Light Blue background color
    borderBottomLeftRadius: 20, // Unique shape design
    borderBottomRightRadius: 20, // Unique shape design
    borderWidth: 2, // Navy Blue border
    borderColor: '#17458F', // Navy Blue border color
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center', // Center the content vertically
  },
  logo: {
    width: 200,
    height: 50,
    alignSelf: 'center', // Center the image within its container
    resizeMode: 'contain', // Ensure the logo is fully visible within the specified dimensions
  },
  backIconContainer: {
    position: 'absolute',
    top: 20,
    left: 16,
    zIndex: 1,
  },
  backIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff', // Navy Blue color for the back icon
  },
});

export default HeaderCard;
