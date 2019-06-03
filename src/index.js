import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Home from './pages/Home';
import AddDevice from './pages/AddDevice';
import MyAccount from './pages/MyAccount';

import Light from './pages/addDeviceScreens/Light';
import Blinds from './pages/addDeviceScreens/Blinds';
import AirConditioning from './pages/addDeviceScreens/AirConditioning';
import Heating from './pages/addDeviceScreens/Heating';
import Sound from './pages/addDeviceScreens/Sound';
import Alarm from './pages/addDeviceScreens/Alarm';
import Cameras from './pages/addDeviceScreens/Cameras';
import FrontDoor from './pages/addDeviceScreens/FrontDoor';
import GarageDoor from './pages/addDeviceScreens/GarageDoor';
import Gate from './pages/addDeviceScreens/Gate';
import WeatherStation from './pages/addDeviceScreens/WeatherStation';
import Fridge from './pages/addDeviceScreens/Fridge';
import TV from './pages/addDeviceScreens/TV';
import Washer from './pages/addDeviceScreens/Washer';
import Oven from './pages/addDeviceScreens/Oven';
import Printer from './pages/addDeviceScreens/Printer';
import AddingScreen from './pages/addDeviceScreens/AddingScreen';

import Settings from './pages/myAccount/Settings';
import BTdevice from './pages/myAccount/BTdevice';
import WiFiDevice from './pages/myAccount/WiFiDevice';

const AppNavigator = createStackNavigator(
    {
        Home: Home,
        AddDevice: AddDevice,
        MyAccount: MyAccount,

        Light: Light,
        Blinds: Blinds,
        'Air conditioning': AirConditioning,
        Heating: Heating,
        Sound: Sound,
        Alarm: Alarm,
        Cameras: Cameras,
        'Front door': FrontDoor,
        'Garage door': GarageDoor,
        Gate: Gate,
        'Weather station': WeatherStation,
        Fridge: Fridge,
        TV: TV,
        Washer: Washer,
        Oven: Oven,
        Printer: Printer,
        AddingScreen: AddingScreen,

        Settings: Settings,
        BTdevice: BTdevice,
        WiFiDevice: WiFiDevice
    },
    {
        initialRouteName: "Home"
    });

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />
    }
}

