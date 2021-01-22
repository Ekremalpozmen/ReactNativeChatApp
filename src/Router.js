import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import Login from './Screens/Login/index';
import Register from './Screens/Register/index';
import HomeIndex from './Screens/Home/index';
import AuthRedirect from './AuthRedirect/index';
import ChatRoomCreate from './Chat/Create/index'
import ChatRoomDetail from './Chat/Detail/index'

const AppStack =createStackNavigator({
  HomeIndex:{
    screen:HomeIndex
  },
  ChatRoomCreate:{
    screen:ChatRoomCreate
  },
  ChatRoomDetail:{
    screen:ChatRoomDetail
  }

})

const AuthenticateStack = createStackNavigator({
  Login:{
    screen:Login,
    navigationOptions:{
      header:null
    }
    
  },
  Register:{
      screen:Register,     
      navigationOptions:{
        header:null
      }
    },  
    
  });


const SwitchNavigtor = createSwitchNavigator({
  App:AppStack,
  AuthRedirect,
  Auth:AuthenticateStack
},{
  initialRouteName:'AuthRedirect'
})
  
  export default createAppContainer(SwitchNavigtor);