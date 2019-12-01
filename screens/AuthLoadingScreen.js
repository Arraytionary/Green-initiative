import { useEffect } from 'react';

import firebase from 'firebase';

// / Prepare to check if the user is logged for the first time I will throw them with the welcoming screen;
const AuthLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { lastSignInTime, creationTime } = user.metadata;
        console.log(
          `=================LOG====================\n User was logged in last time: ${lastSignInTime} \n User's account creation : ${creationTime} \n============================================`
        );

        const isFirstTimeLogin = creationTime === lastSignInTime;

        if (user && isFirstTimeLogin) {
          return navigation.navigate({
            routeName: 'WelcomeScreen',

            params: { displayProfile: user.displayName },
          });
        }
      }
      navigation.navigate(user ? 'App' : 'Auth');
    });
  }, [navigation]);

  return null;
};

export default AuthLoadingScreen;
