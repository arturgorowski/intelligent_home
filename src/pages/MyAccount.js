import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const window = Dimensions.get('screen');

export default class MyAccount extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
            <View style={styles.container}>

                <TouchableOpacity style={styles.login}>
                    <MaterialCommunityIcons style={styles.tileIcon}  name='fingerprint' size={60} color="#4F8EF7" />
                    <Text style={styles.tileLoginName}>Not logged in</Text>                     
                </TouchableOpacity>  

                <TouchableOpacity style={styles.settings}>                   
                        <MaterialCommunityIcons style={styles.tileIcon} name='settings' size={35} color="#4F8EF7" />
                        <Text style={styles.tileTextName}>Settings</Text>                   
                </TouchableOpacity>

                <TouchableOpacity style={styles.settings}>                              
                    <MaterialCommunityIcons  style={styles.tileIcon}name='bluetooth' size={35} color="#4F8EF7" />
                    <Text style={styles.tileTextName}>Available BT devices</Text> 
                </TouchableOpacity> 
 
                <TouchableOpacity style={styles.settings}>                               
                    <MaterialCommunityIcons  style={styles.tileIcon}name='wifi' size={35} color="#4F8EF7" />
                    <Text style={styles.tileTextName}>Available WiFi devices</Text> 
                </TouchableOpacity>   

            </View>
            <View>
                <TouchableOpacity style={styles.logIn}>                
                    <Text style={styles.tileTextLog}>Log in</Text> 
                </TouchableOpacity> 
            </View>
            </View>
        )
    } 
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    login: {
        width: (window.width)-4,
        height: 110,
        margin: 2,
        paddingLeft: 15,
        borderRadius: 4, 
        borderWidth: 0.1,
        borderColor: '#838c99',

        flexDirection: 'row',
        alignItems: 'center',
    },
    settings: {
        width: (window.width)-4,
        height: 80,
        margin: 2,
        paddingLeft: 15,
        borderRadius: 4,
        borderWidth: 0.1,
        borderColor: '#838c99',

        flexDirection: 'row',
        alignItems: 'center' 
    },
    tileIcon: {
        
    },
    tileTextName: {
        fontSize: 18,
        paddingLeft: 8
    },
    tileLoginName:{
        fontSize: 23,
    },
    tileTextLog: {
        fontSize: 18,
        color: '#ef4c4c'
    },
    logIn:{
        width: (window.width)-40,
        height: 40,
        marginBottom: 15,
        borderRadius: 30, 
        borderWidth: 0.1,
        borderColor: '#838c99',

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center'
    }
});