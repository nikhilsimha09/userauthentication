import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import UserRegistration from '../screens/UserRegistration'
import UserLogin from '../screens/UserLogin'

const Routes = () => {
    return(
        <Router>
            <Scene key="root">
                <Scene key="registration" component={UserRegistration} title= "Registration" initial={true} />
                <Scene key="login" component={UserLogin} title="Login" />
            </Scene>
        </Router>
    )
}

export default Routes