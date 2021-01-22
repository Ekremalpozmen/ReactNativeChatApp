import React, { Component } from 'react'
import { Text, SafeAreaView,TouchableOpacity,FlatList,View} from 'react-native'
import auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app'
import Icon from 'react-native-vector-icons/FontAwesome5'
import database from '@react-native-firebase/database'
import RoomItem from '../../Components/Rooms/RoomItem'

export default class index extends Component {

    constructor(){
        super();
        this.state={
            rooms:[]
        }
    }

    static navigationOptions = ({navigation}) =>  {
        return{
            title:'Rooms',
            headerLeft:<TouchableOpacity
            onPress={()=>{navigation.navigate("ChatRoomCreate")}}
            style={{marginLeft:10,padding:5}}
            ><Icon name={'comment-medical'} color={'#7165E3'} size={30}/></TouchableOpacity>,
            headerRight:
            <TouchableOpacity
            onPress={() => {
                auth()
                    .signOut()
                    .then(() =>{
                        navigation.navigate("Auth");
        });
            }}        
            style={{marginRight:10}}><Icon name={'sign-out-alt'} color={'blue'} size={25} /></TouchableOpacity>
            
        }
    }


    getData = () => {
        database()
        .ref('/rooms')
        .orderByChild('name')
        .on('value' , snapshot => {
            var rooms = [];
            snapshot.forEach((item)=>{
                rooms.push({
                    name:item.val().name,
                    userName:item.val().userName,
                    userId:item.val().userId,
                    id:item.key
                })
            })
            this.setState({rooms})
        });
    }
    
    componentDidMount(){
      const user = firebase.auth().currentUser;
      this.getData();
    };


    renderItem= ({ item }) => {
        return <RoomItem item={item} />
    };

    render() {
        console.log(this.state.rooms);
        return (
            <SafeAreaView>
                <FlatList
                data={this.state.rooms}
                renderItem={this.renderItem}
                />
            </SafeAreaView>
        )
    }
}
