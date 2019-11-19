import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Footer, FooterTab, Button, Text } from 'native-base';
import propTypes from 'prop-types';

import Challenges from '../assets/icons/challenges.svg';
import Monster from '../assets/icons/monster.svg';
import Scoreboard from '../assets/icons/scoreboard.svg';

const styles = StyleSheet.create({
  active: {
    backgroundColor: '#199473',
  },
  text: {
    color: 'white',
  },
});

const TabBar = props => {
  const [isActive, setIsActive] = useState([true, false, false]);
  const activeButtonHandler = (pos, routeName) => {
    const array = [false, false, false];
    array[pos] = true;
    setIsActive(array);
    props.navigation.navigate(routeName);
  };
  return (
    <Footer>
      <FooterTab style={{ backgroundColor: '#3EBD93' }}>
        <Button
          style={isActive[0] ? styles.active : {}}
          vertical
          onPress={() => activeButtonHandler(0, 'Challenges')}
        >
          <Challenges width={30} height={30} />
          <Text style={styles.text}>Challenges</Text>
        </Button>
        <Button
          style={isActive[1] ? styles.active : {}}
          vertical
          onPress={() => activeButtonHandler(1, 'Monster')}
        >
          <Monster width={30} height={30} />
          <Text style={styles.text}>Monster</Text>
        </Button>
        <Button
          style={isActive[2] ? styles.active : {}}
          vertical
          onPress={() => activeButtonHandler(2, 'Scoreboard')}
        >
          <Scoreboard width={30} height={30} />
          <Text style={styles.text}>Scoreboard</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

TabBar.propTypes = {
  navigation: propTypes.object,
};

export default TabBar;
