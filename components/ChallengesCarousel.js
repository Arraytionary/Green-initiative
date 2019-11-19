import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import propTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * (100 / 100),
    height: height * (100 / 100),
  },
  carousel: {
    flex: 1,
    backgroundColor: 'orange',
  },
  item: {
    borderWidth: 2,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 100,
    fontWeight: 'bold',
  },
});

const MyCarousel = () => {
  const [entries] = useState([
    { backgroundColor: 'red' },
    { backgroundColor: 'green' },
    { backgroundColor: 'blue' },
    { backgroundColor: 'yellow' },
  ]);
  const [carousel, setCarousel] = useState();

  const _renderItem = ({ item, index }) => {
    const { backgroundColor } = item;
    return (
      <TouchableOpacity
        style={[styles.item, { backgroundColor }]}
        onPress={() => {
          carousel.scrollToIndex(index);
        }}
      >
        <Text style={styles.text}>{index.toString()}</Text>
      </TouchableOpacity>
    );
  };

  _renderItem.propTypes = {
    item: propTypes.object,
    index: propTypes.number,
  };

  return (
    <View style={styles.screen}>
      <Carousel
        style={styles.carousel}
        data={entries}
        renderItem={_renderItem}
        itemWidth={width * (75 / 100)}
        sliderWidth={300}
        ref={c => {
          setCarousel(c);
        }}
      />
    </View>
  );
};

export default MyCarousel;
