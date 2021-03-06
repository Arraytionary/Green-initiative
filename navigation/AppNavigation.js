import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import CustomHeader from '../components/CustomHeader';
import ChallengesScreen from '../screens/ChallengesScreen';
import MonsterScreen from '../screens/MonsterScreen';
import ShopScreen from '../screens/ShopScreen';
import ChangeMonsterScreen from '../screens/ChangeMonsterScreen';

import ScoreboardScreen from '../screens/ScoreboardScreen';
import ProfileScreen from '../screens/ProfileScreen';

import CustomTabBar from '../components/CustomTabBar';
import LoginScreen from '../screens/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

import WelcomeScreen from '../screens/welcomeScreens/welcomeScreen';
import ChooseMonsterScreen from '../screens/welcomeScreens/ChooseMonsterScreen';

const ScoreboardNavigators = createStackNavigator(
  {
    Scoreboard: ScoreboardScreen,
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        header: CustomHeader
      }
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const ChallengesNavigator = createStackNavigator(
  {
    Challenges: ChallengesScreen,
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        header: CustomHeader
      }
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const MonsterNavigator = createStackNavigator(
  {
    Monster: MonsterScreen,
    Shop: {
      screen: ShopScreen,
      navigationOptions: {
        header: CustomHeader
      }
    },
    ChangeMonster: {
      screen: ChangeMonsterScreen,
      navigationOptions: {
        header: CustomHeader
      }
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const MainNavigators = createBottomTabNavigator(
  {
    Challenges: ChallengesNavigator,
    Monster: MonsterNavigator,
    Scoreboard: ScoreboardNavigators
  },
  {
    tabBarComponent: CustomTabBar
  }
);

const AuthStack = createStackNavigator(
  { Login: LoginScreen },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default createAppContainer(
  // MainNavigators
  createSwitchNavigator(
    {
      ChooseMonsterScreen,
      WelcomeScreen,
      AuthLoading: AuthLoadingScreen,
      App: MainNavigators,
      Auth: AuthStack
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);
