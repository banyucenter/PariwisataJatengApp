import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon
} from "native-base";
const routes = ["Home", "Chat", "Profile"];
export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Image
            source={{
              uri: "https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/img/drawer-cover.png"
            }}
            style={{
              height: 120,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={{
                uri: "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/005/026/205/1d97424.jpg"
              }}
              square
              style={{ height: 80, width: 70 }}>
              </Image>
              <Text style={{color:"white"}}>Ipung Purwono</Text>
          </Image>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}
                >
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}