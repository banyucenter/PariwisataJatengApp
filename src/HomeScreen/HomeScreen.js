import React from "react";
import {
  StatusBar, Image, Alert, Text,
  View, ActivityIndicator,
  TouchableOpacity, ListView,
  StyleSheet
} from "react-native";
import {
  Button, Container, Card,
  CardItem, Body, Content, Header, Title, Left,
  Right, Thumbnail, Tabs, Tab, Footer, FooterTab,
  List, ListItem, Item, Input
} from "native-base";

//Panggil Awesome icon setelah sebelumnya instal component
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';


//Componen untuk Fit Image All Devices
import FitImage from "react-native-fit-image";

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      null
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true

    }
  }

  //Ambil ID yang akan kita kirim ke Wisata Activity
  GetItem(id) {
    //Alert.alert(id);
    this.props.navigation.navigate('Wisata', { idK: id });
  }


  //Ambil data JSON ke List View
  componentDidMount() {

    return fetch('https://banyu.center/reactnative/kabupaten.php')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function () {

        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //Style separator
  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#95a5a6",
          marginBottom: 10,
          marginTop: 10
        }}
      />
    );
  }

  render() {

    //circle progress bar loading
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <Container>

        <Header style={{ backgroundColor: "#2980b9" }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="bars" style={{ color: "white" }} />
            </Button>
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("SearchKabupaten")} >
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
                  <TouchableOpacity onPress={this.GetItem.bind(this, rowData.id)} >

                    <FitImage source={{ uri: rowData.foto }} rounded />
                    <Text style={styles.textViewContainer}>{rowData.nama_kabupaten} </Text>
                    <Text style={styles.secViewContainer}>{rowData.keterangan} </Text>
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
        </Content>
        <Footer>
          <FooterTab style={{ backgroundColor: "#2980b9" }}>
            <Button vertical>
              <Icon name="map-marker" style={{ color: 'white' }} />
              <Text style={{ color: 'white' }}>Wisata</Text>
            </Button>
            <Button vertical>
              <Icon name="bed" style={{ color: 'white' }} />
              <Text style={{ color: 'white' }}>Hotel</Text>
            </Button>
            <Button vertical>
              <Icon active name="cutlery" style={{ color: 'white' }} />
              <Text style={{ color: 'white' }}>Kuliner</Text>
            </Button>
            <Button vertical>
              <Icon name="car" style={{ color: 'white' }} />
              <Text style={{ color: 'white' }}>Tour</Text>
            </Button>
          </FooterTab>
        </Footer>
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