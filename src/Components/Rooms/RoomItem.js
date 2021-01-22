import React from 'react'
import { Text, View,TouchableOpacity,StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import NavigationService from '../NavigationService'
const RoomItem = ({item}) => {
    return(
        <TouchableOpacity
        onPress={()=> 
            NavigationService.navigate('ChatRoomDetail',{
                id:item.id,
                name:item.name,
                roomUserId:item.userId
            })
        }
        style={styles.item}>
            <Icon  name={'door-open'} size={30}/>
            <View style={{marginLeft:10}}>
                <Text style={styles.roomTitle}>{item.name}</Text>
                <Text style={styles.createName}>{item.userName} tarafından oluşturuldu</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    item:{
        backgroundColor:'#ff4a71',
        shadowOpacity: 0.25,
        shadowRadius: 10.84,
        elevation: 7,
        borderRadius:7,
        padding:20,
        margin:8,
        marginBottom:7,
        flexDirection:'row',
        alignItems:'center'
    },
    roomTitle:{
        fontSize:27,
        color:'#303c85',
        marginLeft:2,
        fontWeight:'bold'
    },
    createName:{
        marginLeft:2,
        fontStyle:'italic',
        fontSize:15
        
    }

})

export default RoomItem;