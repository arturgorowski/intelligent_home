import React from 'react'
import firebase from 'react-native-firebase'

export default class Main extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  };

  constructor() {
    super()

    this.state = {
      logged: false
    };

    //this.state.logged = this.state.logged.bind
  }

  currentUser = async () => {
    try {
      var user = await firebase.auth().currentUser
      if (user) {
        this.setState({
          logged: true,
        })
      } else {
        this.setState({
          logged: false,
        })
      }
    } catch (error) {
      throw error
    }
  }

  async componentDidMount() {
    await this.currentUser()
  }

  render() {
    if (this.state.logged) {
      return (
        this.props.navigation.push('Home')
      )
    }
    else {
      return (
        this.props.navigation.push('SignIn')
      )
    }
  }
}