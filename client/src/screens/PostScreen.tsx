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
      createPostAction(title, image, user, replies,eventVenue,eventDate)(dispatch);
    }
  };

  return (
<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',}}>
        <Image
          style={{ width: 250, height: 100, resizeMode: "contain",  }}
          source={
            require('../assets/rl.png')
          }
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', margin: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/2961/2961937.png',
                    }}
                    style={{ width: 20, height: 20 }}
                  /> 
        </TouchableOpacity>
        <Text style={{ paddingLeft: 16, fontSize: 20, fontWeight: '500', color: '#000' }}>
          New Post/Event
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ margin: 16 }}>
          <View style={{ marginBottom: 16, flexDirection: 'row' }}>
            <Image
              source={{ uri: user?.avatar.url }}
              style={{ width: 40, height: 40, borderRadius: 100 }}
            />
            <View style={{ width:'90%' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 20, fontWeight: '400', color: 'black' }}>
                  {user?.name}
                </Text>
               
              </View>
              <TextInput
  placeholder="Write your post..."
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

              <View style={{ marginTop: 20 }}>
                <Text>This post is about an Event</Text>
                <Switch
                  trackColor={{ false: 'red', true: 'green' }}
                  thumbColor={isEvent ? 'green' : 'red'}
                  value={isEvent}
                  onValueChange={(value) => setIsEvent(value)}
                />
              </View>
              {isEvent && (
                <>
      <View style={{ flexDirection: 'row',alignItems: 'center',borderColor: '#ccc',borderWidth: 1,borderRadius: 8,
    padding: 8,}}>
      <Image
        source={{uri: 'https://cdn-icons-png.flaticon.com/512/10857/10857463.png',}}
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
                    <Button
                      title="Event Date & Time"
                      size="sm"
                      onPress={() => setOpen(true)}
                      color={'black'}
                    />
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
                    uri: 'https://cdn-icons-png.flaticon.com/512/10857/10857463.png',
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
                style={{ width: 200, height: 300 }}
              />
            </View>
          )}
          {replies.length === 0 && (
            <View style={{ flexDirection: 'row', margin: 16, marginTop: 24, opacity: 0.7 }}>
              <Image
                source={{ uri: user?.avatar.url }}
                style={{ width: 30, height: 30, borderRadius: 100 }}
              />

              {/* <Text
                style={{ paddingLeft: 16, color: 'black' }}
                onPress={addFreshNewThread}
              >
                Add to thread ...
              </Text> */}
            </View>
          )}
          {replies.map((item, index) => (
            <View key={index}>
              <View style={{ marginTop: 8, flexDirection: 'row' }}>
                <Image
                  source={{ uri: user?.avatar.url }}
                  style={{ width: 40, height: 40, borderRadius: 100 }}
                />
                <View style={{ paddingLeft: 16 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 20, fontWeight: '400', color: 'black' }}>
                      {user?.name}
                    </Text>
                    <TouchableOpacity onPress={() => removeThread(index)}>
                      <Image
                        source={{
                          uri: 'https://cdn-icons-png.flaticon.com/512/2961/2961937.png',
                        }}
                        style={{ width: 20, height: 20 }}
                      />
                    </TouchableOpacity>
                  </View>
                  {/* <TextInput
                    placeholder="Start a thread..."
                    placeholderTextColor="#000"
                    value={item.title}
                    onChangeText={(text) => handleTitleChange(index, text)}
                    style={{ marginTop: 8, color: '#000', fontSize: 16 }}
                  /> */}
                  <TouchableOpacity
                    style={{ marginTop: 8 }}
                    onPress={() => uploadImage(index)}
                  >
                    <Button
                      title="Upload your photo"
                      size="sm"
                    />
                    <Image
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/10857/10857463.png',
                      }}
                      style={{ width: 20, height: 20 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {item.image && (
                <View style={{ margin: 8 }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 200, height: 300 }}
                  />
                </View>
              )}
              {index === activeIndex && (
                <View style={{ flexDirection: 'row', margin: 16, marginTop: 24, opacity: 0.7 }}>
                  <Image
                    source={{ uri: user?.avatar.url }}
                    style={{ width: 30, height: 30, borderRadius: 100 }}
                  />
                  <Text
                    style={{ paddingLeft: 16, color: 'black' }}
                    onPress={addNewThread}
                  >
                    Add to thread ...
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: 'black', padding: 8, fontSize: 16 }}>Anyone can reply</Text>
        <TouchableOpacity onPress={createPost}>
          <Text style={{ color: '#1977f2' }}>Post</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PostScreen;
