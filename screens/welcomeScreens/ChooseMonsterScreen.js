/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Image } from 'react-native';
import { Text, View, Button } from 'native-base';
import Constants from 'expo-constants';
import Carousel from 'react-native-snap-carousel';
import firebase from 'firebase';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    borderRadius: 14,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold'
  },
  button: {
    justifyContent: 'center',
    borderRadius: 24,
    width: 156,
    height: 56
  }
});

const ChangeMonsterScreen = props => {
  const db = firebase.firestore();
  const { uid } = firebase.auth().currentUser;
  const userRef = db.collection('users').doc(uid);
  const [monsters] = useState([
    {
      image:
        'https://firebasestorage.googleapis.com/v0/b/the-green-initiative.appspot.com/o/monsters%2Fdino%2Fdino.gif?alt=media&token=f9fa883f-52d7-4dc9-97a6-b05a6f2c3f09',
      name: 'Dino',
      textColor: '#409999',
      buttonColor: '#039b9b'
    },
    {
      image:
        'https://firebasestorage.googleapis.com/v0/b/the-green-initiative.appspot.com/o/monsters%2Fearthy%2Fball.gif?alt=media&token=281e1632-1bda-4e0f-ae66-9ff9f13fa0c5',
      name: 'Earthy',
      textColor: '#2b6634',
      buttonColor: '#036312'
    },
    {
      image:
        'https://firebasestorage.googleapis.com/v0/b/the-green-initiative.appspot.com/o/monsters%2Fpenpen%2Fpengin.gif?alt=media&token=60d7a4d6-4ef7-4207-8533-747dc4b71597',
      name: 'Penpen',
      textColor: '#666666',
      buttonColor: '#333333'
    }
  ]);

  const handleOnSelect = monster => {
    userRef.update({ selectedMonster: monster.name });
    userRef
      .collection('monsters')
      .doc(monster.name)
      .set({
        crrPoint: 0,
        level: 1,
        bound: 20,
        progress: 0,
        image: monster.image
      });
    props.navigation.navigate('App');
  };

  const _renderItem = ({ item }) => (
    <View
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: '800', color: item.textColor }}>
        {item.name}
      </Text>
      <Image
        style={{
          width: '75%',
          height: '50%',
          resizeMode: 'contain'
        }}
        source={{ uri: item.image }}
      ></Image>
      <Button
        style={{ backgroundColor: item.buttonColor, ...styles.button }}
        onPress={() => handleOnSelect(item)}
      >
        <Text>Select</Text>
      </Button>
    </View>
  );

  const renderContent = () => (
    <View style={styles.screen}>
      <Carousel
        contentContainerCustomStyle={{
          padding: 10
        }}
        inactiveSlideScale={1}
        data={monsters}
        renderItem={_renderItem}
        itemWidth={width * (90 / 100)}
        sliderWidth={200}
      />
    </View>
  );
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F0F4F8',
        paddingTop: Constants.statusBarHeight
      }}
    >
      {renderContent()}
    </View>
  );
};

export default ChangeMonsterScreen;
