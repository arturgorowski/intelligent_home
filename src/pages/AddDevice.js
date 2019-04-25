import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    ActivityIndicator
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const window = Dimensions.get('screen');

/*NetInfo.isConnected.fetch().then(isConnected => {
  console.log("Is connected", isConnected);
  
});*/

export default class AddDevice extends Component {
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
        }
        catch (error) {
          this.setState({
            isLoading: false,
            isConnected: true
          })
            
        }
    }

  render() { 
    if (this.state.isConnected) {
      return (
        <View style={styles.loading}>     
          <ActivityIndicator size={'large'}/>
          <Text>No internet connection</Text>
        </View>
      );
    }
    else if (this.state.isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size={'large'}/>
        </View>
      );
    }
    
    let rowsOfTiles = [];
    let row = [];
    for (let i = 0; i < this.state.devices.length; i++) {
      row.push(
        <View key={i}>
          <TouchableOpacity style={styles.tile}>
            <MaterialCommunityIcons style={styles.tileIconName} name={this.state.devices[i].icon} size={60} color="#4F8EF7" />
            <Text style={styles.tileTextName}>{this.state.devices[i].name}</Text>
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
            <TouchableOpacity style={styles.tile}>
              <Text style={styles.tileTextPlus}>+</Text>
            </TouchableOpacity>
          </View>  
        )
      } 
    }
 
    return (
      <ScrollView style={styles.container}>
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
        width: ((window.width)-8)/2,
        height: 200,
        margin: 2,
        justifyContent: 'center',
        borderRadius: 4,
        borderWidth: 0.1,
        borderColor: '#838c99',
        
      },
      rowOfTiles: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
      },
      tileTextName: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10
      },
      tileIconName: { 
        textAlign: 'center',
        margin: 10
      },
      tileTextPlace: {
        fontSize: 20,
        textAlign: 'center'
      },
      tileTextPlus: {
        fontSize: 96,
        textAlign: 'center',
        color:"#4F8EF7"
        
      },
      tileTextId: { 
        fontSize: 20,
        textAlign: 'center'
      },
      loading:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //paddingTop: 20,
        
      }
});