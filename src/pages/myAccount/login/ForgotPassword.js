import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Image, StatusBar, Dimensions, KeyboardAvoidingView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'react-native-firebase'


const window = Dimensions.get('screen');
type Props = {};

export default class ForgotPassword extends Component<Props> {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    };

    constructor() {
        super();
    }
    state = {
        email: '',
        errorMessage: null
    }

    passwordReset = () => {
        const { email } = this.state

        if (this.state.email === '') {
            this.setState({
                incorrect: true,
                errorMessage: 'The field Email should be filled out.'
            });
            return;
        }

        firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => this.props.navigation.navigate('SignIn'))
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="position" style={styles.container}>
                <StatusBar backgroundColor="#edf0f4" barStyle="dark-content" />
                <View style={styles.input}>
                    <Image style={styles.logo} source={require('../../../assets/logo_transparent.png')} />

                    <TextInput
                        style={styles.textInput}
                        keyboardType='email-address'
                        returnKeyType="go"
                        autoCapitalize="none"
                        placeholder="Email"
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />
                    {this.state.errorMessage &&
                        <Text style={{ color: 'red' }}>
                            {this.state.errorMessage}
                        </Text>}
                </View>
                <View>
                    <TouchableOpacity style={styles.logIn} onPress={() => this.passwordReset()}>
                        <Text style={styles.tileTextLog}>Reset password</Text>
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