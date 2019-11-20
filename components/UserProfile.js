import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { H2 } from 'native-base';
import ProfilePhoto from '../assets/icons/profile_photo.svg';
import GemPhoto from '../assets/icons/gem_solid.svg';
import GlassPhoto from '../assets/icons/glass_whiskey_solid.svg';
import BagPhoto from '../assets/icons/shopping_bag_solid.svg';
import Chart from '../assets/icons/chart.svg';

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

export default class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContent}>
          <ProfilePhoto />
          <H2 style={{ marginTop: 10, fontWeight: 'bold' }}>
            Sarita Kongnurat
          </H2>
        </View>
        <View style={styles.middleContent}>
          <View style={{ flex: 1 }}>
            <View style={styles.items}>
              <GemPhoto />
              <Text style={{ fontWeight: 'bold' }}>100</Text>
              <Text>Gem Collected</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.items}>
              <BagPhoto />
              <Text style={{ fontWeight: 'bold' }}>100</Text>
              <Text>Bag Saved</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.items}>
              <GlassPhoto />
              <Text style={{ fontWeight: 'bold' }}>100</Text>
              <Text>Cup Saved</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 3, justifyContent: 'center' }}>
          <Chart />
        </View>
      </View>
    );
  }
}
