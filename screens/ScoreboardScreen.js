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

function Item({ title, point, photoUrl }) {
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
        <Image style={{ width: 50, height: 50 }} source={{ uri: photoUrl }} />
        <Text style={{ fontWeight: 'bold' }}>{title}</Text>
        <Text>{point} points</Text>
      </View>
    </View>
  );
}

Item.propTypes = {
  title: propTypes.string,
  point: propTypes.number,
  photoUrl: propTypes.string,
};

const ScoreboardScreen = props => {
  const [data, setData] = useState([
    {
      id: '1',
      title: 'Sorawit Kongnurat',
      point: 9999,
    },
  ]);
  const [userName, setUserName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const fetchFirebaseData = () => {
    const db = firebase.firestore();
    const array = [];
    db.collection('users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          array.push({
            id: doc.get('uid'),
            title: doc.get('displayName'),
            point: doc.get('totalPoints'),
            photoUrl: doc.get('displayPictureLargeUrl'),
          });
          console.log('doc.data()', doc.data());
        });
        setData(array);
      });
  };
  useEffect(() => {
    if (firebase.auth().currentUser) {
      setPhotoUrl(firebase.auth().currentUser.photoURL);
      setUserName(firebase.auth().currentUser.displayName);
      fetchFirebaseData();
    }
  }, []);
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
            data={data}
            renderItem={({ item }) => (
              <Item
                title={item.title}
                point={item.point}
                photoUrl={item.photoUrl}
              />
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
