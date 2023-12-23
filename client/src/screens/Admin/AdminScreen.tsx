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
    {name: 'Create Clubs', link: 'createClubs'},
    {name: 'Manage Clubs', link: 'clubs'},
    {name: 'Create Designation', link: 'createDesignation'},
    {name: 'Manage Designation', link: 'designation'},
    {name: 'Add User as Regional Leader', link: 'regional'},
    {name: 'Add User as District Governer', link: 'district'},
    {name: 'Add User as Indian leader', link: 'indian'},
    {name: 'Add User as Admin', link: 'admin'},
    {name: 'Remove User', link: 'RemoveUser'},
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <HeaderCard />
      <View style={[styles.btnContainer]}>
        {Btns.map((item, index) => {
          return (
            // <View
            //   style={{
            //     alignSelf: 'center',
            //     width: '100%',
            //     paddingHorizontal: '10%',
            //   }}>
            //   <TouchableOpacity
            //     style={styles.adminButton}
            //     onPress={() => {
            //       if (item?.link === 'RemoveUser') {
            //         navigation.navigate('AllUser', {
            //           fromRemoveUser: true,
            //           fromAddRegLead: false,
            //           fromAddDistGov: false,
            //           fromAddIndLead: false,
            //           fromAddAdmin: false,
            //         });
            //       } else if (item?.link === 'regional') {
            //         navigation.navigate('AllUser', {
            //           fromRemoveUser: false,
            //           fromAddRegLead: true,
            //           fromAddDistGov: false,
            //           fromAddIndLead: false,
            //           fromAddAdmin: false,
            //         });
            //       } else if (item?.link === 'district') {
            //         navigation.navigate('AllUser', {
            //           fromRemoveUser: false,
            //           fromAddRegLead: false,
            //           fromAddDistGov: true,
            //           fromAddIndLead: false,
            //           fromAddAdmin: false,
            //         });
            //       } else if (item?.link === 'indian') {
            //         navigation.navigate('AllUser', {
            //           fromRemoveUser: false,
            //           fromAddRegLead: false,
            //           fromAddDistGov: false,
            //           fromAddIndLead: true,
            //           fromAddAdmin: false,
            //         });
            //       }
            //       else if (item?.link === 'clubs') {
            //         navigation.navigate('ManageClubs');
            //       }else if (item?.link === 'designation') {
            //         navigation.navigate('ManageDesgn');
            //       }
            //       else if (item?.link === 'createClubs') {
            //         navigation.navigate('createClubs');
            //       }else if (item?.link === 'createDesignation') {
            //         navigation.navigate('createDesignation');
            //       }
            //     }}>
            //     <Text style={styles.adminButtonText}>{item?.name}</Text>
            //   </TouchableOpacity>
            // </View>
              <TouchableOpacity
                style={styles.adminButton}
                onPress={() => {
                  if (item?.link === 'RemoveUser') {
                    navigation.navigate('AllUser', {
                      fromRemoveUser: true,
                      fromAddRegLead: false,
                      fromAddDistGov: false,
                      fromAddIndLead: false,
                      fromAddAdmin: false,
                    });
                  } else if (item?.link === 'regional') {
                    navigation.navigate('AllUser', {
                      fromRemoveUser: false,
                      fromAddRegLead: true,
                      fromAddDistGov: false,
                      fromAddIndLead: false,
                      fromAddAdmin: false,
                    });
                  } else if (item?.link === 'district') {
                    navigation.navigate('AllUser', {
                      fromRemoveUser: false,
                      fromAddRegLead: false,
                      fromAddDistGov: true,
                      fromAddIndLead: false,
                      fromAddAdmin: false,
                    });
                  } else if (item?.link === 'indian') {
                    navigation.navigate('AllUser', {
                      fromRemoveUser: false,
                      fromAddRegLead: false,
                      fromAddDistGov: false,
                      fromAddIndLead: true,
                      fromAddAdmin: false,
                    });
                  } else if (item?.link === 'clubs') {
                    navigation.navigate('ManageClubs');
                  } else if (item?.link === 'designation') {
                    navigation.navigate('ManageDesgn');
                  } else if (item?.link === 'createClubs') {
                    navigation.navigate('createClubs');
                  } else if (item?.link === 'createDesignation') {
                    navigation.navigate('createDesignation');
                  }
                  else if (item?.link === 'admin') {
                    navigation.navigate('AllUser', {
                      fromRemoveUser: false,
                      fromAddRegLead: false,
                      fromAddDistGov: false,
                      fromAddIndLead: false,
                      fromAddAdmin: true,
                    });
                  }
                }}>
                <Text style={styles.adminButtonText}>{item?.name}</Text>
              </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '5%',
  },
  adminButton: {
    backgroundColor: '#8FBFE8',
    borderRadius: 5,
    marginTop: 20,
    height: 74,
    width: 150,
    margin: 10,
    alignItems:'center',
    justifyContent:'center'
    // width: '100%',
  },
  adminButtonText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
});
export default AdminScreen;
