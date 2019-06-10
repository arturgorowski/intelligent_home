import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, StatusBar, Image, RefreshControl, ScrollView, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
      id_user: '',
      logged: false
    };
  }

  async getUserDevices() {
    try {
      var url = 'https://intelligent-home.herokuapp.com/get/usersDevice/' + this.state.id_user
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
      console.log(devices)
    } catch (error) {
      console.log(error)
      this.setState({
        isLoading: false,
        //isConnected: true
      });
    }
  }

  onRefresh = async () => {
    try {
      await this.currentUser()
        .then(
          this.setState({
            refreshing: true,
            devices: [],
            isLoading: false,
            isConnected: false
          }),
          setTimeout(() => {
            this.setState({ refreshing: false });
          }, 200)
        )
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  currentUser = async () => {
    try {
      var user = await firebase.auth().currentUser
      if (user) {
        this.setState({
          id_user: user.uid,
          logged: true,

        })
        await this.getUserDevices()
      } else {
        this.setState({
          logged: false,
          isLoading: false
        })
      }
    } catch (error) {
      throw error
    }
  }

  async componentDidMount() {
    //await this.currentUser()
    await this.onRefresh()
  }

  render() {
    if (this.state.isConnected) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
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
          <TouchableOpacity style={styles.tile} 
          onPress={() => this.props.navigation.navigate(this.state.devices[i].name)}
          onLongPress={() => this.props.navigation.navigate('DeleteDeviceModal',{
            icon: this.state.devices[i].icon,
            name: this.state.devices[i].name,
            id_device: this.state.devices[i].id_device,
            id_user: this.state.id_user
          })}
          >
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
      if (i === this.state.devices.length - 1) {
        rowsOfTiles.push(
          <View style={styles.rowOfTiles} key={i}>
            {row}
          </View>
        );
      }
    }

    return (
      <ScrollView style={styles.container}
        refreshControl={<RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
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

  container1: {
    flex: 1,
    backgroundColor: "#edf0f4",
    height: window.height,
    //justifyContent: "space-between"
    alignItems: 'center'
  },
  logo: {
    width: 250,
    height: 250,
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
  },
  logIn: {
    width: (window.width) - 100,
    height: 40,
    marginBottom: 15,
    borderRadius: 30,
    borderWidth: 0.1,
    borderColor: '#838c99',
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center'
  },
});