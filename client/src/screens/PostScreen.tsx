import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
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

type Props = {
  navigation: any;
};

const PostScreen = ({navigation}: Props) => {
  const {user} = useSelector((state: any) => state.user);
  const {isSuccess, isLoading} = useSelector((state: any) => state.post);
  const [activeIndex, setActiveIndex] = useState(0);
  const [active, setActive] = useState(false);
  const [eventDate, seteventDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [eventVenue,seteventVenue] = useState('');
  const [isEvent, setIsEvent] = useState(false);

  useEffect(() => {
    if (
      replies.length === 1 &&
      replies[0].title === '' &&
      replies[0].image === ''
    ) {
      setReplies([]);
    }
    if (isSuccess) {
      navigation.goBack();
      getAllPosts()(dispatch);
    }
    setReplies([]);
    setTitle('');
    setImage('');
  }, [isSuccess]);

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

  const addNewThread = () => {
    if (
      replies[activeIndex].title !== '' ||
      replies[activeIndex].image !== ''
    ) {
      setReplies(prevPost => [...prevPost, {title: '', image: '', user}]);
      setActiveIndex(replies.length);
    }
  };

  const removeThread = (index: number) => {
    if (replies.length > 0) {
      const updatedPost = [...replies];
      updatedPost.splice(index, 1);
      setReplies(updatedPost);
      setActiveIndex(replies.length - 1);
    } else {
      setReplies([{title: '', image: '', user}]);
    }
  };

  const addFreshNewThread = () => {
    if (title !== '' || image !== '') {
      setActive(true);
      setReplies(prevPost => [...prevPost, {title: '', image: '', user}]);
      setActiveIndex(replies.length);
    }
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

  const createPost = () => {
    if (title !== '' || (image !== '' && !isLoading)) {
      createPostAction(title, image, user, replies,isEvent,eventVenue,eventDate)(dispatch);
    }
  };

  return (
<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderCard/>
      <View style={{ flexDirection: 'row', alignItems: 'center', margin: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/545/545680.png',
                    }}
                    style={{ width: 30, height: 30 }}
                  /> 
        </TouchableOpacity>
        <Text style={{ paddingLeft: 16, fontSize: 20, fontWeight: '500', color: '#000' }}>
         Create Post/Event
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ margin: 16 }}>
          <View style={{ marginBottom: 16, flexDirection: 'row' }}>
            <Image
              source={user.avatar?.url ? { uri: user.avatar?.url } : DefaultAvatar}
              style={{ width: 40, height: 40, borderRadius: 100 }}
            />
            <View style={{ width:'90%' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 20, fontWeight: '400', color: 'black' }}>
                  {user?.name}
                </Text>
               
              </View>
              <TextInput
  placeholder="Title....."
  placeholderTextColor="#000"
  value={title}
  onChangeText={(text) => setTitle(text)}
  underlineColorAndroid='black'
  style={{
    color: '#000',
    fontSize: 16,
    maxHeight: 50,  
    paddingTop: 20, 
    maxWidth:'100%',  
  }}
  multiline={true}   
  numberOfLines={4}  
/>

<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
  <Text style={{ color:'#000'}}>Event Post?</Text>
  <Switch
    trackColor={{ false: 'grey', true: 'green' }}
    thumbColor={isEvent ? 'green' : 'grey'}
    value={isEvent}
    onValueChange={(value) => setIsEvent(value)}
  />
  {isEvent ? <Text style={{ color:'white' }}>Yes</Text> : <Text style={{ color:'black' }}>No</Text>}
</View>

              {isEvent && (
                <>
      <View style={{ flexDirection: 'row',alignItems: 'center',borderColor: '#ccc',borderWidth: 1,borderRadius: 8,
    padding: 8,}}>
      <Image
        source={{uri: 'https://cdn-icons-png.flaticon.com/128/11529/11529542.png',}}
        style={{ width: 24,height: 24,marginRight: 8,}}
      />
      <TextInput
        placeholder="Venue of the Event"
        placeholderTextColor="#000"
        value={eventVenue}
        onChangeText={(text) => seteventVenue(text)}
        style={{flex: 1,fontSize: 16,color: '#000',}}
      />
    </View>
                  <>
                  <TouchableOpacity onPress={() => setOpen(true)}>
                  <View style={{
  flexDirection: 'row',
  alignItems: 'center',
  borderColor: 'red',
  borderWidth: 1,
  borderRadius: 8,
  padding: 10,
}}>
  
    <Image
      source={{uri: 'https://cdn-icons-png.flaticon.com/128/591/591576.png'}}
      style={{width: 25, height: 25, marginTop: 5}}
    />
    <Text style={{ fontSize:18, alignContent:'Center' }}>
      {`${eventDate.toDateString()} `}
      <Image source={{uri: "https://cdn-icons-png.flaticon.com/128/2784/2784459.png"}} style={{width: 25, height: 25}} />
      {` ${eventDate.toLocaleTimeString()}`}
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

                  </>
                </>
              )}
              <TouchableOpacity
                style={{ marginTop: 8 }}
                onPress={postImageUpload}
              >
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/11737/11737443.png',
                  }}
                  style={{ width: 20, height: 20, tintColor: '#000' }}
                />
              </TouchableOpacity>
            </View>
          </View>
          {image && (
            <View style={{ margin: 8 }}>
              <Image
                source={{ uri: image }}
                style={{ width: 250, height: 250 }}
              />
            </View>
          )}
        </View>
      </ScrollView>
      <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={createPost}>
          <Text style={{ color: '#1977f2', alignContent:'flex-start' }}>Post</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  ); 
};

export default PostScreen;
