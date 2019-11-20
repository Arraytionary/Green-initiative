import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import ChallengesScreen from '../screens/ChallengesScreen';
import MonsterScreen from '../screens/MonsterScreen';
import ScoreboardScreen from '../screens/ScoreBoardScreen';

import TabBar from '../components/TabBar';

const MainNavigators = createBottomTabNavigator(
  {
    Challenges: ChallengesScreen,
    Monster: MonsterScreen,
    Scoreboard: ScoreboardScreen,
  },
  {
    tabBarComponent: TabBar,
  }
);

export default createAppContainer(MainNavigators);
