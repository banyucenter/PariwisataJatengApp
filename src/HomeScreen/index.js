
import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
import MainScreenNavigator from "../ChatScreen/index.js";
import WisataScreen from "./WisataScreen.js";
import DetailWisata from "./DetailWisata.js";
import SearchKabupaten from "./SearchKabupaten.js";
import Profile from "../ProfileScreen/index.js";
import SideBar from "../SideBar/SideBar.js";


import { DrawerNavigator } from "react-navigation";

const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Chat: { screen: MainScreenNavigator },
    Profile: { screen: Profile },
    Wisata: { screen: WisataScreen },
    Detail: { screen: DetailWisata },
    SearchKabupaten: { screen: SearchKabupaten }

  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter;