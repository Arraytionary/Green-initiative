import React from 'react';
import { Text, View, Button } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const displayName = navigation.getParam('displayProfile', '');

  console.log('displayName', displayName);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the App na ja </Text>
      <Text>{displayName}</Text>
      <Button
        onPress={() => {
          navigation.navigate('ChooseMonsterScreen');
        }}
        title='Got it'
      />
    </View>
  );
};

export default WelcomeScreen;
