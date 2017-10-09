import React from "react";
import { StatusBar, Image, Alert, Text, View, ActivityIndicator, TouchableOpacity, ListView, StyleSheet } from "react-native";
import {
  Button,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Right, Thumbnail,
  List, ListItem
} from "native-base";


import FitImage from "react-native-fit-image";
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';


export default class DetailWisata extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      null
    )
  });


  GetItem(id) {
    Alert.alert(id);
  }

  constructor() {
    super();
    this.state = {
      isLoading: true,
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })


    }


  }
  componentDidMount() {
    //Set Const untuk ambil id wisata dari Wisata Screen Activity
    const { params } = this.props.navigation.state;
    fetch('https://banyu.center/reactnative/detail_wisata.php?id=' + params.idD)
      .then((response) => response.json())
      .then((responseJson) => {
        data = responseJson;
        this.setState({
          isLoading: false,
          dataSource: this.state.dataSource.cloneWithRows(data)
        })
      })
      .catch((error) => {
        console.error(error);
      });

  }


  render() {
    const { params } = this.props.navigation.state;
    //Progress bar ketika loading data
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="bars" style={{ color: "white" }} />
            </Button>
          </Left>
          <Body>
            <Title>Detail Wisata</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="search" style={{ color: 'white' }} />
            </Button>
          </Right>
        </Header>
        
        <Content>
          <View style={styles.MainContainer}>
            <ListView
              dataSource={this.state.dataSource}
              renderSeparator={this.ListViewItemSeparator}
              renderRow={(rowData) =>
                <View>

                  <FitImage source={{ uri: rowData.foto }} rounded />

                  <Text style={styles.textViewContainer}> {rowData.nama_wisata} </Text>
                  <Text style={styles.secViewContainer}><Icon name='envelope-o' /> {rowData.email} </Text>
                  <Text style={styles.secViewContainer}><Icon name='whatsapp' /> {rowData.whatsapp} </Text>
                  <Text style={styles.secViewContainer}><Icon name='home' /> {rowData.alamat} </Text>


                </View>
              }
            />

          </View>
        </Content>
      </Container>

    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {
    margin: 10
  },

  imageViewContainer: {
    height: 250,


  },

  textViewContainer: {
    width: '100%',
    margin: 2,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#2c3e50'

  },
  secViewContainer: {
    width: '100%',
    margin: 2,
    fontSize: 16

  }

});