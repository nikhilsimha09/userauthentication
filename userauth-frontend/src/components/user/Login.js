import React from 'react';
import axios from '../../config/axios'
import {Redirect} from 'react-router-dom'

class UserLogin extends React.Component{
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            redirectList: false,
            noticeMessage:''
        }
    }

    handleEmailChange = (e) => {
        const email = e.target.value
        this.setState(() => ({email}))
    }       

    handlePasswordChange = (e) => {
        const password = e.target.value
        this.setState(() => ({password}))
    }

    handleOnSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/users/login', formData)
            .then((response) => {
                console.log(response.data.notice)
                this.setState(() => ({    
                    email: '',
                    password: '',
                    redirectList: true,
                    noticeMessage: response.data.notice
                }))
            })
            .catch((err) => console.log(err))
        console.log(formData)
        this.setState(()=>({
            email: '',
            password: '',
            redirectList: false,
            noticeMessage: ''
        }))
    }

    render(){
        return(
            <div>
                { this.state.noticeMessage && <p> {this.state.noticeMessage} </p>}
                <form onSubmit={this.handleOnSubmit}>
                    <label>
                        email
                        <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
                    </label><br/>
                    <label>
                        password
                        <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
                    </label><br/>

                    <button type="submit"> Login </button>

                </form>
            </div>
        )
    }
}

export default UserLogin