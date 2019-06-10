import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Main from './pages/Main'
import Home from './pages/Home';

import MyAccount from './pages/MyAccount';
import SignIn from './pages/myAccount/login/SignIn';
import ForgotPassword from './pages/myAccount/login/ForgotPassword';
import SignUp from './pages/myAccount/login/SignUp';
import Settings from './pages/myAccount/Settings';
import BTdevice from './pages/myAccount/BTdevice';
import WiFiDevice from './pages/myAccount/WiFiDevice';

import AddDevice from './pages/AddDevice';
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
import AddDeviceModal from './pages/addDeviceScreens/AddDeviceModal';
import DeleteDeviceModal from './pages/addDeviceScreens/DeleteDeviceModal';


const AppNavigator = createStackNavigator(
    {
        Main: Main,

        Home: Home,

        AddDevice: AddDevice,

        MyAccount: MyAccount,
        SignIn: SignIn,
        SignUp: SignUp,
        ForgotPassword: ForgotPassword,

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
        initialRouteName: "Main"
    }
);

const RootStack = createStackNavigator(
    {
        Main: {
            screen: AppNavigator,
        },
        AddDeviceModal: {
            screen: AddDeviceModal,
        },
        DeleteDeviceModal: {
            screen: DeleteDeviceModal,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
    render() {
        return <AppContainer />
    }
}

