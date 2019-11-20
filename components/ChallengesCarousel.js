import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import propTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import { H1, Button, H2 } from 'native-base';
import { SvgUri } from 'react-native-svg';

import ProfilePhoto from '../assets/icons/profile_photo.svg';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * (85 / 100),
    height: height * (100 / 100),
  },
  carousel: {
    width,
    alignItems: 'center',
  },
  item: {
    borderRadius: 14,
    height: 500,
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

const MyCarousel = () => {
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
  const [viewChallenges, setViewChallenges] = useState(false);
  const [clickIndex, setClickIndex] = useState();

  const _renderItem = ({ item, index }) => {
    const { backgroundColor, image, buttonColor } = item;
    let output;
    if (viewChallenges && clickIndex === index) {
      output = (
        <View key={index} style={[styles.item, { backgroundColor }]}>
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
      );
    } else {
      output = (
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
              <Button style={[styles.button, { backgroundColor: buttonColor }]}>
                <Text style={{ color: 'white' }}>Complete</Text>
              </Button>
            </View>
          </View>
        </View>
      );
    }
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setViewChallenges(prev => !prev);
          setClickIndex(index);
        }}
      >
        {output}
      </TouchableWithoutFeedback>
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
        paddingVertical: 20,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: width * (85 / 100),
        }}
      >
        <View>
          <H1 style={{ fontWeight: 'bold' }}>Hello, Mapring</H1>
          <Text style={{ marginTop: 6 }}>You have 9999 points</Text>
        </View>
        <ProfilePhoto width={70} height={70} />
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={styles.screen}>
          <Carousel
            style={styles.carousel}
            data={challenges}
            renderItem={_renderItem}
            itemWidth={width * (85 / 100)}
            sliderWidth={200}
          />
        </View>
      </View>
    </View>
  );
};

export default MyCarousel;
