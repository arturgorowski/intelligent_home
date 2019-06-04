import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BleManager } from 'react-native-ble-plx';

const window = Dimensions.get('screen');

export default class BTdevice extends React.Component {
  constructor(props) {
    super(props);
    this.manager = new BleManager();
  }

  componentWillMount(){
    const subscription = this.manager.onStateChange( (state)=>{
      if (state === 'PoweredOn'){
        this.scanAndConnect();
        subscription.remove();
      }
    }, true)
  }

  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        console.log(error)
        return
      }
      console.log(device)
      //Check if it is a device you are looking for based on advertisement data
      //or other criteria.
      
    });
  }


  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleStyle: {
        alignSelf: 'center',
        //textAlign: 'center',
        flex: 1
      },
      title: 'BT devices',
      headerStyle: {
        backgroundColor: '#287bef',
      },
      headerTintColor: '#fff',
      headerTintStyle: {
        //fontWeight: 'bold',
      },
      headerLeft: (
        <Ionicons style={{ flex:10, marginLeft: 15 }} name="ios-arrow-back" size={30} color="#fff"
          onPress={() => navigation.navigate('MyAccount')} />
      )
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#287bef" barStyle="light-content" />
        <Text>This is BTdevice screen!</Text>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },


});