import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, StatusBar } from 'react-native';
import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './pages/Home';
import AddDevice from './pages/AddDevice';
import MyAccount from './pages/MyAccount';

class HomeScreen extends Component {
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
                <Ionicons style={{ marginRight: 15 }} name="ios-settings" size={28} color="#fff"
                    onPress={() => navigation.navigate('MyAccount')} />
            ),
            headerLeft: (
                <Ionicons style={{ marginLeft: 15}} name="ios-add" size={33} color="#fff"
                    onPress={() => navigation.navigate('AddDevice')} /> 
                    
            )
        }
    };
    render() {
        return (
            <View style={styles.container}>
            <StatusBar backgroundColor="#287bef" barStyle="light-content" />
                <Home />
            </View>
        )
    }
}

class AddDeviceScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleStyle: {
                alignSelf: 'center',
                // textAlign: 'center',
                flex: 1
            },
            title: 'New Device',
            headerStyle: {
                backgroundColor: '#287bef',
            },
            headerTintColor: '#fff',
            headerTintStyle: {
                //fontWeight: 'bold',
            },
            headerLeft: (
                <Ionicons style={{ marginLeft: 15 }} name="ios-arrow-back" size={30} color="#fff"
                    onPress={() => navigation.navigate('Home')} />
            )
        }
    };
    render() {
        return (
            <View style={styles.container}>
                <AddDevice />
            </View>
        )
    }
}

class MyAccountScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleStyle: {
                alignSelf: 'center',
                // textAlign: 'center',
                flex: 1
            },
            title: 'My Account',
            headerStyle: {
                backgroundColor: '#287bef',
            },
            headerTintColor: '#fff',
            headerTintStyle: {
                //fontWeight: 'bold',
            }, 
            headerLeft: (
                <Ionicons style={{ marginLeft: 15 }} name="ios-arrow-back" size={30} color="#fff"
                    onPress={() => navigation.navigate('Home')} />
            )
        }
    };
    render() {
        return (
            <View style={styles.container}>
                <MyAccount />
            </View>
        )
    }
}

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        AddDevice: AddDeviceScreen,
        MyAccount: MyAccountScreen
        
    },
    {
        initialRouteName: "Home"
    });

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
    render() {
        return <AppContainer />
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

