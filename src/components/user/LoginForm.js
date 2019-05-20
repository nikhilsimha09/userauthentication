import React from 'react';
import axios from '../../config/axios'
import {Redirect} from 'react-router-dom'
import { Container, Form, Col, FormGroup, Label, Input, Button, Alert } from 'reactstrap'

class LoginForm extends React.Component{
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
                <Container>
                    {/* <h2> Sign In </h2> */}
                    <Form inline className="form" onSubmit={this.handleOnSubmit}>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="signInEmail" className="mr-sm-2"> Email </Label>
                            <Input 
                                type="email"
                                name="email"
                                id="signInEmail"
                                placeholder="example@modussystems.com" 
                                value={this.state.email} 
                                onChange={this.handleEmailChange} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="signInPassword" className="mr-sm-2"> Password </Label>
                            <Input 
                                type="password"
                                name="password"
                                id="signInPassword"
                                placeholder="********" 
                                value={this.state.password} 
                                onChange={this.handlePasswordChange} />
                        </FormGroup>

                        <Button type="submit"> Login </Button>
                        { this.state.noticeMessage && <Alert color="secondary"> {this.state.noticeMessage}</Alert>}
                    </Form>
                </Container>
            </div>
        )
    }
}

export default LoginForm