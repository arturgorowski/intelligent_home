import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {
    createSwitchNavigator,
    createAppContainer,
    createStackNavigator
} from 'react-navigation';

import Home from './pages/Home'
import AddDevice from './pages/AddDevice'
import MyAccount from './pages/MyAccount'

class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Home />
                <Button 
                    title="go to AddDevice"
                    onPress={()=>this.props.navigation.navigate('AddDevice')}
                />
                <Button 
                    title="go to MyAccount"
                    onPress={()=>this.props.navigation.navigate('MyAccount')}
                />
            </View>
        )
    }
}

class AddDeviceScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <AddDevice />
            </View>
        )
    }
}

class MyAccountScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <MyAccount />
            </View>
        )
    }
}

const AppNavigator = createSwitchNavigator(
    {
        Home: HomeScreen,
        AddDevice: AddDeviceScreen,
        MyAccount: MyAccountScreen

    },
    {
        initialRouteName: "Home"
    });

const AppContainer =  createAppContainer(AppNavigator);

export default class App extends Component{
    render(){
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

