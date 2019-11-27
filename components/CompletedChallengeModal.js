import React, {Component} from 'react';
import { Text, Button, TouchableHighlight, View, Alert,AppRegistry, StyleSheet} from 'react-native';
import { H1, H2, H3, Icon } from 'native-base';
import Modal from "react-native-modal";
import { SvgUri } from 'react-native-svg';
import firebase from 'firebase';
import 'firebase/firestore';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
const image_source ='https://firebasestorage.googleapis.com/v0/b/the-green-initiative.appspot.com/o/The%20Green%20Initiative.png?alt=media&token=dc455bd9-b5bb-4222-b693-f25abb5d0311'


class CompletedChallengeModal extends Component {
    constructor(props) {
        super(props);
        this.db = firebase.firestore();
        this.styles = StyleSheet.create({
            screen: {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            },
            item: {
                borderRadius: 14,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            },
            text: {
                fontSize: 50,
                fontWeight: 'bold',
            },
            button: {
                justifyContent: 'center',
                borderRadius: 24,
                width: 156,
                height: 56,
            },
        });
        this.state =  {
            isModalVisible: false,
        };
    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        console.log("toggleModal to isModalVisible == ",this.state.isModalVisible);
    };
    onShare(){
        console.log('FileSystem.documentDirectory ', FileSystem.documentDirectory)
        console.log('image_source',image_source);
        FileSystem.downloadAsync(
            image_source,
            FileSystem.documentDirectory + 'joinme.png'
        )
            .then(({ uri }) => {
                console.log('Finished downloading to ', uri);

                Sharing.shareAsync(uri);
            })
            .catch(error => {
                console.error(error);
            });
    }
    render() {
        return (

            <View >

                <Button title="Complete" onPress={this.toggleModal} />
                <Modal isVisible={this.state.isModalVisible}
                       animationIn="zoomInDown"
                >
                    <View style={{
                        backgroundColor: 'white',
                        // flex: 0.5,
                       justifyContent: 'center',
                        alignItems: 'center'}}>
                        {/*<Text style={{textAlign: 'right'}}><Icon style={{textAlign: "right"}} name="close" type="AntDesign"/></Text>*/}
                        <SvgUri width="50%" height="50%" uri="https://firebasestorage.googleapis.com/v0/b/the-green-initiative.appspot.com/o/winner%201.svg?alt=media&token=a80ecd9f-e959-4975-9e70-e8c1d74cd353"/>
                        <H1 style={{ color: 'darkcyan'}}>Challenge Completed!</H1>
                        <H3 style={{ color: 'darkorange'}}>30 points received</H3>

                        <Button title="Share" onPress={this.onShare.bind(this)} />
                        <Button title="Back to Challenge" onPress={this.toggleModal} />
                    </View>


                </Modal>
            </View>
        );
    }
}


export default CompletedChallengeModal;