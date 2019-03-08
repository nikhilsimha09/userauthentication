import React from 'react'
import axios from '../../config/axios'


class Register extends React.Component{
    constructor(){
        super()
        this.state = {
            username: '',
            email: '',
            password: '',
            noticeMessage: ''
        }
        this.emailChange = this.emailChange.bind(this)
    }

    // defining the regular es6 way without any binding
    usernameChange = (e) => {
        const username = e.target.value
        this.setState(() => ({username}))
    }

    // the regular method definition Binding has to be done in the constructor
    emailChange(e){
        const email = e.target.value
        //console.log(this)
        this.setState(() => ({email}))
    }

    // the regualr method defination Binding has to be set while invoking in the form
    passwordChange(e){
        const password = e.target.value
        //console.log(this)
        this.setState(() => ({password}))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        //client side validations
        //TODO:
        axios.post('/users/register', formData)
            .then((response) => {
                // const { notice } = response.data
                // alert(notice)
                console.log(response.data.notice)
                this.setState(() => ({
                    noticeMessage: response.data.notice,
                    username: '',
                    email: '',
                    password: ''
                }))
            })
            .catch((err) => console.log(err))

        
    }


    render(){
        return(
            <div>
                <h2>Register With Us</h2>
                { this.state.noticeMessage && <p> {this.state.noticeMessage} </p>}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username
                        <input type="text" value={this.state.username} onChange={this.usernameChange}/>
                    </label><br/>

                    <label>
                        email
                        <input type="text" value={this.state.email} onChange={this.emailChange}/>
                    </label><br/>

                    <label>
                        password
                        <input type="text" value={this.state.password} onChange={this.passwordChange.bind(this)}/>
                    </label><br/>

                    <input type="submit" />
                </form>
            </div>
        )
    }
}


export default Register;