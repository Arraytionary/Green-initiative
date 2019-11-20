import React from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { H2, H3 } from 'native-base';
import ProfilePhoto from '../assets/icons/profile_photo.svg';

const DATA = [
  {
    id: '1',
    title: 'Sorawit Kongnurat',
    point: 9999,
  },
  {
    id: '2',
    title: 'Sorawit Kongnurat',
    point: 9999,
  },
  {
    id: '3',
    title: 'Sorawit Kongnurat',
    point: 9999,
  },
  {
    id: '4',
    title: 'Sorawit Kongnurat',
    point: 9999,
  },
  {
    id: '5',
    title: 'Sorawit Kongnurat',
    point: 9999,
  },
  {
    id: '6',
    title: 'Sorawit Kongnurat',
    point: 9999,
  },
  {
    id: '7',
    title: 'Sorawit Kongnurat',
    point: 9999,
  },
  {
    id: '8',
    title: 'Sorawit Kongnurat',
    point: 9999,
  },
  {
    id: '9',
    title: 'Sorawit Kongnurat',
    point: 9999,
  },
];

function Item({ title, point }) {
  return (
    <View
      style={{
        // marginVertical: 10,
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

const ScoreboardScreen = () => (
  <View style={{ flex: 1, height: 500 }}>
    <View
      style={{
        flex: 4,
      }}
    >
      <LinearGradient
        style={{ flex: 1, justifyContent: 'center' }}
        colors={['#EFFCF6', '#8EEDC7', '#147D64']}
      >
        <View style={{ alignItems: 'center' }}>
          <ProfilePhoto />
          <H2 style={{ fontWeight: 'bold', marginTop: 12 }}>
            Sarita Kongnurat
          </H2>
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

export default ScoreboardScreen;
