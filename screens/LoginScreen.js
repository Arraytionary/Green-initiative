import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Facebook from 'expo-facebook';
import firebase from 'firebase';
import 'firebase/firestore';

import LeafLogo from '../assets/icons/leaf.svg';
import FacebookLogo from '../assets/icons/facebook.svg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    marginBottom: 11
  },
  textLogo: {
    color: '#0C6B58',
    fontStyle: 'normal',
    fontSize: 52,
    fontWeight: '300',
    lineHeight: 64,
    letterSpacing: 0.002,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4
  },
  facebookLogoContainer: {
    width: 268,
    height: 42,
    marginTop: 62,
    backgroundColor: '#3B5998',
    flexDirection: 'row',

    alignItems: 'center',
    borderRadius: 3
  },
  facebookLogo: {
    marginLeft: 20,
    marginRight: 30
  },
  facebookLogoText: {
    color: 'white'
  }
});

const LoginScreen = () => {
  const signInWithFacebook = async () => {
    const appId = '523523305157137';
    const permissions = ['public_profile', 'email']; // Permissions required, consult Facebook docs

    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      appId,
      {
        permissions
      }
    );

    switch (type) {
      case 'success': {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL); // Set persistent auth state
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const facebookProfileData = await firebase
          .auth()
          .signInWithCredential(credential); // Sign in with Facebook credential
        // console.log(facebookProfileData);
        const db = firebase.firestore();
        var uid = firebase.auth().currentUser.uid;

        var docRef = db.collection('users').doc(uid);

        docRef
          .get()
          .then(function(doc) {
            if (doc.exists) {
              // console.log("user already existed: ", doc.data());
            } else {
              // doc.data() will be undefined in this case
              docRef
                .set({
                  uid: uid,
                  displayName: firebase
                    .auth()
                    .currentUser.displayName.split(' ')[0],
                  'points to add': 0,
                  leaf: 0,
                  'selected monster': 'earthy'
                })
                .then(function() {
                  // console.log("new user is added!");
                });
              docRef
                .collection('challenges')
                .doc('challenge_1')
                .set({
                  completed: false
                });
              docRef
                .collection('challenges')
                .doc('challenge_2')
                .set({
                  completed: false
                });
              docRef
                .collection('challenges')
                .doc('challenge_3')
                .set({
                  completed: false
                });
              // console.log("No such document!");
            }
          })
          .catch(function(error) {
            // console.log("Error getting document:", error);
          });

        break;
      }
      case 'cancel': {
        // console.log('cancel');
        break;
      }
      default: {
        // console.log('default case triggered');
      }
    }
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={['#EFFCF6', '#8EEDC7', '#147D64']}
      start={[0.1, 0.2]}
    >
      <LeafLogo style={styles.logo} width={130} height={116} />
      <Text style={styles.textLogo}>The Green </Text>
      <Text style={styles.textLogo}> Initiative </Text>
      <TouchableOpacity onPress={signInWithFacebook}>
        <View style={styles.facebookLogoContainer}>
          <FacebookLogo style={styles.facebookLogo} width={30} height={30} />
          <Text style={styles.facebookLogoText}> Sign In With Facebook</Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default LoginScreen;
