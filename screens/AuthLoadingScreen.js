import React, { Component } from "react";
import * as firebase from "firebase";

class AuthLoadingScreen extends Component {
  componentDidMount() {
    console.log(this.props);
    firebase.auth().onAuthStateChanged(user => {
      console.log("user", user);
      this.props.navigation.navigate(user ? "App" : "Auth");
    });
  }

  render() {
    return null;
  }
}

export default AuthLoadingScreen;
