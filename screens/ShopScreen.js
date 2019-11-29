/* eslint-disable no-plusplus */
import React, { useState } from 'react';
import { View, Text, Button, Content, Container } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

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

  const renderShopList = () => {
    const arr = [];
    for (let i = 0; i < monsters.length; i++) {
      const monster = monsters[i];
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
          <Button style={styles.button}>
            <Text style={{ color: 'black', fontWeight: '800' }}>
              200 POINTS
            </Text>
          </Button>
        </View>
      );
    }
    return arr;
  };

  return (
    <Container>
      <Content style={{ paddingTop: Constants.statusBarHeight }}>
        {renderShopList()}
      </Content>
    </Container>
  );
};

export default ShopScreen;
