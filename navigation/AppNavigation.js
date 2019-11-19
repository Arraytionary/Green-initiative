import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import ChallengesScreen from '../screens/ChallengesScreen'
import MonsterScreen from '../screens/MonsterScreen'
import ScoreBoardScreen from '../screens/ScoreBoardScreen'

const MainNavigators = createBottomTabNavigator({
    Challenges: ChallengesScreen,
    Monster: MonsterScreen,
    Scoreboard: ScoreBoardScreen
});

export default createAppContainer(MainNavigators);
