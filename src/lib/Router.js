import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from '../pages/Home'
import MyAccount from '../pages/MyAccount'
import AddDevice from '../pages/AddDevice'

const AppSwitchNavigator = createStackNavigator({
    Home: HomeScreen ,
    MyAccount:  MyAccount ,
    AddDevice:  AddDevice 
  });
  
  export default createAppContainer(AppSwitchNavigator) 
