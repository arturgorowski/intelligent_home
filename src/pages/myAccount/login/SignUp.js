import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Image, ActivityIndicator, KeyboardAvoidingView, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'react-native-firebase'
import Ionicons from 'react-native-vector-icons/Ionicons';

const window = Dimensions.get('screen');

type Props = {};
export default class SignUp extends Component<Props> {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleStyle: {
                alignSelf: 'center',
                // textAlign: 'center',
                flex: 1
            },
            title: 'Sign Up',
            headerStyle: {
                backgroundColor: '#287bef',
            },
            headerTintColor: '#fff',
            headerTintStyle: {
                //fontWeight: 'bold',
            },
            headerLeft: (
                <Ionicons style={{ flex: 1, marginLeft: 15 }} name="ios-arrow-back" size={30} color="#fff"
                    onPress={() => navigation.navigate('MyAccount')} />
            )
        }
    };
    constructor() {
        super();
    }
    state = {
        email: '',
        passwordOne: '',
        passwordTwo: '',
        errorMessage: null,
        isLoading: false
    }

    handleLogin = () => {
        const { email, passwordOne, passwordTwo } = this.state

        if (email === '' || passwordOne === '' ) {
            this.setState({
                incorrect: true,
                errorMessage: 'Both login and password need to be filled.'
            });
            return;
        }
        else if (passwordOne !== passwordTwo){
            this.setState({
                incorrect: true,
                errorMessage: 'Your password and confirmation password do not match.'
            });
            return
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.passwordOne)
            .then(() => this.props.navigation.navigate('MyAccount'))
            .catch(error => this.setState({ errorMessage: error.message }))
        this.setState({
            isLoading: false
        })
    }



    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Text>Loading</Text>
                    <ActivityIndicator size="large" />
                </View>
            )
        } else {
            return (
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <View style={styles.input}>
                        <Image style={styles.logo} source={require('../../../assets/logo_transparent.png')} />
                        <TextInput
                            style={styles.textInput}
                            returnKeyType="next"
                            autoCapitalize="none"
                            placeholder="Email"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                            onSubmitEditing={() => this.passwordOneInput.focus()}
                        />
                        <TextInput
                            secureTextEntry
                            returnKeyType="next"
                            style={styles.textInput}
                            autoCapitalize="none"
                            placeholder="Password"
                            onChangeText={passwordOne => this.setState({ passwordOne })}
                            value={this.state.passwordOne}
                            ref={(input) => this.passwordOneInput = input}
                            onSubmitEditing={() => this.passwordTwoInput.focus()}
                        />
                        <TextInput
                            secureTextEntry
                            returnKeyType="go"
                            style={styles.textInput}
                            autoCapitalize="none"
                            placeholder="Confirm Password"
                            onChangeText={passwordTwo => this.setState({ passwordTwo })}
                            value={this.state.passwordTwo}
                            ref={(input) => this.passwordTwoInput = input}
                        />
                        {this.state.errorMessage &&
                            <Text style={{ color: 'red' }}>
                                {this.state.errorMessage}
                            </Text>}

                    </View>
                    <View>
                        <TouchableOpacity style={styles.logIn} onPress={this.handleLogin}>
                            <Text style={styles.tileTextLog}>Sign Up</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.logIn} onPress={() => this.props.navigation.navigate('SignIn')}>
                            <Text>Already have an account? Sign In</Text>
                        </TouchableOpacity>


                    </View>
                </KeyboardAvoidingView>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#edf0f4",
        height: window.height,
        justifyContent: "space-between"
    },
    logo: {
        width: 250,
        height: 250,
    },
    input: {
        alignItems: "center"
    },
    textInput: {
        width: (window.width) - 40,
        height: 40,
        marginBottom: 15,
        borderRadius: 7,
        borderWidth: 0.1,
        borderColor: '#838c99',
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center'
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
    },
    tileTextLog: {
        fontSize: 18,
        color: '#ef4c4c',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center'
    },
})