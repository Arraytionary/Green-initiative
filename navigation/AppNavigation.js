import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import CustomHeader from '../components/CustomHeader';
import ChallengesScreen from '../screens/ChallengesScreen';
import MonsterScreen from '../screens/MonsterScreen';
import ScoreboardScreen from '../screens/ScoreboardScreen';
import ProfileScreen from '../screens/ProfileScreen';

import TabBar from '../components/TabBar';

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

export default createAppContainer(MainNavigators);
