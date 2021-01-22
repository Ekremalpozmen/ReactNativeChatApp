import React, { Component } from 'react'
import { Text, View,SafeAreaView,StyleSheet,TextInput,TouchableOpacity,KeyboardAvoidingView } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import database from '@react-native-firebase/database'
import firebase from '@react-native-firebase/app'


export default class index extends Component {

    _handleSubmit = (values,{resetForm}) => {
      const user = firebase.auth().currentUser;      
      const userId=user.uid;
      const userName=user.displayName;
      alert("oda oluştu");
      var database = firebase.database().ref('/rooms');
      database.push({
          name:values.name,
          userId,
          userName
      }).then((result) => {
           resetForm({values:''});
           this.props.navigation.navigate.goBack();
            })
        .catch((error)=>console.log(error));
};

    render() {
        return (
            <KeyboardAvoidingView
            style={{flex:1}}>
            <View style={{flex:1}}>
                <View style={{ backgroundColor:'white',justifyContent:'center',flex:1,paddingVertical:50,alignItems:'center'}}>
                    
                
                    <Formik
                initialValues={{
                    name:'',
                }}
                onSubmit={this._handleSubmit}
                validationSchema={
                    Yup.object().shape({
                        name:Yup.string().required("Room Name İs Required"),
                    })
                }
                >
                    {
                        ({
                            values , 
                            handleSubmit , 
                            isValid , 
                            isSubmitting , 
                            errors , 
                            handleChange
                        })  => (   
                <View style={styles.form}>
                   
                    <TextInput 
                    value={values.email}
                    onChangeText={handleChange('name')}
                    style={styles.ınput}
                    placeholder={'Create Room Name'}
                    placeholderTextColor={'black'}
                    />
                    {(errors.name)  && <Text style={styles.error}> {errors.name}</Text>}
                    
                    
                    
                    
                <View>
                    <TouchableOpacity
                    disabled={!isValid }
                    onPress={handleSubmit}
                    style={styles.button}>
                        <Text style={styles.button_text}>Create Room</Text>
                    </TouchableOpacity>
                </View>
                </View>

                )}</Formik> 
                            
                </View>
            </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    header:{             
        alignItems:'center',
    },
    header_text:{
        color:'#1C1939',
        fontSize:40,
        margin:13
    },
    form:{
        alignItems:'center',
    },
    ınput:{
        top:70,
        backgroundColor:'#A8A4CF',
        padding:15,
        width:300,
        height:50,
        borderRadius:10,
        paddingHorizontal:25,
        marginBottom:14
    },
    forgotpass:{
        justifyContent:'flex-end',
        left:90,
        top:60
    },
    button:{
        backgroundColor: '#7165E3',
        padding:20,
        marginTop:80,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems:'center',
        
    },
    button_text:{
        color:'white',
        fontWeight:'600',
        fontSize:18,
        textAlign:'center'
    },
    bottom:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
    },
    bottom_text:{
        fontSize:17
    },
    error:{
        color:'red',
        right:90,
        top:60
    }
})

