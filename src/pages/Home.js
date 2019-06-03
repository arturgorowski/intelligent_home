import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
        <Ionicons style={{ flex:1, marginRight: 15 }} name="ios-settings" size={28} color="#fff"
          onPress={() => navigation.navigate('MyAccount')} />
      ),
      headerLeft: (
        <Ionicons style={{ flex:1, marginLeft: 15 }} name="ios-add" size={33} color="#fff"
          onPress={() => navigation.navigate('AddDevice')} />

      )
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#287bef" barStyle="light-content" />
        <Text>This is home screen!</Text>
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