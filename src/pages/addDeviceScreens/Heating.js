import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, StatusBar, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const window = Dimensions.get('screen');

export default class Heating extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleStyle: {
        alignSelf: 'center',
        //textAlign: 'center',
        flex: 1
      },
      title: 'Heating',
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
  onPressMode() {
    const newState = !this.state.modeStatus
    this.setState({ modeStatus: newState })
  }

  increase() {
    if (this.state.temperatureValue < 30) {
      this.setState({ temperatureValue: this.state.temperatureValue + 1 })
    }
  }

  decrease() {
    if (this.state.temperatureValue > 16) {
      this.setState({ temperatureValue: this.state.temperatureValue - 1 })
    }
  }
  nigthMode() {
    const newState = !this.state.nightStatus
    this.setState({ nightStatus: newState })
  }

  render() {
    const { status, temperatureValue, modeStatus, nightStatus } = this.state
    const textValue = status ? "OFF" : "ON"
    const onOffColor = status ? "#f42c2c" : "#86f442"
    const modeValue = mode = modeStatus ? 'warming' : "ECO"

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#287bef" barStyle="light-content" />

        {
          status ?
            <TouchableOpacity style={styles.information}>
              <Text style={{ fontSize: 50, color: 'black', opacity: 1.0 }}>{temperatureValue}</Text>
              <Text style={{ fontSize: 25, paddingBottom: 20, color: 'black', opacity: 1.0 }}>°C</Text>
              <Text style={{ fontSize: 27, paddingTop: 20, color: 'black', opacity: 1.0 }}>{modeValue}</Text>
              {nightStatus ? <Ionicons style={{ paddingLeft: 30, paddingTop: 120, color: 'black', opacity: 1.0 }} name='ios-moon' size={30} /> : <Text></Text>}
            </TouchableOpacity>
            : 
            <TouchableOpacity style={styles.information}>
              <Text style={{ fontSize: 27, color: 'black', opacity: 1.0 }}>heating is off</Text>
            </TouchableOpacity>
        }


        <View style={styles.firstTileRows}>
          <TouchableOpacity style={styles.firstTile} onPress={() => this.onPress()}>
            <Text style={{ color: onOffColor, fontSize: 30 }} >{textValue}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.firstTile} onPress={() => this.onPressMode()}>
            <Text style={styles.firstTileText}>Mode</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.secondTile}>
          <TouchableOpacity onPress={() => this.decrease()}>
            <MaterialCommunityIcons style={styles.tileIcon} name={'minus-box'} size={35} color="#4F8EF7" />
          </TouchableOpacity>

          <Text style={styles.secondTileText}>Temperature</Text>

          <TouchableOpacity onPress={() => this.increase()}>
            <MaterialCommunityIcons style={styles.tileIcon} name={'plus-box'} size={35} color="#4F8EF7" />
          </TouchableOpacity>
        </View>

        <View style={styles.thirdTileRows}>
          <TouchableOpacity style={styles.thirdTile}>
            <Text style={styles.thirdTileText}>Timer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.thirdTile} onPress={() => this.nigthMode()}>
            <Text style={styles.thirdTileText}>Night</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.thirdTile}>
            <Text style={styles.thirdTileText}>More option</Text>
          </TouchableOpacity>
        </View>


      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: "#edf0f4",
    height: window.height,
    alignItems: 'center',
    //justifyContent: "center"
  },
  information: {
    width: (window.width) - 4,
    height: 200,
    margin: 2,
    paddingLeft: 15,
    borderRadius: 4,
    borderWidth: 0.1,
    borderColor: '#838c99',
    backgroundColor: "#f2f2f2",
    opacity: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInformation: {
    fontSize: 27
  },
  firstTileRows: {
    flexDirection: 'row'
  },
  firstTile: {
    width: ((window.width) - 8) / 2,
    height: 160,
    margin: 2,
    borderRadius: 4,
    borderWidth: 0.1,
    borderColor: '#838c99',
    backgroundColor: "white",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondTile: {
    width: (window.width) - 4,
    height: 160,
    margin: 2,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 4,
    borderWidth: 0.1,
    borderColor: '#838c99',
    backgroundColor: "white",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  thirdTileRows: {
    flexDirection: 'row'
  },
  thirdTile: {
    width: ((window.width) - 12) / 3,
    height: 160,
    margin: 2,
    borderRadius: 4,
    borderWidth: 0.1,
    borderColor: '#838c99',
    backgroundColor: "white",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  firstTileText: {
    fontSize: 24
  },
  secondTileText: {
    fontSize: 22
  },
  thirdTileText: {
    fontSize: 18
  }

});