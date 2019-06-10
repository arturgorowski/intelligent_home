import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const window = Dimensions.get('screen');

export default class TV extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleStyle: {
        alignSelf: 'center',
        //textAlign: 'center',
        flex: 1
      },
      title: 'TV',
      headerStyle: {
        backgroundColor: '#287bef',
      },
      headerTintColor: '#fff',
      headerTintStyle: {
        //fontWeight: 'bold',
      },
      headerLeft: (
        <Ionicons style={{ marginLeft: 15 }} name="ios-arrow-back" size={30} color="#fff"
          onPress={() => navigation.goBack()} />
      )
    }
  };

  state = {
    status: true,
    temperatureValue: 18,
    modeStatus: true,
    nightStatus: false
  }

  onPress() {
    const newState = !this.state.status
    this.setState({ status: newState })
  }

  render() {
    const { status, temperatureValue, modeStatus, nightStatus } = this.state
    const textValue = status ? "OFF" : "ON"
    const onOffColor = status ? "#f42c2c" : "#86f442"
    const modeValue = mode = modeStatus ? 'warming' : "ECO"

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#287bef" barStyle="light-content" />
        <View style={styles.tileColumn}>

          <View style={styles.firstTileColumn}>

            <TouchableOpacity style={styles.firstTile} onPress={() => this.onPress()}>
              <Text style={{ color: onOffColor, fontSize: 30 }} >{textValue}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.firstTile}>
              <Text style={styles.firstTileText}>Mode</Text>
            </TouchableOpacity>

            <View style={styles.secondTile}>

              <TouchableOpacity>
                <Ionicons name="ios-arrow-up" size={30} />
              </TouchableOpacity>

              <Text style={styles.secondTileText}>Channel</Text>

              <TouchableOpacity>
                <Ionicons name="ios-arrow-down" size={30} />
              </TouchableOpacity>

            </View>

          </View>

          <View style={styles.secondTileColumn}>
            <TouchableOpacity style={styles.firstTile}>
              <Text>Source</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.firstTile}>
              <Text style={styles.firstTileText}>Mute</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.firstTile}>
              <Ionicons style={{ paddingTop: 10 }} name="md-home" size={30} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.middleEmptyTile}>

            </TouchableOpacity>

            <TouchableOpacity style={styles.firstTile}>
              <Ionicons style={{ paddingBottom: 10 }} name="md-return-left" size={30} />
            </TouchableOpacity>

          </View>

          <View style={styles.thirdTileColumn}>

            <TouchableOpacity style={styles.firstTile}>
              <Text style={styles.firstTileText} >Keyboard</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.firstTile}>
              <Text style={styles.firstTileText}>More</Text>
            </TouchableOpacity>

            <View style={styles.secondTile}>

              <TouchableOpacity>
                <Ionicons style={{ paddingTop: 10 }} name="ios-add" size={40} />
              </TouchableOpacity>

              <Text style={styles.secondTileText}>Volume</Text>

              <TouchableOpacity>
                <Ionicons style={{ paddingBottom: 10 }} name="ios-remove" size={40} />
              </TouchableOpacity>

            </View>
          </View>
        </View>

        <View style={styles.circle}>
          <View style={styles.circleButton}>

            <View style={styles.firstLineCircle}>
              <TouchableOpacity style={styles.ok}>
                
                <MaterialCommunityIcons style={{ paddingTop: 15}} name={'arrow-up'} size={35}/>
              </TouchableOpacity>
            </View>

            <View style={styles.secondLineCircle}>

              <TouchableOpacity style={styles.ok}>
                <MaterialCommunityIcons style={{ paddingTop: 27, paddingLeft: 20}} name={'arrow-left'} size={35}/>
              </TouchableOpacity>

              <View style={styles.circleButtonSecond}>
                <TouchableOpacity style={styles.ok}>
                  <Text style={{ paddingTop: 27, paddingLeft: 28, fontSize: 30 }}>OK</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.ok}>
                <MaterialCommunityIcons style={{ paddingTop: 27, paddingRight: 20}} name={'arrow-right'} size={35}/>
              </TouchableOpacity>

            </View>

            <View style={styles.thirdLineCircle}>
              <TouchableOpacity style={styles.ok}>
                <MaterialCommunityIcons style={{ paddingTop: 52}} name={'arrow-down'} size={35}/>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column'
    //justifyContent: 'center',
    //alignItems: 'center'
  },
  tileColumn: {
    //flex: 1,
    flexDirection: 'row',
  },
  firstTileColumn: {
    //flex: 1,
    flexDirection: 'column',
  },
  secondTileColumn: {
    //flex: 1,
    flexDirection: 'column',
  },
  thirdTileColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  firstTile: {
    width: ((window.width) - 12) / 3,
    height: 50,
    margin: 2,
    borderRadius: 4,
    borderWidth: 0.1,
    borderColor: '#838c99',
    backgroundColor: "white",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  middleEmptyTile: {
    width: ((window.width) - 12) / 3,
    height: 50,
    margin: 2,
    marginBottom: 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondTile: {
    width: ((window.width) - 12) / 3,
    height: 160,
    margin: 2,
    borderRadius: 4,
    borderWidth: 0.1,
    borderColor: '#838c99',
    backgroundColor: "white",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  thirdTileRows: {
    flexDirection: 'row'
  },
  circle: {
    display: 'flex',
    alignItems: 'center',
    //alignContent: 'center',
    //justifyContent: 'center'
  },
  circleButton: {
    alignItems: 'center',
    marginTop: 50,
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 0.1,
    borderColor: '#838c99',
  },
  circleButtonSecond: {
    flexDirection: 'row',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 0.1,
    borderColor: '#838c99',
  },
  ok: {
    //marginTop: 28,
    alignItems: 'center',
    //alignContent: 'center'
  },
  firstLineCircle: {

  },
  secondLineCircle: {
    width: 300,
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'space-between'

  },
  thirdLineCircle: {

  }


});