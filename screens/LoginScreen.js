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

const LoginScreen = () => {
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
      <TouchableOpacity onPress={facebookLogIn}>
        <View style={styles.facebookLogoContainer}>
          <FacebookLogo style={styles.facebookLogo} width={30} height={30} />
          <Text style={styles.facebookLogoText}> Sign In With Facebook</Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

async function facebookLogIn() {
  try {
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions
    } = await Facebook.logInWithReadPermissionsAsync("544837729681231", {
      permissions: ["public_profile"]
    });
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );

      const data = await response.json();
      const credential = await firebase.auth.FacebookAuthProvider.credential(
        token
      );
      firebase.auth().signInWithCredential(credential);
      Alert.alert("Logged in!", `Hi ${data.name}!`); // Uncomment this line to see your display name na ja
      // Good place to redirect the account somewhere
    } else {
      // type === 'cancel'
      // User doesn't grant the access using Facebook
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}

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
