import React from 'react'
import { View, StyleSheet, Text, Image, TextInput, TouchableHighlight, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Axios from 'axios'

class UserLogin extends React.Component{
    constructor(props){
         super(props)
         this.state = {
             email: '',
             password: ''
         }
    }

    onClickLogin = (formData) => {
      Axios.post('http://10.0.2.2:3001/users/login',{
        email: formData.email,
        password: formData.password
     })
       .then((res) => {
         Alert.alert(res.data.notice)
         console.log(res.data.user.tokens)
         Actions.login()
       })
       .catch((err) => console.log(err))
      }
     

    onClickListener = () => {
      //Alert.alert("Button Pressed")
      Actions.registration()
    } 

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.heading}> MODUS </Text>

              <View style={styles.inputsContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
                <TextInput style={styles.inputFields} 
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={(email) => this.setState({email})}
                />
              </View>

              <View style={styles.inputsContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
                <TextInput style={styles.inputFields}
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={(password) => this.setState({password})}
                />
              </View>

              <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onClickLogin(this.state)}>
                  <Text style={styles.signUpText} > Login </Text>
              </TouchableHighlight>

              <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onClickListener('sign_up')}>
                  <Text style={styles.signUpText} > Sign Up </Text>
              </TouchableHighlight>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3995d6'
    },
    heading: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 50
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent:'center'
    },
    inputsContainer:{
        borderBottomColor: 'white',
        backgroundColor: 'white',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputFields:{
        height: 45,
        marginLeft: 15,
        borderBottomColor:'white',
        flex:2
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
    },
    signupButton: {
      backgroundColor: "#152f42",
    },
    signUpText: {
      color: 'white',
      fontSize: 20
    }
})

export default UserLogin