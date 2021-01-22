import React, { Component } from 'react'
import { Text, View,SafeAreaView,StyleSheet,TextInput,TouchableOpacity,KeyboardAvoidingView } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/FontAwesome5'
import auth from '@react-native-firebase/auth'

export default class index extends Component {

    constructor(){
        super();
        this.state={
            hidePassword:true
        }
    }


    _handleSubmit=(values) => {
        auth()
            .signInWithEmailAndPassword(values.email,values.password )
            .then(() => {
                this.props.navigation.navigate("App");                
            })
            .catch(error => {
                if (error.code === 'auth/wrong-password') {
                    alert('wrong password')
                    return;
                }

                if (error.code === 'auth/user-not-found') {
                alert('user not found');
                return;
                }

                console.error(error);
            });
    }
    
    render() {
        return (
            <KeyboardAvoidingView
            style={{flex:1}}>
            <View style={{flex:1}}>
                <View style={{ backgroundColor:'white',justifyContent:'center',flex:1,paddingVertical:50,alignItems:'center'}}>
                    <View style={styles.header}>
                        <Text style={styles.header_text}>Welcome Back!</Text>
                        <Text style={[styles.header_text,{fontSize:18,color:'#1C1939'}]}>Sign in to continue </Text>
                    </View>
                
                    <Formik
                initialValues={{
                    email:'',
                    password:''
                }}
                onSubmit={this._handleSubmit}
                validationSchema={
                    Yup.object().shape({
                        email:Yup.string().required("Email gereklidir"),
                        password:Yup.string().required("Şifre gereklidir"),
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
                    onChangeText={handleChange('email')}
                    keyboardType={'email-address'}
                    style={styles.ınput}
                    placeholder={'Email'}
                    placeholderTextColor={'black'}
                    />
                    {(errors.email)  && <Text style={styles.error}> {errors.email}</Text>}
                    <TextInput 
                    value={values.password}
                    onChangeText={handleChange('password')}
                    style={[styles.ınput,{backgroundColor:'#F7F7F7'}]}
                    placeholder='Password'
                    placeholderTextColor={'black'}
                    secureTextEntry={this.state.hidePassword}
                    />
                    {(errors.password)  && <Text style={styles.error}> {errors.password}</Text>}
                    <TouchableOpacity onPress={()=>this.setState({ hidePassword:!this.state.hidePassword})} style={{ position:'absolute',right:15,top:145}}>
                         <Icon name={(this.state.hidePassword) ? "eye-slash" : 'eye'} size={20}  />
                    </TouchableOpacity>
                    
                    
                    <TouchableOpacity style={styles.forgotpass}>
                        <Text style={{fontSize:14,fontWeight:'500'}}>Forgot Password?</Text>
                    </TouchableOpacity>
                <View>
                    <TouchableOpacity
                    disabled={!isValid }
                    onPress={handleSubmit}
                    style={styles.button}>
                        <Text style={styles.button_text}>Sign in My Account</Text>
                    </TouchableOpacity>
                </View>
                </View>

                )}</Formik> 
                    <View style={styles.bottom}>
                        <Text style={styles.bottom_text}>Don’t have an account?</Text>
                            <TouchableOpacity
                             onPress={()=> this.props.navigation.navigate("Register")}
                            >
                                <Text style={{fontSize:20,fontWeight:'bold'}}>-Sign Up</Text>
                            </TouchableOpacity>
                    </View>
                    
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
