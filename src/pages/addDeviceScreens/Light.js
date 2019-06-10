import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const window = Dimensions.get('screen');

export default class Light extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleStyle: {
        alignSelf: 'center',
        //textAlign: 'center',
        flex: 1
      },
      title: 'Light',
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
    status:true
  }

  _onPress() {
    const newState = !this.state.status
    this.setState({ status: newState })
  }

  render() {
    const {status} = this.state
    const textValue = status?"OFF":"ON"
    const icon = status?"lightbulb":"lightbulb-on"
    const statusValue = status?"ON":"OFF"
    const iconStatus = status?"lightbulb-on":"lightbulb"
    const color = status?"#ede900":"#191212"
    
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#287bef" barStyle="light-content" />

        <TouchableOpacity style={styles.information}>
          <MaterialCommunityIcons color={color} name={iconStatus} size={45}/>
          <Text style={styles.tileTextName}>The light is {statusValue}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tile} onPress={() => this._onPress()}>
          <MaterialCommunityIcons style={styles.tileIcon} name={icon} size={35} color="#4F8EF7"/>
          <Text style={styles.tileTextName}>{textValue}</Text>
        </TouchableOpacity>

      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edf0f4",
    height: window.height,
    alignItems: 'center',
    justifyContent: "center"
  },
  information:{
    width: (window.width) - 4,
    height: 160,
    margin: 2,
    paddingLeft: 15,
    borderRadius: 4,
    borderWidth: 0.1,
    borderColor: '#838c99',
    backgroundColor: "white",
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center'
  },
  tile: {
    width: (window.width) - 4,
    height: 80,
    margin: 2,
    paddingLeft: 15,
    borderRadius: 4,
    borderWidth: 0.1,
    borderColor: '#838c99',
    backgroundColor: "white",
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center'
  },
  tileTextName: {
    fontSize: 18,
    paddingLeft: 8
  }

});