import React, { useState, useEffect } from 'react';
import {
    Text,
    H2,
    Body,
    Icon
} from 'native-base';

function ModalContent(props) {
    return(
                <Body style={{alignItems: 'center' ,paddingBottom: 15}}>
                    <H2 style={{paddingBottom:12, color:'#15ff8e'}}>Monster level up!</H2>
                        <Text style={{fontWeight:"600", color:'#7f9da6', fontSize:18}}>received {props.leaf} x <Icon name='leaf' type='FontAwesome'style={{color:'green'}}/></Text>
            </Body>
    )
}

export default ModalContent;
