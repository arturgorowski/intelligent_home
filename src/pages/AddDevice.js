import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const window = Dimensions.get('screen');

export default class AddDevice extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    
      headerTitleStyle: {
        alignSelf: 'center',
        // textAlign: 'center',
        flex: 1
      },
      title: 'New Device',
      headerStyle: {
        backgroundColor: '#287bef',
      },
      headerTintColor: '#fff',
      headerTintStyle: {
        //fontWeight: 'bold',
        
      },
      headerLeft: (
        <Ionicons style={{ marginLeft: 15 }} name="ios-arrow-back" size={30} color="#fff"
          onPress={() => navigation.navigate('Home')} />
      )
    //}
  });

  constructor(props) {
    super(props);

    this.state = {
      devices: [],
      isLoading: true,
      isConnected: false
    };
  }

  componentDidMount = async () => {
    try {
      const response = await fetch('https://intelligent-home.herokuapp.com/api/devices', {
        method: 'GET'
      });
      const responseJson = await response.json();
      var devices = responseJson;
      this.setState({
        devices: devices,
        isLoading: false,
        isConnected: false
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        isConnected: true
      });
    }
  }

  render() {
    if (this.state.isConnected) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size={'large'} />
          <Text>No internet connection</Text>
        </View>
      );
    }
    else if (this.state.isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size={'large'} />
        </View>
      );
    }

    let rowsOfTiles = [];
    let row = [];
    for (let i = 0; i < this.state.devices.length; i++) {
      row.push(
        <View key={i}>
          <TouchableOpacity style={styles.tile} onPress={() => this.props.navigation.navigate(this.state.devices[i].name)}>
            <MaterialCommunityIcons style={styles.tileIcon} name={this.state.devices[i].icon} size={60} color="#4F8EF7" />
            <Text style={styles.tileText}>{this.state.devices[i].name}</Text>
          </TouchableOpacity>
        </View>
      );

      if (i % 2 !== 0) {
        rowsOfTiles.push(
          <View style={styles.rowOfTiles} key={i}>
            {row}
          </View>
        );
        row = [];
      }
      if (i === this.state.devices.length - 1) {
        rowsOfTiles.push(
          <View style={styles.rowOfTiles} key={i}>
            {row}
            <TouchableOpacity style={styles.tile} onPress={() => this.props.navigation.navigate('AddingScreen')}>
              <Text style={styles.tilePlus}>+</Text>
            </TouchableOpacity>
          </View>
        );
      }
    }

    return (
      <ScrollView style={styles.container}>
        <StatusBar backgroundColor="#287bef" barStyle="light-content" />
        {rowsOfTiles}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  tile: {
    width: ((window.width) - 8) / 2,
    backgroundColor: "white",
    height: 200,
    margin: 2,
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 0.1,
    borderColor: '#838c99',
  },

  rowOfTiles: {
    backgroundColor: "#edf0f4",
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  tileText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10
  },
  tileIcon: {
    textAlign: 'center',
    margin: 10
  },
  tilePlus: {
    fontSize: 96,
    textAlign: 'center',
    color: "#4F8EF7"

  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});