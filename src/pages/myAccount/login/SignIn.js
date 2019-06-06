import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Image, ActivityIndicator, Dimensions, KeyboardAvoidingView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'react-native-firebase'
import Ionicons from 'react-native-vector-icons/Ionicons';

const window = Dimensions.get('screen');
type Props = {};

export default class SignIn extends Component<Props> {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleStyle: {
                alignSelf: 'center',
                // textAlign: 'center',
                flex: 1
            },
            title: 'Sign In',
            headerStyle: {
                backgroundColor: '#287bef',
            },
            headerTintColor: '#fff',
            headerTintStyle: {
                //fontWeight: 'bold',
            },
            headerLeft: (
                <Ionicons style={{ flex: 1, marginLeft: 15 }} name="ios-arrow-back" size={30} color="#fff"
                    onPress={() => navigation.goBack()} />
            )
        }
    };
    constructor() {
        super();
    }
    state = {
        email: '',
        password: '',
        errorMessage: null,
        isLoading: false
    }

    handleLogin = () => {
        const { email, password } = this.state

        if (this.state.login === '' || this.state.password === '') {
            this.setState({
                incorrect: true,
                errorMessage: 'Both login and password need to be filled.'
            });
            return;
        }

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('Home'))
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
                <KeyboardAvoidingView behavior="position" style={styles.container}>
                    <View style={styles.input}>
                        <Image style={styles.logo} source={require('../../../assets/logo_transparent.png')} />

                        <TextInput
                            style={styles.textInput}
                            keyboardType='email-address'
                            returnKeyType="next"
                            autoCapitalize="none"
                            placeholder="Email"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                            onSubmitEditing={() => this.passwordInput.focus()}
                        />
                        <TextInput
                            secureTextEntry
                            returnKeyType="go"
                            style={styles.textInput}
                            autoCapitalize="none"
                            placeholder="Password"
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                            ref={(input) => this.passwordInput = input}
                        />
                        {this.state.errorMessage &&
                            <Text style={{ color: 'red' }}>
                                {this.state.errorMessage}
                            </Text>}
                    </View>
                    <View>
                        <TouchableOpacity style={styles.logIn} onPress={this.handleLogin}>
                            <Text style={styles.tileTextLog}>Log in</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.logIn} onPress={() => this.props.navigation.navigate('SignUp')}>
                            <Text>Don't have an account? Sign Up</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.passwordForgot} onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                            <Text>Forgot Password?</Text>
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
        //marginTop: 200,
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
    passwordForgot:{
        width: (window.width) - 200,
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
    logIn: {
        width: (window.width) - 100,
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