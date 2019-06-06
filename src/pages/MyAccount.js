import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'react-native-firebase'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const window = Dimensions.get('screen');

export default class MyAccount extends React.Component {

    state = {
        logged: false,
        user: ''
    }
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
                <Ionicons style={{ flex: 10, marginLeft: 15 }} name="ios-arrow-back" size={30} color="#fff"
                    onPress={() => navigation.navigate('Home')} />
            )            
        }
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        that = this
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                that.setState({
                    logged: true,
                    user: user.email
                })
            } else {
                that.setState({
                    logged: false
                })
            }
        });
    }

    signOut = async () => {
        try {
            await firebase.auth().signOut();
            this.props.navigation.navigate('MyAccount')
        } catch (error) {
            console.log(error);
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#287bef" barStyle="light-content" /> 
                <View>
                    <TouchableOpacity style={styles.login}>
                        <MaterialCommunityIcons style={styles.tileIcon} name='fingerprint' size={60} color="#4F8EF7" />
                        {
                            this.state.logged ? <Text style={styles.tileLoginName}>{this.state.user}</Text>
                                : <Text style={styles.tileLoginName}>Not logged in</Text>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settings} onPress={() => this.props.navigation.navigate('Settings')}>
                        <MaterialCommunityIcons style={styles.tileIcon} name='settings' size={35} color="#4F8EF7" />
                        <Text style={styles.tileTextName}>Settings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settings} onPress={() => this.props.navigation.navigate('BTdevice')}>
                        <MaterialCommunityIcons style={styles.tileIcon} name='bluetooth' size={35} color="#4F8EF7" />
                        <Text style={styles.tileTextName}>Available BT devices</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settings} onPress={() => this.props.navigation.navigate('WiFiDevice')}>
                        <MaterialCommunityIcons style={styles.tileIcon} name='wifi' size={35} color="#4F8EF7" />
                        <Text style={styles.tileTextName}>Available WiFi devices</Text>
                    </TouchableOpacity>

                </View>
                <View>
                    {
                        this.state.logged ?
                            <TouchableOpacity style={styles.logIn} onPress={() => this.signOut()}>
                                <Text style={styles.tileTextLog}>Sign Out</Text>
                            </TouchableOpacity>
                            : <TouchableOpacity style={styles.logIn} onPress={() => this.props.navigation.navigate('SignIn')}>
                                <Text style={styles.tileTextLog}>Log in</Text>
                            </TouchableOpacity>
                    }

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#edf0f4",
        height: window.height,
        alignItems: 'center',
        justifyContent: "space-between"
    },

    login: {
        width: (window.width) - 4,
        height: 110,
        margin: 2,
        paddingLeft: 15,
        borderRadius: 4,
        borderWidth: 0.1,
        borderColor: '#838c99',
        backgroundColor: "white",
        flexDirection: 'row',
        alignItems: 'center',
    },

    settings: {
        width: (window.width) - 4,
        height: 80,
        margin: 2,
        paddingLeft: 15,
        borderRadius: 4,
        borderWidth: 0.1,
        borderColor: '#838c99',
        backgroundColor: "white",
        flexDirection: 'row',
        alignItems: 'center'
    },
    tileIcon: {

    },
    tileTextName: {
        fontSize: 18,
        paddingLeft: 8
    },
    tileLoginName: {
        fontSize: 23,
    },
    tileTextLog: {
        fontSize: 18,
        color: '#ef4c4c'
    },
    logIn: {
        width: (window.width) - 40,
        height: 40,
        marginBottom: 15,
        borderRadius: 30,
        borderWidth: 0.1,
        borderColor: '#838c99',
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center'
    }
});