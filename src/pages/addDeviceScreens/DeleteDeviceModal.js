import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, StatusBar, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const window = Dimensions.get('screen');
// /delete/device/:id_user/:id_device'
export default class AddDeviceModal extends React.Component {

  async deleteDevice(id_user, id_device) {
    await fetch('https://intelligent-home.herokuapp.com/delete/device/' + id_user + '/' + id_device, {
      method: 'DELETE'
    })
      .then(() => this.props.navigation.navigate('Home'))
      .catch((error) => {
        throw error
      });
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
        <TouchableOpacity style={styles.settings} onPress={() => this.deleteDevice(id_user, id_device)}>
          <MaterialCommunityIcons style={styles.tileIcon} name={icon} size={35} color="#4F8EF7" />
          <Text style={styles.tileTextName}>Delete {name} from home screen</Text>
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