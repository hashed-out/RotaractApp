import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { Switch } from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {createPostAction, getAllPosts} from '../../redux/actions/postAction';
import DatePicker from 'react-native-date-picker';
import { Button } from '@rneui/base';
import DefaultAvatar from '../assets/user-avatar.png';
import { Center } from 'native-base';
import HeaderCard from '../components/HeaderCard';
import {TextInput as PaperTextInput} from 'react-native-paper';
import { blueA200 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
type Props = {
  navigation: any;
};

const PostScreen = ({navigation}: Props) => {
  const {user} = useSelector((state: any) => state.user);
  const {isSuccess, isLoading} = useSelector((state: any) => state.post);
  const [isSuccessFlag, setIsSuccessFlag] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [active, setActive] = useState(false);
  const [eventDate, seteventDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [eventVenue,seteventVenue] = useState('');
  const [eventFee,seteventFee] = useState(0);
  const [isEvent, setIsEvent] = useState(false);


  useEffect(() => {
    if (isSuccessFlag) {
      // Check if the navigation is intended and if there are actually posts to fetch
      if (navigation.isFocused()) {
        // If the post is successfully created and the screen is focused, navigate back to the previous screen
        navigation.goBack();
        // Fetch all posts again (assuming getAllPosts() is fetching posts)
        getAllPosts()(dispatch);
      }
    }
  
    // Clear the input fields after successful post creation or in any other case as needed
    setReplies([]);
    setTitle('');
    setImage('');
    setIsSuccessFlag(false);
    setIsEvent(false);
    seteventVenue('');
    seteventDate(new Date());
    seteventFee(0);
  }, [isSuccessFlag, navigation, dispatch, getAllPosts]);
  

  const [replies, setReplies] = useState([
    {
      title: '',
      image: '',
      user,
    },
  ]);

  const handleTitleChange = (index: number, text: string) => {
    setReplies(prevPost => {
      const updatedPost = [...prevPost];
      updatedPost[index] = {...updatedPost[index], title: text};
      return updatedPost;
    });
  };

  const uploadImage = (index: number) => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.9,
      includeBase64: true,
    }).then((image: ImageOrVideo | null) => {
      if (image) {
        setReplies(prevPost => {
          const updatedPost = [...prevPost];
          updatedPost[index] = {
            ...updatedPost[index],
            image: 'data:image/jpeg;base64,' + image?.data,
          };
          return updatedPost;
        });
      }
    });
  };

  const postImageUpload = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.8,
      includeBase64: true,
    }).then((image: ImageOrVideo | null) => {
      if (image) {
        setImage('data:image/jpeg;base64,' + image.data);
      }
    });
  };
  const cancelImageSelection = () => {
    setImage('');
  };
  const createPost = () => {
    if (title !== '' || (image !== '' && !isLoading)) {
      // Set isSuccessFlag to true only after a successful post creation
      createPostAction(title, image, user, replies, isEvent, eventVenue, eventDate,eventFee)(dispatch)
        .then(() => setIsSuccessFlag(true))
        .catch((error) => {
          // Handle error if needed
          console.error('Error creating post:', error);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderCard />
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Post/Event</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.userSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={user.avatar?.url ? { uri: user.avatar?.url } : DefaultAvatar}
                style={styles.avatar}
              />
            <Text style={styles.userName}>{user?.name}</Text>
            </View>
            <View style={styles.userInfo}>
            
              <PaperTextInput
              
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={styles.titleInput}
                outlineStyle={{ borderWidth:2 }}
                multiline={true}
                maxLength={200}
                mode="outlined"
                outlineColor='black'
                activeOutlineColor='green'
                label={'Title'}
              />
              

              <View style={styles.eventSwitchContainer}>
                <Text style={styles.eventSwitchText}>Event Post?</Text>
                <Switch
                  trackColor={{ false: 'red', true: 'green' }}
                  thumbColor={isEvent ? 'green' : 'red'}
                  value={isEvent}
                  onValueChange={(value) => setIsEvent(value)}
                />
                <Text style={isEvent ? styles.yesText : styles.noText}>
                  {isEvent ? 'Yes' : 'No'}
                </Text>
              </View>
              {/* <View>
      <TextInput
        placeholder="Title....."
        placeholderTextColor="#000"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={[styles.titleInput, { height: calculateHeight() }]}
        multiline={true}
        numberOfLines={4}
      />
    </View> */}

              {isEvent && (
                <>
                <View style={{ position: 'relative', width: '80%' }}>
      <PaperTextInput
        // placeholder="Venue"
        // placeholderTextColor="#333"
        label={'Event Venue'}
        value={eventVenue}
        onChangeText={(text) => seteventVenue(text)}
        mode="outlined"
        outlineColor='black'
        activeOutlineColor='green'
        multiline={true}
        maxLength={60}
        outlineStyle={{ borderWidth:2 }}
        style={{ backgroundColor: '#fff', width: '110%',paddingLeft: 40,}}
      />
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/128/6003/6003704.png',
        }}
        style={{ position: 'absolute', left: 10, top: '50%', transform: [{ translateY: -12 }],width: 28, height: 28 }}
      />
    </View>
                  <>
                    <TouchableOpacity onPress={() => setOpen(true)}>
                      <View style={styles.datePickerContainer}>
                        <Image
                          source={{
                            uri: 'https://cdn-icons-png.flaticon.com/128/439/439296.png',
                          }}
                          style={styles.icon}
                        />
                       <Text style={styles.datePickerText}>
  {`${eventDate.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
  })} `} at 
  {` ${eventDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })}`}
</Text>

                  </View>
                    </TouchableOpacity>

                    <DatePicker
                      modal
                      open={open}
                      date={eventDate}
                      onConfirm={(date) => {
                        setOpen(false);
                        seteventDate(date);
                      }}
                      onCancel={() => {
                        setOpen(false);
                      }}
                      theme="dark"
                      minimumDate={new Date()}
                    />
                   <View style={{ position: 'relative', width: '30%' }}>
      <PaperTextInput
        label={'Fee'}
        value={eventFee.toString()}  
        onChangeText={(input) => {
          const numericValue = parseFloat(input);  
          if (!isNaN(numericValue)) {
            seteventFee(numericValue); 
          }
        }}
        mode="outlined"
        outlineColor='black'
        activeOutlineColor='green'
        maxLength={5}
        keyboardType='numeric'
        outlineStyle={{ borderWidth:2 }}
        style={{ backgroundColor: '#fff', width: '110%',paddingLeft: 40,}}
      />
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/128/7204/7204809.png',
        }}
        style={{ position: 'absolute', left: 10, top: '50%', transform: [{ translateY: -12 }],width: 28, height: 28 }}
      />
    </View>
                  </>
                </>
              )}
              <TouchableOpacity
                style={styles.imageUploadButton}
                onPress={postImageUpload}
              >
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/12561/12561540.png',
                  }}
                  style={styles.imageUploadIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
          {image && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.image} />
              <TouchableOpacity
                style={styles.cancelIconContainer}
                onPress={cancelImageSelection}
              >
                 <Image source={{ uri:'https://cdn-icons-png.flaticon.com/128/1828/1828665.png' }} style={{ height:30,width:30, paddingLeft:-100, }} />
              </TouchableOpacity>
            </View>
          )}
        </View>

      </ScrollView>
      <View style={styles.foot}>
      <View style={styles.footer}>
        <TouchableOpacity onPress={createPost}>
          <Text style={styles.postText}>Post</Text>
        </TouchableOpacity>
        </View>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the content horizontally
  },
  
  backIcon: {
    width: 30,
    height: 30,
  },
  headerText: {
    paddingLeft: 16,
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
  },
  content: {
    margin: 16,
  },
  userSection: {
    flexDirection: 'column',
  },
  avatarContainer: {
    justifyContent:'flex-start',
    marginRight: 16,
    flexDirection:'row',
    
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    textAlignVertical:'center',
    paddingLeft:'2.5%',
  },
  titleInput: {
    color: '#000',
    fontSize: 16,
    maxHeight: 140,
    paddingTop: 20,
    maxWidth: '100%',
    textAlignVertical:'top',

  },
  eventSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  eventSwitchText: {
    color: '#000',
    fontSize:20,

  },
  yesText: {
    color: 'green',
    fontSize:20,
  },
  noText: {
    color: 'red',
    fontSize:20,
  },
  venueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderColor: '#ccc',
     borderWidth: 2,
     borderRadius: 20,
    padding: 8,
    marginTop: 10,
    resizeMode:'contain',
  },
  icon: {
    width: 27,
    height: 27,
    marginRight: 8,
    
  },
  eventVenueInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    // borderRadius: 20,
    padding: 10,
    marginTop: 10,
    width:'60%'
  },
  datePickerText: {
    fontSize: 18,
    alignContent: 'center',
    color:'#000'
  },
  imageUploadButton: {
    marginTop: 8,
  },
  imageUploadIcon: {
    width: 40,
    height: 40,
  },
  imageContainer: {
    margin: 8,
    position: 'relative', // Ensure the cancel icon is positioned relative to this container
  },
  image: {
    width: 260,
    height: 260,
    zIndex:1,
  },
  cancelIconContainer: {
    position: 'absolute',
    right: 50,
    zIndex:2,
  },
  foot:{  
    verticalAlign:'middle',
  },
  footer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf:'flex-end',
    verticalAlign:'center',
    borderRadius: 15,
    backgroundColor: '#1977f2', // Background color for the button
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 3, // Shadow radius
    elevation: 5, // Elevation for Android shadow
    marginEnd:20,
    marginBottom:20,
  },
  postText: {
    color: '#fff', // Text color
    fontSize: 18, // Font size
    fontWeight: 'bold', // Font weight
  },
  
});

export default PostScreen;