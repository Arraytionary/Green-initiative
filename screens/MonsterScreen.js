import React, {Component}  from 'react';
import { Text, Button} from 'native-base';
import Constants from 'expo-constants';
import CompletedChallengeModal from '../components/CompletedChallengeModal'
export default class MonsterScreen extends Component{

    render(){

        return (
            <CompletedChallengeModal />
            // <Text style={{ paddingTop: Constants.statusBarHeight }}> monster </Text>
        )
    }

}


// export default MonsterScreen;
