import React from 'react'
import { View, StyleSheet, Text, Image, TextInput, TouchableHighlight, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Axios from 'axios'

class UserRegistration extends React.Component{
    constructor(props){
         super(props)
         this.state = {
             username: '',
             email: '',
             password: ''
         }
    }

    onClickListener = (formData) => {
      //Alert.alert("Button Pressed")
      Axios.post('http://10.0.2.2:3001/users/register',{
         username: formData.username,
         email: formData.email,
         password: formData.password
      })
        .then((res) => {
          Alert.alert(res.data.notice)
          Actions.login()
        })
        .catch((err) => console.log(err))
      
    } 

    onLoginClick = () => {
      Actions.login()
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.heading}> MODUS </Text>

              <View style={styles.inputsContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/>
                <TextInput style={styles.inputFields}
                  placeholder="Name"
                  keyboardType="name-phone-pad"
                  onChangeText={(username) => this.setState({username})}
                />
              </View>

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

              <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onClickListener(this.state)}>
                  <Text style={styles.signUpText} > Sign Up </Text>
              </TouchableHighlight>

              <Text style={styles.loginText} onPress={() => this.onLoginClick()}> Login if you are already registered </Text>  
                
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
    },
    loginText: {
      color: 'white',
      fontSize: 15,
      fontWeight: 'bold'
    }
})

export default UserRegistration