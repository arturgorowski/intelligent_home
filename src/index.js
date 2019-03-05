import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {
    createSwitchNavigator,
    createAppContainer,
    createStackNavigator
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from './pages/Home'
import AddDevice from './pages/AddDevice'
import MyAccount from './pages/MyAccount'

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
                backgroundColor: '#fff',
            },
            headerTintColor: '#808080',
            headerTintStyle: {
                fontWeight: 'bold',
            },
            headerRight: (
                <Icon style={{ marginRight: 15 }} name="ios-person" size={40} color="#4F8EF7"
                    onPress={() => navigation.navigate('MyAccount')} />
            ),
            headerLeft: (
                <Icon style={{ marginLeft: 15 }} name="ios-add" size={50} color="#4F8EF7"
                    onPress={() => navigation.navigate('AddDevice')} />
            )
        }
    };
    render() {
        return (
            <View style={styles.container}>
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
                backgroundColor: '#fff',
            },
            headerTintColor: '#808080',
            headerTintStyle: {
                fontWeight: 'bold',
            },
            headerLeft: (
                <Icon style={{ marginLeft: 15 }} name="ios-arrow-back" size={40} color="#4F8EF7"
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
                backgroundColor: '#fff',
            },
            headerTintColor: '#808080',
            headerTintStyle: {
                fontWeight: 'bold',
            },
            headerLeft: (
                <Icon style={{ marginLeft: 15 }} name="ios-arrow-back" size={40} color="#4F8EF7"
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

