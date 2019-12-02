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
import CompleteChallengeModal from '../components/CompletedChallengeModal';

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
  const [userName, setUserName] = useState('');
  const [totalPoints, setTotalPoints] = useState(0);
  const [photoUrl, setPhotoUrl] = useState('');
  const db = firebase.firestore();

  useEffect(() => {
    if (firebase.auth().currentUser) {
      const { uid } = firebase.auth().currentUser;
      db.collection('users')
        .doc(uid)
        .get()
        .then(doc => {
          if (!doc.exists) {
            const { displayPictureLargeUrl } = doc.data();
            setPhotoUrl(displayPictureLargeUrl);
          } else {
            setPhotoUrl(firebase.auth().currentUser.photoURL);
            console.log('Document data:', doc.data());
          }
        })
        .catch(err => {
          console.log('Error getting document', err);
        });

      setUserName(firebase.auth().currentUser.displayName.split(' ')[0]);
      firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then(doc => setTotalPoints(doc.data().totalPoints));
    }
  }, [db]);
  const [challenges] = useState([
    {
      challengeId: 1,
      backgroundColor: '#DB9FFF',
      buttonColor: '#CC8DF2',
      title: 'Challenges 1',
      subtitle: 'Say no to plastic bag.',
      image:
        'https://firebasestorage.googleapis.com/v0/b/the-green-initiative.appspot.com/o/plastic_bag.svg?alt=media&token=df9473c1-fb96-4971-b921-8ab74310bdd8',
      description:
        'It takes about 450 years just for one plastic bottle to break down !',
      points: 20,
    },
    {
      challengeId: 2,
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
      points: 100,
    },
    {
      challengeId: 3,
      backgroundColor: '#ff8047',
      buttonColor: '#ff6937',
      title: 'Challenges 3',
      subtitle: 'Say no to plastic straw',
      image:
        'https://firebasestorage.googleapis.com/v0/b/the-green-initiative.appspot.com/o/noStraw.svg?alt=media&token=4f080de9-4e14-4ded-abb3-9b4d89f96a4e',
      description:
        'Plastic straws are among the top 10 contributors to plastic marine debris across the globe and most recycling machines aren’t capable of recycling straws, given their size.',
      points: 100,
      // image: "https://firebasestorage.googleapis.com/v0/b/the-green-initiative.appspot.com/o/pngtree-hand-drawn-no-plastic-straws-doodle-icon-png-image_1725678-removebg-preview(2).png?alt=media&token=03edffb4-9415-45f5-91f1-7e7b35029d2a"
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
                  <CompleteChallengeModal
                    challengeId={item.challengeId}
                    points={item.points}
                    buttonStyle={styles.button}
                    buttonColor={buttonColor}
                  />
                  {/* <Button */}
                  {/* style={[styles.button, { backgroundColor: buttonColor }]} */}
                  {/* > */}
                  {/* <Text style={{ color: 'white' }}>Complete</Text> */}
                  {/* </Button> */}
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
          <Text style={{ marginTop: 6 }}>You have {totalPoints} points</Text>
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
