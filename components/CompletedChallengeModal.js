import React, {Component} from 'react';
import { Text, Button, TouchableHighlight, View, Alert,AppRegistry, StyleSheet} from 'react-native';
import { H1, H2, H3 } from 'native-base';
import Modal from "react-native-modal";
import { SvgUri } from 'react-native-svg';
// import {AppRegistry, StyleSheet, Text, TouchableHighlight, View,} from 'react-native';
import {LoginButton, ShareDialog} from 'react-native-fbsdk';

class CompletedChallengeModal extends Component {
    constructor(props) {
        super(props);
        const shareLinkContent = {
            contentType: 'link',
            contentUrl: 'https://www.facebook.com/',
            contentDescription: 'Facebook sharing is easy!'
        };

        this.state =  {
            isModalVisible: false,
            shareLinkContent: shareLinkContent,
        };
    }


    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    shareLinkWithShareDialog() {
        var tmp = this;

        console.log(tmp.state.shareLinkContent);
        ShareDialog.canShow(this.state.shareLinkContent).then(
            function(canShow) {
                if (canShow) {
                    return ShareDialog.show(tmp.state.shareLinkContent);
                }
            }
        ).then(
            function(result) {
                if (result.isCancelled) {
                    alert('Share cancelled');
                } else {
                    alert('Share success with postId: ' + result.postId);
                }
            },
            function(error) {
                alert('Share fail with error: ' + error);
            }
        );
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
                        <SvgUri width="50%" height="50%" uri="https://firebasestorage.googleapis.com/v0/b/the-green-initiative.appspot.com/o/winner%201.svg?alt=media&token=a80ecd9f-e959-4975-9e70-e8c1d74cd353"/>
                        <H2 style={{ color: 'darkcyan' }}>Challenge Completed!</H2>
                        <Text style={{ color: 'darkorange' }}>30 points received</Text>
                        <Button title="Hide modal" onPress={this.toggleModal} />
                        <TouchableHighlight onPress={this.shareLinkWithShareDialog.bind(this)}>
                            <Text style={styles.shareText}>Share link with ShareDialog</Text>
                        </TouchableHighlight>
                    </View>


                </Modal>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    shareText: {
        fontSize: 20,
        margin: 10,
    },
});

export default CompletedChallengeModal;