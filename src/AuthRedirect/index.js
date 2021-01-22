import React, { Component } from 'react'
import { Text, View } from 'react-native'
import auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app'
export default class index extends Component {

    componentDidMount(){
        const user = firebase.auth().currentUser;

        if (user) {
            console.log(user.displayName);
            this.props.navigation.navigate("App");
         console.log('User email: ', user.email);
        }
        else {
            this.props.navigation.navigate("Auth");
            console.log("kullanıcı yok");
        }
    }


    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}
