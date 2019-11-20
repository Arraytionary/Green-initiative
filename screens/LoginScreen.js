import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  View,
  Alert,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import * as Facebook from "expo-facebook";
import * as Font from "expo-font";
import * as firebase from "firebase";

import LeafLogo from "../assets/icons/leaf.svg";
import FacebookLogo from "../assets/icons/facebook.svg";

const LoginScreen = ({ navigation }) => {
  const [fontReady, setFontReady] = useState(false);

  const loadFont = async () => {
    await Font.loadAsync({
      "monstserrat-light": require("../assets/fonts/Montserrat/Montserrat-Light.ttf")
    });
    setFontReady(true);
  };

  useEffect(() => {
    // Update the document title using the browser API
    loadFont();
  });

  const signInWithFacebook = async () => {
    const appId = "523523305157137";
    const permissions = ["public_profile", "email"]; // Permissions required, consult Facebook docs

    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      appId,
      {
        permissions
      }
    );

    switch (type) {
      case "success": {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL); // Set persistent auth state
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const facebookProfileData = await firebase
          .auth()
          .signInWithCredential(credential); // Sign in with Facebook credential
        console.log(facebookProfileData);
        break;
        // Do something with Facebook profile data
        // OR you have subscribed to auth state change, authStateChange handler will process the profile data
      }
      case "cancel": {
        console.log("cancel");
        break;
      }
      default: {
        console.log("default case triggered");
      }
    }
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={["#EFFCF6", "#8EEDC7", "#147D64"]}
      start={[0.1, 0.2]}
    >
      <LeafLogo style={styles.logo} width={130} height={116} />
      {fontReady ? (
        <>
          <Text style={styles.textLogo}>The Green </Text>
          <Text style={styles.textLogo}> Initiative </Text>
        </>
      ) : null}
      <TouchableOpacity onPress={signInWithFacebook}>
        <View style={styles.facebookLogoContainer}>
          <FacebookLogo style={styles.facebookLogo} width={30} height={30} />
          <Text style={styles.facebookLogoText}> Sign In With Facebook</Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    marginBottom: 11
  },
  textLogo: {
    fontFamily: "monstserrat-light",
    color: "#0C6B58",
    fontStyle: "normal",
    fontSize: 52,
    fontWeight: "300",
    lineHeight: 64,
    letterSpacing: 0.002,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4
  },
  facebookLogoContainer: {
    width: 268,
    height: 42,
    marginTop: 62,
    backgroundColor: "#3B5998",
    flexDirection: "row",

    alignItems: "center",
    borderRadius: 3
  },
  facebookLogo: {
    marginLeft: 20,
    marginRight: 30
  },
  facebookLogoText: {
    color: "white"
  }
});

export default LoginScreen;
