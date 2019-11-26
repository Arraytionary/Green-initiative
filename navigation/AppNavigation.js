import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import CustomHeader from '../components/CustomHeader';
import ChallengesScreen from '../screens/ChallengesScreen';
import MonsterScreen from '../screens/MonsterScreen';
import ScoreboardScreen from '../screens/ScoreboardScreen';
import ProfileScreen from '../screens/ProfileScreen';

import CustomTabBar from '../components/CustomTabBar';
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

const ChallengesNavigator = createStackNavigator(
  {
    Challenges: ChallengesScreen,
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
    Challenges: ChallengesNavigator,
    Monster: MonsterScreen,
    Scoreboard: ScoreboardNavigators,
  },
  {
    tabBarComponent: CustomTabBar,
  }
);

const AuthStack = createStackNavigator(
  { Login: LoginScreen },
  {
    defaultNavigationOptions: {
      header: null,
    },
  }
);

export default createAppContainer(
  // MainNavigators
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: MainNavigators,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
