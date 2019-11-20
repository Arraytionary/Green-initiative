import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import ChallengesScreen from "../screens/ChallengesScreen";
import MonsterScreen from "../screens/MonsterScreen";
import ScoreboardScreen from "../screens/ScoreBoardScreen";
import ProfileScreen from "../screens/ProfileScreen";

import TabBar from "../components/TabBar";

const ScoreboardNavigators = createStackNavigator({
  Scoreboard: ScoreboardScreen,
  Profile: ProfileScreen
});

const MainNavigators = createBottomTabNavigator(
  {
    Challenges: ChallengesScreen,
    Monster: MonsterScreen,
    //Change back later too
    Scoreboard: ScoreboardNavigators
  },
  {
    tabBarComponent: TabBar
  }
);

export default createAppContainer(MainNavigators);
