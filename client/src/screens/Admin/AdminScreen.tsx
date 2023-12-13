import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderCard from '../../components/HeaderCard';

function AdminScreen() {
  const navigation = useNavigation<any>();

  const Btns = [
    {name: 'Remove User', link: 'RemoveUser'},
    {name: 'Add User as Regional Leader', link: 'AddUser'},
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <HeaderCard />
      <View>
        {Btns.map((item, index) => {
          return (
            <View
              style={{
                alignSelf: 'center',
                width: '100%',
                paddingHorizontal: '10%',
              }}>
              <TouchableOpacity
                style={styles.adminButton}
                onPress={() => {
                  if (item?.link === 'RemoveUser') {
                    navigation.navigate('Search', {
                      fromRemoveUser: true,
                      fromAddRegLead: false,
                    });
                  } else {
                    navigation.navigate('Search', {
                      fromRemoveUser: false,
                      fromAddRegLead: true,
                    });
                  }
                }}>
                <Text style={styles.adminButtonText}>{item?.name}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  adminButton: {
    backgroundColor: '#8FBFE8',
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
  },
  adminButtonText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
});
export default AdminScreen;
