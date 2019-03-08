import React from 'react';
import { Button, Form, FormGroup, Label, Input, Jumbotron } from 'reactstrap';

  
export default class UserLogin extends React.Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: ''
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
        console.log(formData)
        this.setState(()=>({
            email: '',
            password: ''
        }))
    }

  render() {
    return (
      <Form  onSubmit={this.handleOnSubmit}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="email" className="mr-sm-2">Email</Label>
          <Input type="email" value={this.state.email} onChange={this.handleEmailChange} id="email" placeholder="something@modussystems.com" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="password" className="mr-sm-2">Password</Label>
          <Input type="password" value={this.state.password} onChange={this.handlePasswordChange} id="password" placeholder="secret!@*" />
        </FormGroup>
        <br></br>
        <Button> Login </Button>
      </Form>
    );
  }
}

