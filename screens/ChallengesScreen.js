import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from 'react-native';
import propTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import { H1, Button, H2 } from 'native-base';
import { SvgUri } from 'react-native-svg';
import firebase from 'firebase';
import CardFlip from 'react-native-card-flip';
import Constants from 'expo-constants';

import ProfilePhoto from '../assets/icons/profile_photo.svg';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    borderRadius: 14,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  button: {
    justifyContent: 'center',
    borderRadius: 24,
    width: 156,
    height: 56,
  },
});

const ChallengesScreen = props => {
  const [userName, setUserName] = useState('Mapring');
  const [photoUrl, setPhotoUrl] = useState('');
  useEffect(() => {
    if (firebase.auth().currentUser) {
      setPhotoUrl(firebase.auth().currentUser.photoURL);
      setUserName(firebase.auth().currentUser.displayName.split(' ')[0]);
    }
  }, []);
  const [challenges] = useState([
    {
      backgroundColor: '#DB9FFF',
      buttonColor: '#CC8DF2',
      title: 'Challenges 1',
      subtitle: 'Say no to plastic bag.',
      image:
        'https://firebasestorage.googleapis.com/v0/b/the-green-initiative.appspot.com/o/plastic_bag.svg?alt=media&token=df9473c1-fb96-4971-b921-8ab74310bdd8',
      description:
        'It takes about 450 years just for one plastic bottle to break down !',
    },
    {
      backgroundColor: '#66D763',
      button: {
        backgroundColor: '#76DC73',
      },
      buttonColor: '#76DC73',
      title: 'Challenges 2',
      subtitle: 'Use public transport instead of private car.',
      image:
        'https://firebasestorage.googleapis.com/v0/b/the-green-initiative.appspot.com/o/school_bus.svg?alt=media&token=5f37545e-9d72-4950-8497-8b77815e7abb',
      description:
        'Cars release approximately 333 million tons of carbon dioxide into the atmosphere annually, which is 20 percent of the world’s total',
    },
  ]);
  const card = useRef([]);

  const _renderItem = ({ item, index }) => {
    const { backgroundColor, image, buttonColor } = item;
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}
      >
        <CardFlip
          style={{
            height: '87%',
            width: '100%',
            borderRadius: 14,
          }}
          perspective={2000}
          flipZoom={0.01}
          ref={_card => card.current.push(_card)}
        >
          <TouchableWithoutFeedback onPress={() => card.current[index].flip()}>
            <View style={[styles.item, { backgroundColor }]}>
              <View style={{ flex: 1, width: '100%', padding: 15 }}>
                <H2 style={{ color: 'white' }}>{item.title}</H2>
                <Text style={{ color: 'white', marginTop: 12 }}>
                  {item.subtitle}
                </Text>
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <SvgUri width="80%" height="80%" uri={image} />
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Button
                    style={[styles.button, { backgroundColor: buttonColor }]}
                  >
                    <Text style={{ color: 'white' }}>Complete</Text>
                  </Button>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => card.current[index].flip()}>
            <View style={[styles.item, { backgroundColor }]}>
              <View style={{ flex: 1, width: '100%', padding: 15 }}>
                <H2 style={{ color: 'white' }}>{item.title}</H2>
                <Text style={{ color: 'white', marginTop: 12, fontSize: 16 }}>
                  Did you know:
                </Text>
                <Text style={{ color: 'white', marginTop: 12 }}>
                  {item.description}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </CardFlip>
      </View>
    );
  };

  _renderItem.propTypes = {
    item: propTypes.object,
    index: propTypes.number,
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F0F4F8',
        paddingTop: Constants.statusBarHeight,
        alignItems: 'center',
      }}
    >
      {/* <StatusBar hidden /> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: width * (85 / 100),
          paddingHorizontal: 10,
          paddingTop: 25,
        }}
      >
        <View>
          <H1 style={{ fontWeight: 'bold' }}>Hello, {userName}</H1>
          <Text style={{ marginTop: 6 }}>You have 9999 points</Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => props.navigation.navigate('Profile')}
        >
          {photoUrl ? (
            <Image
              style={{ width: 70, height: 70 }}
              source={{ uri: photoUrl }}
            />
          ) : (
            <ProfilePhoto width={70} height={70} />
          )}
        </TouchableWithoutFeedback>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}
      >
        <View style={styles.screen}>
          <Carousel
            contentContainerCustomStyle={{
              padding: 10,
            }}
            inactiveSlideScale={1}
            data={challenges}
            renderItem={_renderItem}
            itemWidth={width * (90 / 100)}
            sliderWidth={200}
          />
        </View>
      </View>
    </View>
  );
};

ChallengesScreen.propTypes = {
  navigation: propTypes.object,
};

export default ChallengesScreen;
