import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const window = Dimensions.get('screen');

export default class AirConditioning extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleStyle: {
        alignSelf: 'center',
        //textAlign: 'center',
        flex: 1
      },
      title: 'Air conditioning',
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
    nightStatus: false,

    modeView: 'Fan',
    iconMode: 'fan',
    counterMode: 0,

    directionView: 'Up',
    iconDirection: 'arrow-top-right',
    counterDirection: 0,

    speedView: 'Slow',
    iconSpeed: 'signal-cellular-1',
    counterSpeed: 0,


  }

  onPress() {
    const newState = !this.state.status
    this.setState({ status: newState })
  }

  onPressMode() {
    const mode = ['Dry', 'Cool', 'Heat']
    const icon = ['water-off', 'air-conditioner', 'fire']
    if (this.state.counterMode < 3) {
      this.setState({
        counterMode: this.state.counterMode + 1,
        modeView: mode[this.state.counterMode],
        iconMode: icon[this.state.counterMode]
      })
    }
    else {
      this.setState({
        counterMode: 0,
        modeView: 'Fan',
        iconMode: 'fan'
      })
    }
  }

  speedMode() {
    const speed = ['Medium', 'Fast', 'Auto']
    const icon = ['signal-cellular-2', 'signal-cellular-3', 'alpha-a']
    if (this.state.counterSpeed < 3) {
      this.setState({
        counterSpeed: this.state.counterSpeed + 1,
        speedView: speed[this.state.counterSpeed],
        iconSpeed: icon[this.state.counterSpeed]
      })
    }
    else {
      this.setState({
        counterSpeed: 0,
        speedView: 'Slow',
        iconSpeed: 'signal-cellular-1'
      })
    }
  }

  directionMode() {
    const direction = ['Middle', 'Down']
    const icon = ['arrow-right', 'arrow-bottom-right']
    if (this.state.counterDirection < 2) {
      this.setState({
        counterDirection: this.state.counterDirection + 1,
        directionView: direction[this.state.counterDirection],
        iconDirection: icon[this.state.counterDirection]
      })
    }
    else {
      this.setState({
        counterDirection: 0,
        directionView: 'Up',
        iconDirection: 'arrow-top-right'
      })
    }
  }

  sweepMode() {

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
    const { status, temperatureValue, nightStatus, modeView, iconMode, directionView, iconDirection, speedView, iconSpeed } = this.state
    const textValue = status ? "OFF" : "ON"
    const onOffColor = status ? "#f42c2c" : "#86f442"

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#287bef" barStyle="light-content" />

        {
          status ?
            <TouchableOpacity style={styles.information}>

              <View style={styles.informationFirstContainer}>
                <Text style={{ fontSize: 65, color: 'black', opacity: 1.0 }}>{temperatureValue}</Text>
                <Text style={{ fontSize: 20, paddingBottom: 20, color: 'black', opacity: 1.0 }}>°C</Text>
                <MaterialCommunityIcons style={{ paddingTop: 40, color: 'black', opacity: 1.0 }} name={iconMode} size={30} color="#4F8EF7" />
                <Text style={{ fontSize: 27, paddingTop: 40, color: 'black', opacity: 1.0 }}>{modeView}</Text>
              </View>

              <View style={styles.informationThird}>
                {nightStatus ? <Ionicons style={{ paddingLeft: 220, color: 'black', opacity: 1.0 }} name='ios-moon' size={30} /> : <Text></Text>}
              </View>

              <View style={styles.informationSecondContainer}>

                <View style={styles.informationSecond}>
                  <MaterialCommunityIcons style={{ color: 'black', opacity: 1.0 }} name={iconSpeed} size={30} color="#4F8EF7" />
                  <Text>{speedView}</Text>
                </View>

                <View style={styles.informationSecond}>
                  <MaterialCommunityIcons style={{ color: 'black', opacity: 1.0 }} name={iconDirection} size={30} color="#4F8EF7" />
                  <Text>{directionView}</Text>
                </View>

                <View style={styles.informationSecond}>
                  <Text>Sweep</Text>
                </View>
              </View>

            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.information}>
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

        <View style={styles.thirdTileRows}>
          <TouchableOpacity style={styles.thirdTile} onPress={() => this.speedMode()}>
            <Text style={styles.thirdTileText}>Speed</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.thirdTile} onPress={() => this.directionMode()}>
            <Text style={styles.thirdTileText}>Direction</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.thirdTile} onPress={() => this.sweepMode()}>
            <Text style={styles.thirdTileText}>Sweep</Text>
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
    height: 250,
    margin: 2,
    paddingLeft: 15,
    borderRadius: 4,
    borderWidth: 0.1,
    borderColor: '#838c99',
    backgroundColor: "#f2f2f2",
    opacity: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  informationFirstContainer: {
    flexDirection: 'row'
  },
  informationSecond: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  informationSecondContainer: {
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textInformation: {
    fontSize: 27
  },
  firstTileRows: {
    flexDirection: 'row'
  },
  firstTile: {
    width: ((window.width) - 8) / 2,
    height: 100,
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
    height: 110,
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
    height: 100,
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