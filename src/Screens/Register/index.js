import React, { Component } from 'react'
import { Text, View,StyleSheet,TextInput,TouchableOpacity,KeyboardAvoidingView } from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup'
import auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app'
export default class index extends Component {


    constructor(){
        super();
        this.state={
            checkbox:false,
        
        }
    }

    _handleSubmit= (values) => {
    auth()
        .createUserWithEmailAndPassword(values.email,values.password)
        .then(() => {
            const user = firebase.auth().currentUser;
            user.updateProfile({
                displayName:values.name
            });
            alert("Kayıt Oldunuz");
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                alert('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
        alert('That email address is invalid!');
        }

        console.error(error);
        });
        }


    render() {
        return (
            <KeyboardAvoidingView
            style={styles.container}>
                <View style={{ backgroundColor:'white',justifyContent:'center',flex:1,paddingVertical:50,alignItems:'center'}}>
                    <View style={styles.header}>
                        <Text style={styles.header_text}>Welcome!</Text>
                        <Text style={[styles.header_text,{fontSize:18,color:'#1C1939',textAlign:'center',paddingHorizontal:40}]}>Please provide following details for your new account </Text>
                    </View>
                <Formik
                initialValues={{
                    name:'',
                    email:'',
                    password:''
                }}
                onSubmit={this._handleSubmit}
                validationSchema={
                    Yup.object().shape({
                        name:Yup.string().required("Kullanıcı Adı gereklidir"),
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
                    value={values.name}
                    onChangeText={handleChange('name')}
                    style={styles.ınput}
                    placeholder={'User Name'}
                    placeholderTextColor={'black'}
                    />
                    {(errors.name) && <Text style={styles.error}>{errors.name}</Text>}
                    
                    <TextInput 
                    value={values.email}
                    onChangeText={handleChange('email')}
                    keyboardType={'email-address'}
                    style={styles.ınput}
                    placeholder={'Email'}
                    placeholderTextColor={'black'}
                    />
                    {(errors.email) && <Text style={styles.error}>{errors.email}</Text>}
                    <TextInput 
                    style={[styles.ınput,{backgroundColor:'#F7F7F7'}]}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    placeholder='Password'
                    placeholderTextColor={'black'}
                    secureTextEntry={true}
                    />
                    {(errors.password) && <Text style={styles.error}>{errors.password}</Text>}
                    
                    <View style={styles.checkbox_area}>
                        <TouchableOpacity
                        style={styles.checkbox}
                        onPress={() => this.setState({checkbox: !this.state.checkbox})}
                        >
                            { this.state.checkbox &&
                            <Text style={{fontSize: 25,textAlign:'center'}}>✓</Text>

                            }
                        </TouchableOpacity>
                        <Text style={styles.checkbox_text}>By creating your account you have to agree with our Teams and Conditions.</Text>
                    </View>
                
                        
                        
                
                <View >
                    <TouchableOpacity 
                    disabled={!isValid  }
                    onPress={handleSubmit}
                    style={styles.button}>
                        <Text style={styles.button_text}>Sign up my Account</Text>
                    </TouchableOpacity>
                </View>
                </View>
               )}</Formik>
                    <View style={styles.bottom}>
                        <Text style={styles.bottom_text}>Already have an account?</Text>
                            <TouchableOpacity
                            onPress={()=>this.props.navigation.goBack()}
                            >
                                <Text style={{fontSize:20,fontWeight:'bold'}}> - Sign In</Text>
                            </TouchableOpacity>
                    </View>
                    
                </View>
                
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container:{flex:1},
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
    
    button:{
        backgroundColor: '#7165E3',
        padding:20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems:'center',
        bottom:10,            
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
        bottom:10,
    },
    bottom_text:{
        fontSize:17,
    },
    checkbox_area:{
        justifyContent:'center',
        flexDirection:'row',
        margin:65,
        
    },
    checkbox:{
        width:36,
        height:36,
        backgroundColor:'#A8A4CF',
        left:20,
        borderRadius:10,
        borderWidth:1,
        borderColor:'#7165E3'
    },
    checkbox_text:{
        textAlign:'justify',
        left:25
    },
    error:{
        color:'red',
        right:90,
        top:60
    }
})
