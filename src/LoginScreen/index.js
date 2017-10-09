import React, { Component } from "react";
import Login from "./Login.js";
import Register from "./Register.js";
import HomeScreen from "../HomeScreen/index.js";
//import EditScreenTwo from "./EditScreenTwo.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  HomeScreen : {screen: HomeScreen}
}));