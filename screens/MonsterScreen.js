import React, { useState, useEffect } from 'react';
import {
  Text,
    Title,
  Content,
    Badge,
    Fab,
  Container,
  H1,
  Button,
  Left,
  Right,
  Body,
  Icon,
} from 'native-base';
import * as Progress from 'react-native-progress';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, Image, View } from 'react-native';
import Goal from '../assets/icons/goal 1.svg';

import SvgUri from 'react-native-svg-uri';
import Monster from './ball.svg';

const MonsterScreen = () => {
  const [crrProgress, setCrrProgress] = useState(0);
  const [crrMonsterName, setCrrMonsterName] = useState('LoL');
  const [crrMonsterLv, setCrrMonster] = useState(0);

  return(
  <Container>
    <Grid>
      <Row
          size={15}
        style={{ justifyContent: 'center', alignItems: 'center', height: 100 }}
      >

          <View style={styles.container}>
            <H1>{crrMonsterName + " Level " + crrMonsterLv}</H1>
          </View>
        {/*<Col size={85}>*/}

        {/*  <View style={styles.container}>*/}
        {/*    <Progress.Bar progress={crrProgress} borderRadius={8} width={300} height={18} />*/}

        {/*  /!*  <Button onPress={()=>setCrrProgress(crrProgress+0.2)}>*!/*/}
        {/*  /!*    <Text>*!/*/}
        {/*  /!*      add Progress*!/*/}
        {/*  /!*    </Text>*!/*/}
        {/*  /!*  </Button>*!/*/}
        {/*  /!*  <Button onPress={()=>setCrrProgress(0)}>*!/*/}
        {/*  /!*  <Text>*!/*/}
        {/*  /!*    reset Progress*!/*/}
        {/*  /!*  </Text>*!/*/}
        {/*  /!*</Button>*!/*/}

        {/*  </View>*/}
        {/*  <Text style={{textAlign: 'right'}}>Collected 12/50</Text>*/}

        {/*</Col>*/}
        {/*<Col size={15}>*/}
        {/*<Goal/>*/}
        {/*</Col>*/}
      </Row>
      <Row size={10}>
        <Col size={85}>

          <View style={styles.container}>
            <Progress.Bar progress={crrProgress} borderRadius={8} width={300} height={18} />

          {/*  <Button onPress={()=>setCrrProgress(crrProgress+0.2)}>*/}
          {/*    <Text>*/}
          {/*      add Progress*/}
          {/*    </Text>*/}
          {/*  </Button>*/}
          {/*  <Button onPress={()=>setCrrProgress(0)}>*/}
          {/*  <Text>*/}
          {/*    reset Progress*/}
          {/*  </Text>*/}
          {/*</Button>*/}

          </View>
          <Text style={{textAlign: 'right'}}>Collected 12/50</Text>

        </Col>
        <Col size={15}>
        <Goal/>
        </Col>
      </Row>
      <Row size={10}/>
      <Row
          size={55}
        style={{
          // backgroundColor: '#1cb71f',
          justifyContent: 'center',
        }}
      >
        {/* <Col> */}
        {/*<View style={{flex:1}}>*/}
          <Fab
              style={{backgroundColor: '#c3c3c3'}}
          position="topRight"
          >
            <Icon
                type= 'Entypo'
                name='shop'/>
          </Fab>
        {/*</View>*/}
        <View>
          <Image
            style={{ width: 300, height: 300 }}
            source={require('../assets/monsters/ball.gif')}
          />
        </View>
        {/* </Col> */}
      </Row>
      <Row size={10}>
        <Col>
          <View style={styles.container}>
        <Button block success>
          <Text>Switch</Text>
        </Button>
          </View>
        </Col>
      </Row>
    </Grid>
    {/* <Grid> */}
    {/*  <Row style={{ backgroundColor: '#1cb71f'}} /> */}
    {/*  <Row style={{ backgroundColor: '#b70003'}} ></Row> */}
    {/* </Grid> */}
  </Container>
);}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default MonsterScreen;
