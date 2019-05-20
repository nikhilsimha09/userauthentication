import React from 'react'
import axios from '../../config/axios'
import { Container, Form, Col, FormGroup, Label, Input, Button, Alert, Jumbotron } from 'reactstrap'

class RegisterForm extends React.Component{
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
                <Container>
                    <h2> Register </h2>
                    
                    { this.state.noticeMessage && <Alert color="secondary"> {this.state.noticeMessage}</Alert>}
                    
                    <Form className="form" onSubmit={this.handleSubmit}>
                        <Col>
                            <FormGroup>
                                <Label for="registerUsername"> Username </Label>
                                <Input 
                                    type="username"
                                    name="username"
                                    id="registerUsername"
                                    placeholder="example" 
                                    value={this.state.username} 
                                    onChange={this.usernameChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="registerEmail"> Email </Label>
                                <Input 
                                    type="email"
                                    name="email"
                                    id="registerEmail"
                                    placeholder="example@modussystems.com" 
                                    value={this.state.email} 
                                    onChange={this.emailChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="registerPassword"> Password </Label>
                                <Input 
                                    type="password"
                                    name="password"
                                    id="registerPassword"
                                    placeholder="******** (8 Characters)" 
                                    value={this.state.password} 
                                    onChange={this.passwordChange.bind(this)} />
                            </FormGroup>

                            <Button type="submit"> Sign Up </Button>
                        </Col>
                    </Form>
                </Container>
            </div>
        )
    }
}


export default RegisterForm;