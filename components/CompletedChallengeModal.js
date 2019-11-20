import React, {Component} from 'react';
import { Text, Button, TouchableHighlight, View, Alert} from 'react-native';
import { H1, H2, H3 } from 'native-base';
import Modal from "react-native-modal";
import { SvgUri } from 'react-native-svg';

class CompletedChallengeModal extends Component {
    state = {
        isModalVisible: false
    };

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Button title="Show modal" onPress={this.toggleModal} />
                <Modal isVisible={this.state.isModalVisible}
                       animationIn="zoomInDown"
                >
                    <View style={{
                        backgroundColor: 'white',
                        flex: 0.5,
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        <SvgUri width="50%" height="50%" uri="https://firebasestorage.googleapis.com/v0/b/the-green-initiative.appspot.com/o/winner%201.svg?alt=media&token=a80ecd9f-e959-4975-9e70-e8c1d74cd353"/>
                        <H2 style={{ color: 'darkcyan' }}>Challenge Completed!</H2>
                        <Text style={{ color: 'darkorange' }}>30 points received</Text>
                        <Button title="Hide modal" onPress={this.toggleModal} />
                    </View>
                    {/*<View style={{*/}
                        {/*flex: ,*/}
                        {/*// flexDirection: 'column',*/}
                        {/*justifyContent: 'center',*/}
                        {/*alignItems: 'center'}}>*/}
                        {/*/!*<H3 style={{ color: 'white' }}>30 points received</H3>*!/*/}
                    {/*</View>*/}
                </Modal>
            </View>
        );
    }
}
export default CompletedChallengeModal;