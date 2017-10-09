import React from "react";
import { AppRegistry, Alert, View, Image } from "react-native";

import {
    Text,
    Container,
    Card,
    CardItem,
    Body, Label, Input,
    Content,
    Header,
    Left,
    Right, Item,
    Icon,
    Title,
    Button,
    H1, Form
} from "native-base";

//Nama class login
export default class Login extends React.Component {

    //header null agar header tidak tampil
    static navigationOptions = ({ navigation }) => ({
        header: (
            null
        )
    });

    //Membuat constructor untuk devinisi field
    constructor(props) {

        super(props)

        this.state = {

            UserEmail: '',
            UserPassword: ''

        }

    }

    //Membuat fungsi login pada web services api
    UserLoginFunction = () => {

        const { UserEmail } = this.state;
        const { UserPassword } = this.state;


        fetch('https://banyu.center/reactnative/login.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                email: UserEmail,
                password: UserPassword

            })

        }).then((response) => response.json())
            .then((responseJson) => {

                // If server response message same as Data Matched
                if (responseJson === 'Data Matched') {

                    //Then open Profile activity and send user email to profile activity.
                    this.props.navigation.navigate('HomeScreen', { Email: UserEmail });

                }
                else {

                    Alert.alert(responseJson);
                }

            }).catch((error) => {
                console.error(error);
            });


    }


    render() {
        return (
            <Container style={{ backgroundColor: "white" }}>
                <Content>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>


                        <Image source={require('./img/logo.png')} style={{ height: 200, width: 180 }} />

                    </View>
                    <Form>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input 
                            onChangeText={UserEmail => this.setState({UserEmail})}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input 
                            secureTextEntry={true}
                            onChangeText={UserPassword => this.setState({UserPassword})}
                            />
                        </Item>
                    </Form>

                    <Button
                        full
                        rounded
                        primary
                        style={{ marginLeft: 10, marginRight: 10, marginTop: 25 }}
                        
                        onPress={this.UserLoginFunction}
                    >
                        <Text>Login</Text>
                    </Button>
                    <Button
                        full
                        rounded
                        warning
                        style={{ marginLeft: 10, marginRight: 10, marginTop: 5 }}
                        onPress={() => this.props.navigation.navigate("Register")}
                    >
                        <Text>Daftar</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}