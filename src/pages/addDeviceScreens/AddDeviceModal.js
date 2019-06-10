import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, StatusBar, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const window = Dimensions.get('screen');
// /post/createUserDevice
export default class AddDeviceModal extends React.Component {

  state = {
    id_user: ''
  }

   async addDevice(id_user, id_device) {
     await fetch('https://intelligent-home.herokuapp.com/post/createUserDevice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        id_user: id_user,
        id_device: id_device
      })
    })
      .then(res => res.json())
      .then(() => this.props.navigation.navigate('Home'))
      .catch((error) => {
        throw error
      });
  }

  currentUser = async () => {
    try {
      var user = await firebase.auth().currentUser
      if (user) {
        this.setState({
          id_user: user.uid,
          logged: true,

        })
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
    await this.currentUser()
  }

  render() {

    const { navigation } = this.props;
    const icon = navigation.getParam('icon')
    const name = navigation.getParam('name');
    const id_device = navigation.getParam('id_device');
    const id_user = navigation.getParam('id_user');


    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#287bef" barStyle="light-content" />
        <Image style={styles.logo} source={require('../../assets/logo_transparent.png')} />
        <TouchableOpacity style={styles.settings} onPress={() => this.addDevice(id_user, id_device)}>
          <MaterialCommunityIcons style={styles.tileIcon} name={icon} size={35} color="#4F8EF7" />
          <Text style={styles.tileTextName}>Add {name} to home screen</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settings} onPress={() => this.props.navigation.goBack()}>
          <MaterialCommunityIcons style={styles.tileIcon} name='keyboard-return' size={35} color="#4F8EF7" />
          <Text style={styles.tileTextName}>Go back</Text>
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
  logo: {
    width: 250,
    height: 250,
  },
  settings: {
    width: (window.width) - 4,
    height: 80,
    margin: 2,
    paddingLeft: 15,
    borderRadius: 4,
    borderWidth: 0.1,
    borderColor: '#838c99',
    backgroundColor: "white",
    flexDirection: 'row',
    alignItems: 'center'
  },
  tileIcon: {

  },
  tileTextName: {
    fontSize: 18,
    paddingLeft: 8
  }
});