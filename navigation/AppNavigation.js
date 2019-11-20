import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import ChallengesScreen from '../screens/ChallengesScreen';
import MonsterScreen from '../screens/MonsterScreen';
import ScoreboardScreen from '../screens/ScoreboardScreen';

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
