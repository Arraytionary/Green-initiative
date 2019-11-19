import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

var firebaseConfig = {
    apiKey: "AIzaSyBaG6tvIeo4IuKf8jVn6-aoeC8YJsoH6SA",
    authDomain: "the-green-initiative.firebaseapp.com",
    databaseURL: "https://the-green-initiative.firebaseio.com",
    projectId: "the-green-initiative",
    storageBucket: "the-green-initiative.appspot.com",
    messagingSenderId: "558294199922",
    appId: "1:558294199922:web:ac542cc6ff54b621325ceb",
    measurementId: "G-HTRZYYPXKK"
};

class App extends Component{
  render(){
        return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
  }

}
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
