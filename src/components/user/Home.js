import React from 'react'
import axios from '../../config/axios'
import { Container, Form, Col, FormGroup, Label, Input, Button, Alert, Jumbotron, Row } from 'reactstrap'
import RegisterForm from './RegisterForm'
import HomeNavbar from './HomeNavbar'

class Home extends React.Component{
    render(){
        return(
            <div>
                <HomeNavbar/>
               <Jumbotron>
                   <Container>
                    <Row>
                   <Col sm="8">
                        <h1 className="display-3">Comm Eco</h1>
                        <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                        <hr className="my-2" />
                        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                        <p className="lead">
                        <Button color="primary">Learn More</Button>
                    </p>
                    </Col>
                    <Col sm='4'>
                        <RegisterForm />
                    </Col>
                    </Row>
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}


export default Home;