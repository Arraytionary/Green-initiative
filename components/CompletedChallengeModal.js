import React, {Component} from 'react';
import { Text, TouchableHighlight, View, Alert,AppRegistry, StyleSheet} from 'react-native';
import {Button as Button_Native} from 'react-native'
import { H1, H2, H3, Icon, Button} from 'native-base';
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
        this.uid = firebase.auth().currentUser.uid;
        console.log("uid in modal: ",this.uid);
        this.state =  {
            isModalVisible: false,
            completed: false,
        };

    }
    componentWillMount(){
        console.log("props challengesID", this.props.challengeId)
        console.log("in componentDidmount")
        this.db.collection("users").doc(this.uid).collection("challenges").doc(`challenge_${this.props.challengeId}`).get().then( (doc)=>{
            console.log("in init state from db")
            const data = doc.data();
            this.setState({
                completed: data['completed']
            });
            console.log("value in constructor, completed == ",this.state.completed)
        }).catch(function(error) {
        console.log("line 45, Error getting document:", error);
    });
    }


    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        console.log("toggleModal to isModalVisible == ",this.state.isModalVisible);
    };
    complete = () => {
        this.setState({completed: true});
        console.log("completed the challenge");
        this.db.collection("users").doc(this.uid).collection("challenges").doc("challenge_"+this.props.challengeId).set({
            completed: true
        });
        this.db.collection("users").doc(this.uid).update({
            "points to add": firebase.firestore.FieldValue.increment(this.props.points)
        }).then(()=>{
            console.log(" added points to db")
        }).catch(error =>{
            console.log("error: ",error);
        });

        // dbh.collection('users').doc(uid).collection('monsters').doc(monsterName).get().then(async function(doc){
        //     const data = await doc.data();
        //     setCrrMonsterLv(data['level']);
        //     setCrrProgress(data['crrPoint']);
        //     // getMonsterInfo()
        // })
        // add point to database
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
      
        let mainButton;
        console.log("in render")
        console.log("this.state.completed == ", this.state.completed);
        if (!this.state.completed){

            mainButton = <Button
                style={[this.props.buttonStyle, { backgroundColor: this.props.buttonColor }]}
                onPress={this.toggleModal}
            >
                <Text style={{ color: 'white' }}>Complete</Text>
            </Button>;
        }else{
            mainButton = <Icon type="Entypo" name="check" style={{color:'green'}}/>
        }
        return (

            <View >
                {mainButton}
                {/*<Button*/}
                    {/*style={[this.props.buttonStyle, { backgroundColor: this.props.buttonColor }]}*/}
                    {/*onPress={this.toggleModal}*/}
                {/*>*/}
                    {/*<Text style={{ color: 'white' }}>Complete</Text>*/}
                {/*</Button>*/}
                {/*<Button_Native title="Complete" onPress={this.toggleModal} />*/}
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

                        <Button_Native title="Share" onPress={this.onShare.bind(this)} />
                        <Button_Native title="Back to Challenge" onPress={()=>{this.toggleModal(); this.complete();}} />
                    </View>


                </Modal>
            </View>
        );
    }
}


export default CompletedChallengeModal;