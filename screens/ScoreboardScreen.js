import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import propTypes from 'prop-types';
import Constants from 'expo-constants';
import firebase from 'firebase';

import { H2, H3 } from 'native-base';
import ProfilePhoto from '../assets/icons/profile_photo.svg';

const DATA = [
  {
    id: '1',
    title: 'Sorawit Kongnurat',
    point: 9999,
  },
];

function Item({ title, point }) {
  return (
    <View
      style={{
        paddingHorizontal: 25,
      }}
    >
      <View
        style={{
          paddingVertical: 10,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: 'lightgrey',
        }}
      >
        <ProfilePhoto height={50} width={50} />
        <Text style={{ fontWeight: 'bold' }}>{title}</Text>
        <Text>{point} points</Text>
      </View>
    </View>
  );
}

Item.propTypes = {
  title: propTypes.string,
  point: propTypes.number,
};

const ScoreboardScreen = props => {
  const db = firebase.firestore();
  db.collection('user')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        DATA.push(
          ...{
            id: doc.id,
            title: doc.get('displayName'),
            points: doc.get('totalPoints'),
          }
        );
      });
    });
  const [userName, setUserName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  useEffect(() => {
    if (firebase.auth().currentUser) {
      const { uid } = firebase.auth().currentUser;

      db.collection('users')
        .doc(uid)
        .get()
        .then(doc => {
          const { displayPictureLargeUrl } = doc.data();
          if (displayPictureLargeUrl) setPhotoUrl(displayPictureLargeUrl);
          else setPhotoUrl(firebase.auth().currentUser.photoURL);
        })
        .catch(err => {
          console.log(err);
        });

      setUserName(firebase.auth().currentUser.displayName);
    }
  }, [db]);
  return (
    <View
      style={{
        flex: 1,
        height: 500,
        paddingTop: Constants.statusBarHeight,
      }}
    >
      <View
        style={{
          flex: 4,
        }}
      >
        <LinearGradient
          style={{ flex: 1, justifyContent: 'center' }}
          colors={['#FFFFFF', '#8EEDC7', '#147D64']}
        >
          <View style={{ alignItems: 'center' }}>
            <TouchableWithoutFeedback
              onPress={() => props.navigation.navigate('Profile')}
            >
              <View>
                {photoUrl ? (
                  <Image
                    style={{ width: 70, height: 70 }}
                    source={{ uri: photoUrl }}
                  />
                ) : (
                  <ProfilePhoto width={70} height={70} />
                )}
              </View>
            </TouchableWithoutFeedback>
            <H2 style={{ fontWeight: 'bold', marginTop: 12 }}>{userName}</H2>
            <H3 style={{ margin: 12 }}>9999 points</H3>
          </View>
        </LinearGradient>
      </View>
      <View style={{ flex: 6 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            data={DATA}
            renderItem={({ item }) => (
              <Item title={item.title} point={item.point} />
            )}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

ScoreboardScreen.propTypes = {
  navigation: propTypes.object,
};

export default ScoreboardScreen;
