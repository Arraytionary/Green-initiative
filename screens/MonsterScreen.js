import React, { useState } from 'react';
import {
  Text,
  Card,
  CardItem,
  Fab,
  Container,
  H1,
  H2,
  Button,
  Icon
} from 'native-base';
import Modal from 'react-native-modal';
import * as Progress from 'react-native-progress';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, Image, View, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import { NavigationEvents } from 'react-navigation';
import Constants from 'expo-constants';
import Goal from '../assets/icons/goal 1.svg';
import ModalContent from '../components/ModalContent';

const MonsterScreen = props => {
  const db = firebase.firestore();
  const { uid } = firebase.auth().currentUser;
  const userRef = db.collection('users').doc(uid);
  const [showModal, setShowModal] = useState(false);
  // const [monsterSrc, setMonsterSrc] = useState('');
  // const [crrProgress, setCrrProgress] = useState(0);
  // const [crrBound, setCrrBound] = useState(1);
  // const [crrMonsterName, setCrrMonsterName] = useState('');
  // const [crrMonsterLv, setCrrMonsterLv] = useState(1);
  // const [crrLeaf, setCrrLeaf] = useState(0);
  // const [crrMonsterInfo, setCrrMonsterInfo] = useState({
  //   level: 0,
  //   crrPoint: 0,
  // });

  const [user, setUser] = useState({
    displayName: '',
    leaf: 0,
    pointsToAdd: 0,
    selectedMonster: '',
    uid: ''
  });
  const [monster, setMonster] = useState({
    name: '',
    crrPoint: 0,
    level: 0,
    progress: 1,
    image: '',
    bound: 1
  });
  const [loading, setLoading] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const fetchUserAndMonster = async () => {
    const userDoc = await userRef.get();
    setUser(userDoc.data());
    const monDoc = await userRef
      .collection('monsters')
      .doc(userDoc.data().selectedMonster)
      .get();
    setMonster({ ...monDoc.data(), name: monDoc.id });
  };

  const handleOnFocus = async () => {
    setLoading(true);
    await fetchUserAndMonster();
    setLoading(false);
  };

  const styles = StyleSheet.create({
    container: {
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });

  // const fetchMonsterLevel = useCallback(monsterName => {
  //   dbh
  //     .collection('users')
  //     .doc(uid)
  //     .collection('monsters')
  //     .doc(monsterName)
  //     .get()
  //     .then(async function(doc) {
  //       const data = await doc.data();
  //       setCrrMonsterLv(data.level);
  //       setCrrProgress(data.crrPoint);
  //       // getMonsterInfo()
  //     });
  // });

  // const getMonsterInfo = () => {
  //   // if(crrMonsterName && crrMonsterLv) {
  //   dbh
  //     .collection('monsters')
  //     .doc(crrMonsterName)
  //     .collection('levels')
  //     .doc(`${crrMonsterLv}`)
  //     .get()
  //     .then(async snapshot => {
  //       const data = await snapshot.data();
  //       setCrrBound(data.expBound);
  //       setMonsterSrc(data.src);
  //       // setCrrMonsterInfo(snapshot.data());
  //     });
  //   // }
  // };

  // const getProgressToAdd = () => {
  //   dbh
  //     .collection('users')
  //     .doc(uid)
  //     .get()
  //     .then(async snapshot => {
  //       const toAdd = await snapshot.data()['points to add'];
  //       const monsterName = await snapshot.data().selectedMonster;
  //       const leaf = await snapshot.data().leaf;
  //       dbh
  //         .collection('users')
  //         .doc(uid)
  //         .collection('monsters')
  //         .doc(monsterName)
  //         .get()
  //         .then(async query => {
  //           // console.log(monsterName);
  //           const crrPoint = await query.data().crrPoint;
  //           const level = await query.data().level;
  //           let bound = 1;
  //           await dbh
  //             .collection('monsters')
  //             .doc(monsterName)
  //             .collection('levels')
  //             .doc(`${level}`)
  //             .get()
  //             .then(async monsterQ => {
  //               bound = await monsterQ.data().expBound;
  //             });
  //           if (toAdd !== 0) {
  //             let newCrrPoint = crrPoint + toAdd;
  //             if (newCrrPoint >= bound) {
  //               newCrrPoint -= bound;
  //               // console.log(`${newCrrPoint}/${crrBound}`);
  //               levelUp(monsterName, leaf, level);
  //             }
  //             dbh
  //               .collection('users')
  //               .doc(uid)
  //               .collection('monsters')
  //               .doc(monsterName)
  //               .set(
  //                 {
  //                   crrPoint: newCrrPoint
  //                 },
  //                 { merge: true }
  //               )
  //               .then(() => {
  //                 dbh
  //                   .collection('users')
  //                   .doc(uid)
  //                   .set(
  //                     {
  //                       'points to add': 0
  //                     },
  //                     { merge: true }
  //                   );
  //                 fetchMonsterLevel(monsterName, leaf);
  //               });
  //           }
  //         });
  //     });
  // };

  // const levelUp = (monsterName, leaf, level) => {
  //   setCrrLeaf(leaf + 1);
  //   dbh
  //     .collection('users')
  //     .doc(uid)
  //     .collection('monsters')
  //     .doc(monsterName)
  //     .set({ level: level + 1 }, { merge: true })
  //     .then(() => {
  //       dbh
  //         .collection('users')
  //         .doc(uid)
  //         .set({ leaf: leaf + 1 }, { merge: true })
  //         .then(toggleModal());
  //     });
  // };

  // const addMonsterProgress = () => {
  //   dbh
  //     .collection('users')
  //     .doc(uid)
  //     .collection('monsters')
  //     .doc(crrMonsterName)
  //     .set(
  //       {
  //         crrPoint: crrProgress + progressToAdd
  //       },
  //       { merge: true }
  //     );
  // };

  // useEffect(() => fetchMonster(), []);
  // useEffect(() => fetchMonsterLevel(crrMonsterName), [
  //   crrMonsterName,
  //   fetchMonsterLevel
  // ]);
  // useEffect(() => getMonsterInfo(), [
  //   crrMonsterLv,
  //   crrMonsterName,
  //   getMonsterInfo
  // ]);
  // useEffect(() => getProgressToAdd(), [getProgressToAdd]);

  // useEffect(() => addMonsterProgress(), [progressToAdd]);

  const renderScreen = () => {
    if (loading) {
      return <ActivityIndicator size='large' color='#0000ff' />;
    }

    return (
      <Grid>
        <Modal>
          <Card>
            <H2
              style={{ textAlign: 'right', paddingRight: 10 }}
              onPress={() => toggleModal()}
            >
              X
            </H2>
            <CardItem style={{ paddingBottom: 10 }}>
              <ModalContent leaf='1'></ModalContent>
            </CardItem>
          </Card>
        </Modal>
        <Row
          size={15}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 100
          }}
        >
          <View style={styles.container}>
            <H1>{`${monster.name} Level ${monster.level}`}</H1>
          </View>
        </Row>
        <Row size={10}>
          <Col size={85} style={{ padding: 10 }}>
            {/* <View style={styles.container}> */}
            <Progress.Bar
              progress={monster.progress / monster.bound}
              borderRadius={8}
              width={null}
              height={18}
            />
            <Text style={{ textAlign: 'right' }}>
              Collected {monster.progress}/{monster.bound}
            </Text>
            <Text style={{ textAlign: 'right' }}>
              {user.leaf}x{' '}
              <Icon name='leaf' type='FontAwesome' style={{ color: 'green' }} />
            </Text>
          </Col>
          <Col size={15}>
            <Goal />
          </Col>
        </Row>
        <Row size={5} />
        <Row
          size={65}
          style={{
            justifyContent: 'center'
          }}
        >
          <View>
            <Image
              style={{ width: 400, height: 350 }}
              source={{ uri: monster.image }}
            />
          </View>
          <Fab
            style={{ backgroundColor: '#c3c3c3' }}
            position='topRight'
            onPress={() => props.navigation.navigate('Shop')}
          >
            <Icon type='Entypo' name='shop' />
          </Fab>
        </Row>
        <Row size={10}>
          <Col>
            <View style={styles.container}>
              <Button
                block
                success
                onPress={() => props.navigation.navigate('ChangeMonster')}
              >
                <Text>Switch </Text>
              </Button>
            </View>
          </Col>
        </Row>
      </Grid>
    );
  };

  return (
    <Container
      style={{ backgroundColor: '#fff', paddingTop: Constants.statusBarHeight }}
    >
      <NavigationEvents
        onDidFocus={() => {
          handleOnFocus();
        }}
      />
      {renderScreen()}
    </Container>
  );
};
export default MonsterScreen;
