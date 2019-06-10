import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Image, StatusBar, KeyboardAvoidingView, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'react-native-firebase'

const window = Dimensions.get('screen');

type Props = {};
export default class SignUp extends Component<Props> {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    };
    constructor() {
        super();
    }
    state = {
        first_name: '',
        last_name: '',
        email: '',
        passwordOne: '',
        passwordTwo: '',
        errorMessage: null,
        isLoading: false
    }

    async addUserToDatabase() {
        that = this
        await firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log(user.uid)
                fetch('https://intelligent-home.herokuapp.com/post/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        id_user: user.uid,
                        first_name: that.state.first_name,
                        last_name: that.state.last_name,
                        email: that.state.email
                    })
                })
                    .then(res => res.json())
                    .then(() => that.props.navigation.push('MyAccount'))
                    .catch((error) => {
                        throw error
                    });
            }
        })
    }

    handleLogin = () => {
        const { first_name, last_name, email, passwordOne, passwordTwo } = this.state

        if (first_name === '' || last_name === '' || email === '' || passwordOne === '') {
            this.setState({
                incorrect: true,
                errorMessage: 'All fields must be filled.'
            });
            return;
        }
        else if (passwordOne !== passwordTwo) {
            this.setState({
                incorrect: true,
                errorMessage: 'Your password and confirmation password do not match.'
            });
            return
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.passwordOne)
            .then(this.addUserToDatabase())
            //.then(() => this.props.navigation.navigate('MyAccount'))
            .catch(error => this.setState({ errorMessage: error.message }))
        this.setState({
            isLoading: false
        })
    }



    render() {
        return (
            <KeyboardAvoidingView behavior='position' style={styles.container}>
                <StatusBar backgroundColor="#edf0f4" barStyle="dark-content" />
                <View style={styles.input}>
                    <Image style={styles.logo} source={require('../../../assets/logo_transparent.png')} />
                    <TextInput
                        style={styles.textInput}
                        returnKeyType="next"
                        autoCapitalize='none'
                        placeholder="First name"
                        onChangeText={first_name => this.setState({ first_name })}
                        value={this.state.first_name}
                        onSubmitEditing={() => this.last_name.focus()}
                    />
                    <TextInput
                        style={styles.textInput}
                        returnKeyType="next"
                        autoCapitalize="none"
                        placeholder="Last name"
                        onChangeText={last_name => this.setState({ last_name })}
                        value={this.state.last_name}
                        ref={(input) => this.last_name = input}
                        onSubmitEditing={() => this.email.focus()}
                    />
                    <TextInput
                        style={styles.textInput}
                        keyboardType='email-address'
                        returnKeyType="next"
                        autoCapitalize="none"
                        placeholder="Email"
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        ref={(input) => this.email = input}
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

                    <TouchableOpacity style={styles.logIn} onPress={() => this.props.navigation.push('SignIn')}>
                        <Text>Already have an account? Sign In</Text>
                    </TouchableOpacity>


                </View>
            </KeyboardAvoidingView>
        )
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