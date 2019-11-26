import React from 'react';
import { Platform } from 'react-native';
import { Header, Left, Button, Icon, Body, Right, Text } from 'native-base';
import propTypes from 'prop-types';
import Constants from 'expo-constants';

const CustomHeader = props => (
  <Header
    style={{
      backgroundColor: 'white',
      marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    }}
  >
    <Left>
      <Button transparent onPress={() => props.navigation.pop()}>
        <Icon
          style={{ color: Platform.OS === 'android' ? 'black' : '#0076FF' }}
          name="arrow-back"
        />
        <Text>Back</Text>
      </Button>
    </Left>
    <Body></Body>
    <Right></Right>
  </Header>
);

CustomHeader.propTypes = {
  navigation: propTypes.object,
};

export default CustomHeader;
