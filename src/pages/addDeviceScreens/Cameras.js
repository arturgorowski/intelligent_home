import React from 'react'
import { View, Text, StyleSheet, Dimensions, StatusBar, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const window = Dimensions.get('screen');

export default class Cameras extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleStyle: {
        alignSelf: 'center',
        //textAlign: 'center',
        flex: 1
      },
      title: 'Cameras',
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
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#287bef" barStyle="light-content" />
        <Image style={styles.logo} source={require('../../assets/logo_transparent.png')} />
        <Text style={styles.text}>This feature is not available in your country yet!</Text>
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
  logo: {
    width: 350,
    height: 350,
  },
  text:{
    fontSize: 15
  }
});