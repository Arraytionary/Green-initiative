import React, { useState, useEffect } from 'react';
import {
  Text,
    Card,
    CardItem,
    Fab,
  Container,
  H1,
    H2,
  Button,
  Icon,
} from 'native-base';
import Modal from 'react-native-modal';
import * as Progress from 'react-native-progress';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, Image, View } from 'react-native';
import Goal from '../assets/icons/goal 1.svg';
import firebase from 'firebase';
import '@firebase/firestore';
import ModalContent from '../components/ModalContent';

const MonsterScreen = () => {
  const dbh = firebase.firestore();
  const uid = 'HHyoObL2Oy9ZVoPsMlqg';
  const [showModal, setShowModal] = useState(false);
  const [monsterSrc, setMonsterSrc] = useState('');
  const [crrProgress, setCrrProgress] = useState(0);
  const [crrBound, setCrrBound] = useState(1);
  const [crrMonsterName, setCrrMonsterName] = useState('earthy');
  const [crrMonsterLv, setCrrMonsterLv] = useState(1);
  const [crrLeaf, setCrrLeaf] = useState(0);
  const [crrMonsterInfo, setCrrMonsterInfo] = useState({'level': 0, 'crrPoint': 0});

  useEffect(() => fetchMonster(),[]);
  useEffect(() => fetchMonsterLevel(crrMonsterName), [crrMonsterName]);
  useEffect(() => getMonsterInfo(), [crrMonsterLv, crrMonsterName]);
  useEffect(() => getProgressToAdd(), []);
  // useEffect(() => addMonsterProgress(), [progressToAdd]);

  let toggleModal = () =>{
    setShowModal(!showModal);
  }

  let fetchMonster = () =>{
    dbh.collection('users').doc(uid).onSnapshot(function(doc){
      setCrrMonsterName(doc.data()['selected monster']);
      setCrrLeaf(doc.data()['leaf'])
      })
      // doc.forEach(docx => {
      //   console.log(docx.data());
      // });
  };

  let fetchMonsterLevel = (monsterName) =>{
    dbh.collection('users').doc(uid).collection('monsters').doc(monsterName).get().then(async function(doc){
      const data = await doc.data();
      setCrrMonsterLv(data['level']);
      setCrrProgress(data['crrPoint']);
      // getMonsterInfo()
    })
  };

  let getMonsterInfo = () =>{
    // if(crrMonsterName && crrMonsterLv) {
      dbh.collection('monsters').doc(crrMonsterName).collection('levels').doc(`${crrMonsterLv}`).get().then(async (snapshot) => {
        const data = await snapshot.data();
        setCrrBound(data['expBound']);
        setMonsterSrc(data['src'])
        // setCrrMonsterInfo(snapshot.data());
      })
    // }
  };

  let getProgressToAdd = () =>{
    dbh.collection('users').doc(uid).onSnapshot(async (snapshot) => {
      const toAdd = await snapshot.data()['points to add'];
      const monsterName = await snapshot.data()['selected monster'];
      const leaf = await snapshot.data()['leaf'];
      dbh.collection('users')
          .doc(uid)
          .collection('monsters')
          .doc(monsterName)
          .get()
          .then(async (query) => {
            console.log(monsterName);
            const crrPoint = await query.data()["crrPoint"];
            const level = await query.data()['level'];
            let bound = 1;
            await dbh.collection('monsters').doc(monsterName).collection('levels').doc(`${level}`).get().then(async (monsterQ) => {
              bound = await monsterQ.data()["expBound"]
            })
            if(toAdd !== 0){
              let newCrrPoint = crrPoint + toAdd;
              if (newCrrPoint >= bound){
                newCrrPoint -= bound
                console.log(`${newCrrPoint}/${crrBound}`);
                levelUp(monsterName, leaf, level);
              }
              dbh.collection('users')
                  .doc(uid)
                  .collection('monsters')
                  .doc(monsterName)
                  .set({
                    crrPoint: newCrrPoint
                  },
                  {merge: true})
                  .then(()=>{
                    dbh.collection('users')
                        .doc(uid)
                        .set({
                          'points to add': 0
                        },
                        {merge: true}
                        )
                    fetchMonsterLevel(monsterName, leaf);
                  }
                  )
            }
          })
    })
  };

  let levelUp = (monsterName, leaf, level) =>{
    setCrrLeaf(leaf + 1);
    dbh.collection('users')
        .doc(uid)
        .collection('monsters')
        .doc(monsterName)
        .set({level: level + 1}, {merge: true})
        .then(()=>{
            dbh.collection('users')
                .doc(uid)
                .set({leaf: leaf + 1}, {merge: true})
                .then(
                    toggleModal()
            )}
        )
  };

  let addMonsterProgress = () =>{
    dbh.collection('users').doc(uid).collection('monsters').doc(crrMonsterName).set({
      crrPoint: crrProgress + progressToAdd
    }, {merge: true})
  };

  return(
  <Container style={{backgroundColor: '#fff'}}>
    <Grid>
      <Modal isVisible={showModal}>
        <Card >
          <H2 style={{textAlign: 'right', paddingRight: 10}} onPress={()=>toggleModal()}>X</H2>
          <CardItem style={{paddingBottom: 10}}>
            <ModalContent leaf='1'></ModalContent>
          </CardItem>


        </Card>
      </Modal>
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
        <Col size={85}
             style={{padding: 10}}
        >

          {/*<View style={styles.container}>*/}
            <Progress.Bar progress={crrProgress/crrBound} borderRadius={8} width={null} height={18} />

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

          {/*</View>*/}
          <Text style={{textAlign: 'right'}}>Collected {crrProgress}/{crrBound}</Text>
          <Text style={{textAlign: 'right'}}>{crrLeaf}x <Icon name='leaf' type='FontAwesome'style={{color:'green'}}/></Text>

        </Col>
        <Col size={15}>
        <Goal/>
        </Col>
      </Row>
      <Row size={5}/>
      <Row
          size={65}
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
            style={{ width: 400, height: 350 }}
            source={{uri: monsterSrc}}
              // source={require('../assets/monsters/ball.gif')}
          />
        </View>
        {/* </Col> */}
      </Row>
      <Row size={10}>
        <Col>
          <View style={styles.container}>
        <Button block success>
          <Text>Switch </Text>
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
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default MonsterScreen;
