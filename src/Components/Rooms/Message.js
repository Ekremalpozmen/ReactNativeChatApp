import React, { Component } from 'react'
import { Text, View ,StyleSheet} from 'react-native'
import firebase from '@react-native-firebase/app'

const Message = ({item , index }) => {
    const user = firebase.auth().currentUser;
    const userId = user.uid;
    return(
        <View style={(userId != item.userId ) ? styles.other : styles.me}>
            <View style={[styles.bubble , { backgroundColor:(userId != item.userId ==0 ) ? '#16a085' : '#9b59b6'}]}>
                <Text style={{fontSize:17,fontWeight:'600',color:(userId != item.userId )? 'black' : 'white'}}>
                   {item.text}
                </Text>
                <Text style={{fontSize:11,fontWeight:'600',color:(userId != item.userId )? 'black' : 'white'}}>
                   {item.userName}
                </Text>
            </View>
         </View>
    )
};

const styles = StyleSheet.create({
    other:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    me:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    bubble:{
        padding:20,
        backgroundColor:'grey',
        width:150,
        marginBottom:10,
        borderRadius:8
    }
})

export default Message;