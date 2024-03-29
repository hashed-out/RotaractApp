import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Animated,
  Easing,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../redux/actions/postAction';
import { getAllUsers } from '../../redux/actions/userAction';
import PostCard from '../components/PostCard';
import Loader from '../common/Loader';
import Lottie from 'lottie-react-native';
import HeaderCard from '../components/HeaderCard';
const loader = require('../assets/animation_lkbqh8co.json');

type Props = {
  navigation: any;
};

const HomeScreen = (props: Props) => {
  const { posts, isLoading } = useSelector((state: any) => state.post);
  const dispatch = useDispatch();
  const [offsetY, setOffsetY] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [extraPaddingTop] = useState(new Animated.Value(0));
  const refreshingHeight = 100;
  const lottieViewRef = useRef<Lottie>(null);

  let progress = 0;
  if (offsetY < 0 && !isRefreshing) {
    const maxOffsetY = -refreshingHeight;
    progress = Math.min(offsetY / maxOffsetY, 1);
  }

  function onScroll(event: any) {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const { y } = contentOffset;
    setOffsetY(y);
  }

  function onRelease() {
    if (offsetY <= -refreshingHeight && !isRefreshing) {
      setIsRefreshing(true);
      setTimeout(() => {
        getAllPosts()(dispatch);
        setIsRefreshing(false);
      }, 3000);
    }
  }

  function onScrollEndDrag(event: any) {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const { y } = contentOffset;
    setOffsetY(y);

    if (y <= -refreshingHeight && !isRefreshing) {
      setIsRefreshing(true);
      setTimeout(() => {
        getAllPosts()(dispatch);
        setIsRefreshing(false);
      }, 3000);
    }
  }

  useEffect(() => {
    getAllPosts()(dispatch);
    getAllUsers()(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (isRefreshing) {
      Animated.timing(extraPaddingTop, {
        toValue: refreshingHeight,
        duration: 0,
        useNativeDriver: false,
      }).start();
      lottieViewRef.current?.play();
    } else {
      Animated.timing(extraPaddingTop, {
        toValue: 0,
        duration: 400,
        easing: Easing.elastic(1.3),
        useNativeDriver: false,
      }).start();
    }
  }, [isRefreshing]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SafeAreaView style={styles.container}>
          <HeaderCard />
          <Lottie
            ref={lottieViewRef}
            style={{
              height: refreshingHeight,
              display: isRefreshing ? 'flex' : 'none',
              position: 'absolute',
              top: 15,
              left: 0,
              right: 0,
            }}
            loop={false}
            source={loader}
            progress={progress}
          />
          {Platform.OS === 'ios' ? (
            <FlatList
              data={posts}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <PostCard navigation={props.navigation} item={item} />
              )}
              onScroll={onScroll}
              onScrollEndDrag={onScrollEndDrag}
              onResponderRelease={onRelease}
              ListHeaderComponent={
                <Animated.View
                  style={{
                    paddingTop: extraPaddingTop,
                  }}
                />
              }
            />
          ) : (
            <FlatList
              style={{
                backgroundColor: '#fff',
              }}
              data={posts}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <PostCard navigation={props.navigation} item={item} />
              )}
              onScroll={onScroll}
              onScrollEndDrag={onScrollEndDrag}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => {
                    setRefreshing(true);
                    getAllPosts()(dispatch);
                    getAllUsers()(dispatch).then(() => {
                      setRefreshing(false);
                    });
                  }}
                  progressViewOffset={refreshingHeight}
                />
              }
              onResponderRelease={onRelease}
              ListHeaderComponent={
                <Animated.View
                  style={{
                    paddingTop: extraPaddingTop,
                  }}
                />
              }
            />
          )}
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
});

export default HomeScreen;
