import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, StatusBar, Image, RefreshControl, ScrollView, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase'

import Home from './Home'
import SignIn from './myAccount/login/SignIn'

const window = Dimensions.get('screen');

export default class Main extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1
      },
      title: 'Home',
      headerStyle: {
        backgroundColor: '#287bef',
      },
      headerTintColor: '#fff',
      headerTintStyle: {
        //fontWeight: 'bold',
      },

     /* headerRight: (
        <Ionicons style={{ flex: 1, marginRight: 15 }} name="ios-settings" size={28} color="#fff"
          onPress={() => navigation.navigate('MyAccount')} />
      ),
      headerLeft: (
        <Ionicons style={{ flex: 1, marginLeft: 15 }} name="ios-add" size={33} color="#fff"
          onPress={() => navigation.navigate('AddDevice')} />

      )*/
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      logged: false
    };
  }

  currentUser = async () => {
    try {
      var user = await firebase.auth().currentUser
      if (user) {
        this.setState({
          logged: true,
        })
      }else{
        this.setState({
          logged: false,
        })
      }
    } catch (error) {
      throw error
    }
  }

  async componentDidMount() {
    await this.currentUser()
  }

  render() {


    return (
      this.state.logged ? <Home />
      :<SignIn />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  tile: {
    width: ((window.width) - 8) / 2,
    backgroundColor: "white",
    height: 200,
    margin: 2,
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 0.1,
    borderColor: '#838c99',
  },

  rowOfTiles: {
    backgroundColor: "#edf0f4",
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  tileText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10
  },
  tileIcon: {
    textAlign: 'center',
    margin: 10
  },
  tilePlus: {
    fontSize: 96,
    textAlign: 'center',
    color: "#4F8EF7"

  },
  loadingNoInternet: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: (window.height) / 2.5
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});