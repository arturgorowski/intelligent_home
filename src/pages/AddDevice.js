import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ListView,
    ScrollView
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class AddDevice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: ds
        };
    }
    componentDidMount = async () => {

        try {
            const response = await fetch('https://intelligent-home.herokuapp.com/api/devices', {
                method: 'GET'
            });
            const responseJson = await response.json();
            this.setState({
                dataSource: ds.cloneWithRows(responseJson)
            });
        }
        catch (error) {
            console.error(error);
        }
    }
    /*componentWillMount() {
        fetch('https://intelligent-home.herokuapp.com/api/devices')
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({ dataSource: ds.cloneWithRows(responseJson) });
          })
          .catch((error) => {
            console.error(error);
          });
      }*/


    render() {
      return (
          <ListView
              style={styles.container}
              dataSource={this.state.dataSource}
              renderRow={(rowData) =>
                  <View>
                    <TouchableOpacity style={styles.device}>
                        <Text>{rowData.name}</Text>
                    </TouchableOpacity> 
                  </View>
                 }
          />
      );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#99CC33',
    },
    device:{
        width: 300, 
        height: 50,
        margin: 15,
        justifyContent: 'center'
    }
});