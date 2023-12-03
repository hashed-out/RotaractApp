import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const HeaderCard: React.FC = () => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={require('../assets/rl.png')}
        style={styles.logo}
      />
      <Text style={styles.appTitle}>ROTO CONNECT</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff', // Example background color, replace with your color
  },
  logo: {
    width: 150,
    height: 40,
    // Assuming the logo is a square, adjust as needed
    marginRight: 12,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#191d88', // Example text color, replace with your color
  },
});

export default HeaderCard;
