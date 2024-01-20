import React from 'react';
import {Alert, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const DeletePopUp = ({
  modalVisible,
  setModalVisible,
  handleYes,
  handleNo
}: any) => {

  return (
    <View style={Styles.centeredView}>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={Styles.modalBackGround}>
          <View style={Styles.modalView}>
            <View style={{display:'flex',alignItems:'center'}}>
              <Text style={{fontSize:20,fontWeight:'500',color:'black'}}>
              Are you Sure?
              </Text>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <TouchableOpacity
            style={[Styles.nsignupButton]}
            onPress={handleNo}>
            <Text style={[Styles.signupButtonText]}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[Styles.signupButton,{marginLeft:'1.5%'}]}
            onPress={handleYes}>
            <Text style={[Styles.signupButtonText]}>Yes</Text>
          </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Styles = StyleSheet.create({
    signupButtonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
      },
    signupButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: 100,
      },
      nsignupButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: 100,
      },
  btn: {
    borderColor: '#D9D9D9',
    borderWidth: 1,
    width:'49%',
    marginHorizontal:'1.25%'
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    paddingHorizontal:'5%',
    paddingTop:30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default DeletePopUp;