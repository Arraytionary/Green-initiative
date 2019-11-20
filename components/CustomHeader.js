import React from 'react';
import { Header, Left, Button, Icon, Body, Right } from 'native-base';
import propTypes from 'prop-types';

const CustomHeader = props => (
  <Header style={{ backgroundColor: 'white' }}>
    <Left>
      <Button transparent onPress={() => props.navigation.pop()}>
        <Icon style={{ color: 'black' }} name="arrow-back" />
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
