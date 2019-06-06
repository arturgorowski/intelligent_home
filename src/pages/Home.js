import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, StatusBar, Image, RefreshControl, ScrollView, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase'

const window = Dimensions.get('screen');

export default class Home extends React.Component {
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

      headerRight: (
        <Ionicons style={{ flex: 1, marginRight: 15 }} name="ios-settings" size={28} color="#fff"
          onPress={() => navigation.navigate('MyAccount')} />
      ),
      headerLeft: (
        <Ionicons style={{ flex: 1, marginLeft: 15 }} name="ios-add" size={33} color="#fff"
          onPress={() => navigation.navigate('AddDevice')} />

      )
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      devices: [],
      isLoading: true,
      isConnected: false,
      refreshing: false,
      id_user: [],
      email: '',
      logged: false
    };
  }

  _onRefresh = () => {
    this.getUserEmail();
    this.getUserDevices()
    this.setState({ refreshing: true, devices: [] });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 200)
  }



  async getUserId() {
    var url_userID = 'https://intelligent-home.herokuapp.com/get/userId/' + this.state.email
    try {
      const response = await fetch(url_userID, {
        method: 'GET'
      });
      const responseJson = await response.json();
      var id_user = responseJson;
      this.setState({
        id_user: id_user,
        isLoading: false,
        isConnected: false,
        logged: false
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        isConnected: true
      });
    }
  }

  getUserEmail() {
    that = this
    firebase.auth().onUserChanged(function (user) {
      if (user) {
        that.setState({
          logged: true,
          email: user.email
        })
        that.getUserId()
      } else {
        that.setState({
          logged: false
        })
      }
    })

  }

  componentDidMount = async () => {
    this.getUserEmail()
    this.getUserDevices()
  }

  async getUserDevices() {
    if (this.state.id_user.length > 0) {
      var url = 'https://intelligent-home.herokuapp.com/get/userDevice/' + this.state.id_user.id_user
      try {
        const response = await fetch(url, {
          method: 'GET'
        });
        const responseJson = await response.json();
        var devices = responseJson;
        this.setState({
          devices: devices,
          isLoading: false,
          isConnected: false
        });
      } catch (error) {
        this.setState({
          isLoading: false,
          isConnected: true
        });
      }
    }

  }

  render() {
    if (this.state.isConnected) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />}
        >
          <View style={styles.loadingNoInternet}>
            <ActivityIndicator size={'large'} />
            <Text>No internet connection</Text>
          </View>
        </ScrollView>
      );
    }
    else if (this.state.isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size={'large'} />
        </View>
      );
    }

    let rowsOfTiles = [];
    let row = [];
    for (let i = 0; i < this.state.devices.length; i++) {
      row.push(
        <View key={i}>
          <TouchableOpacity style={styles.tile} onPress={() => this.props.navigation.navigate(this.state.devices[i].name)}>
            <MaterialCommunityIcons style={styles.tileIcon} name={this.state.devices[i].icon} size={60} color="#4F8EF7" />
            <Text style={styles.tileText}>{this.state.devices[i].name}</Text>
          </TouchableOpacity>
        </View>
      );

      if (i % 2 !== 0) {
        rowsOfTiles.push(
          <View style={styles.rowOfTiles} key={i}>
            {row}
          </View>
        );
        row = [];
      }
      /*if (i === this.state.devices.length - 1) {
        rowsOfTiles.push(
          <View style={styles.rowOfTiles} key={i}>
            {row}
            <TouchableOpacity style={styles.tile} onPress={() => this.props.navigation.navigate('AddingScreen')}>
              <Text style={styles.tilePlus}>+</Text>
            </TouchableOpacity>
          </View>
        );
      }*/
    }

    return (
      <ScrollView style={styles.container}
        refreshControl={<RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
        }>
        <StatusBar backgroundColor="#287bef" barStyle="light-content" />
        {rowsOfTiles}
      </ScrollView>
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