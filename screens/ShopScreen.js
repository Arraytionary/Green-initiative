/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Content, Container, Icon } from 'native-base';
import { Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Constants from 'expo-constants';
import firebase from 'firebase';

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    borderRadius: 24,
    width: 156,
    height: 56,
    backgroundColor: '#FFBC1F'
  }
});

const ShopScreen = () => {
  const db = firebase.firestore();
  const { uid } = firebase.auth().currentUser;
  const userRef = db.collection('users').doc(uid);
  const [monsters] = useState([
    {
      image:
        'https://firebasestorage.googleapis.com/v0/b/the-green-initiative.appspot.com/o/monsters%2Fdino%2Fdino.gif?alt=media&token=f9fa883f-52d7-4dc9-97a6-b05a6f2c3f09',
      name: 'dino',
      textColor: '#409999',
      buttonColor: '#039b9b',
      price: 1
    },
    {
      image:
        'https://firebasestorage.googleapis.com/v0/b/the-green-initiative.appspot.com/o/monsters%2Fearthy%2Fball.gif?alt=media&token=281e1632-1bda-4e0f-ae66-9ff9f13fa0c5',
      name: 'earthy',
      textColor: '#2b6634',
      buttonColor: '#036312',
      price: 1
    },
    {
      image:
        'https://firebasestorage.googleapis.com/v0/b/the-green-initiative.appspot.com/o/monsters%2Fpenpen%2Fpengin.gif?alt=media&token=60d7a4d6-4ef7-4207-8533-747dc4b71597',
      name: 'penpen',
      textColor: '#666666',
      buttonColor: '#333333',
      price: 1
    }
  ]);
  const [notOwned, setNotOwned] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotOwnedMonsters = () => {
    setLoading(true);
    userRef
      .collection('monsters')
      .get()
      .then(snapshot => {
        const owned = snapshot.docs.map(doc => doc.id.toLowerCase());
        setNotOwned(
          monsters.filter(mon => !owned.includes(mon.name.toLowerCase()))
        );
        setLoading(false);
      });
  };

  const buy = monster => {
    userRef.get().then(doc => {
      const { leaf } = doc.data();
      const leafLeft = leaf - monster.price;
      if (leafLeft < 0) {
        Alert.alert('Insufficient leaf', 'You do not have enough leaf yet', [
          { text: 'OK' }
        ]);
      } else {
        userRef
          .collection('monsters')
          .doc(monster.name)
          .set({
            crrPoint: 0,
            level: 1,
            bound: 100,
            progress: 0,
            image: monster.image
          });
        userRef.update({ leaf: leafLeft });
        fetchNotOwnedMonsters();
      }
    });
  };

  const renderShopList = () => {
    if (loading) {
      return <ActivityIndicator size='large' color='#0000ff' />;
    }
    if (notOwned.length === 0) {
      return <Text style={{ fontSize: 50 }}> The shop is empty </Text>;
    }
    const arr = [];
    for (let i = 0; i < notOwned.length; i++) {
      const monster = notOwned[i];
      arr.push(
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 50
          }}
          key={monster.name}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: '400',
              color: monster.textColor
            }}
          >
            {monster.name}
          </Text>
          <Image
            style={{
              width: 200,
              height: 200,
              resizeMode: 'contain'
            }}
            source={{ uri: monster.image }}
          ></Image>
          <Button style={styles.button} onPress={() => buy(monster)}>
            <Text style={{ color: 'black', fontWeight: '800' }}>
              {monster.price}{' '}
              <Icon
                name='leaf'
                type='FontAwesome'
                style={{ color: 'green', fontSize: 20 }}
              />
            </Text>
          </Button>
        </View>
      );
    }
    return arr;
  };

  return (
    <Container>
      <NavigationEvents onDidFocus={() => fetchNotOwnedMonsters()} />
      <Content style={{ paddingTop: Constants.statusBarHeight }}>
        {renderShopList()}
      </Content>
    </Container>
  );
};

export default ShopScreen;
