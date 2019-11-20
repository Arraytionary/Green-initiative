import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import ProfilePhoto from "../assets/icons/profile_photo.svg";
import GemPhoto from "../assets/icons/gem-solid 1.svg";
import GlassPhoto from "../assets/icons/glass-whiskey-solid 1.svg";
import BagPhoto from "../assets/icons/shopping-bag-solid 1.svg";

export default class Profile extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          borderWidth: 2
        }}
      >
        <View
          style={{
            borderWidth: 2,
            flex: 2,
            justifyContent: "center",
            backgroundColor: "powderblue"
          }}
        >
          <ProfilePhoto style={styles.avatar} />
        </View>
        <View
          style={{
            borderWidth: 2,
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            width: "80%"
          }}
        >
          <View style={{ flex: 1, borderWidth: 2, borderColor: "red" }}>
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <GemPhoto />
              <Text>100</Text>
              <Text>Gem Collected</Text>
            </View>
          </View>
          <View style={{ flex: 1, borderWidth: 2, borderColor: "black"  }}>
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <BagPhoto />

              <Text>100</Text>
              <Text>Bag Saved</Text>
            </View>
          </View>
          <View style={{ flex: 1, borderWidth: 2, borderColor: "purple"  }}>
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <GlassPhoto />
              <Text>100</Text>
              <Text>Cup Saved</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 3, backgroundColor: "steelblue" }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: "#3EBD93",
    height: 180
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 82,
    borderColor: "white",
    alignSelf: "center",
    position: "absolute"
  },
  body: {
    flex: 2,
    marginTop: 40
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center"
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF"
  }
});
