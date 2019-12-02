import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import { H2 } from 'native-base';
import firebase from 'firebase';
import ProfilePhoto from '../assets/icons/profile_photo.svg';
import Chart from '../assets/icons/chart.svg';
import Coin from '../assets/icons/pokecoin.svg';
import MoneyBag from '../assets/icons/money_bag.svg';
import PaperCup from '../assets/icons/paper_cup.svg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
  },
  topContent: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  items: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const ProfileScreen = () => {
  const [userName, setUserName] = useState('Mapring');
  const [photoUrl, setPhotoUrl] = useState('');
  useEffect(() => {
    const db = firebase.firestore().collection('users');
    if (firebase.auth().currentUser) {
      const { uid } = firebase.auth().currentUser;
      db.doc(uid)
        .get()
        .then(doc => {
          const { displayPictureLargeUrl } = doc.data();
          if (displayPictureLargeUrl) {
            setPhotoUrl(displayPictureLargeUrl);
          } else {
            setPhotoUrl(firebase.auth().currentUser.photoURL);
          }
        })
        .catch(err => {
          console.log(err);
        });
      setUserName(firebase.auth().currentUser.displayName);
    }
  }, []);
  const logout = async () => {
    await firebase.auth().signOut();
  };
  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        {photoUrl ? (
          <Image style={{ width: 70, height: 70 }} source={{ uri: photoUrl }} />
        ) : (
          <ProfilePhoto width={70} height={70} />
        )}
        <H2 style={{ marginTop: 10, fontWeight: 'bold' }}>{userName}</H2>
        <Button onPress={logout} title="Sign Out" color="#3c50e8" />
      </View>
      <View style={styles.middleContent}>
        <View style={{ flex: 1 }}>
          <View style={styles.items}>
            <Coin height={50} width={50} />
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>100</Text>
            <Text>Gem Collected</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.items}>
            <MoneyBag height={50} width={50} />
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>100</Text>
            <Text>Bag Saved</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.items}>
            <PaperCup height={50} width={50} />
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>100</Text>
            <Text>Cup Saved</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 3, justifyContent: 'center' }}>
        <Chart />
      </View>
    </View>
  );
};

export default ProfileScreen;
