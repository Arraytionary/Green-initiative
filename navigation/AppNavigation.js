import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import CustomHeader from '../components/CustomHeader';
import ChallengesScreen from '../screens/ChallengesScreen';
import MonsterScreen from '../screens/MonsterScreen';
import ScoreboardScreen from '../screens/ScoreboardScreen';
import ProfileScreen from '../screens/ProfileScreen';

import TabBar from '../components/TabBar';
import LoginScreen from '../screens/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const ScoreboardNavigators = createStackNavigator(
  {
    Scoreboard: ScoreboardScreen,
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        header: CustomHeader,
      },
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  }
);

const MainNavigators = createBottomTabNavigator(
  {
    Challenges: ChallengesScreen,
    Monster: MonsterScreen,
    Scoreboard: ScoreboardNavigators,
  },
  {
    tabBarComponent: TabBar,
  }
);

const AuthStack = createStackNavigator({ Login: LoginScreen });
const AppStack = createStackNavigator({ MainNavigators });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
