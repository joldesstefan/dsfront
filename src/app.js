import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavigationBar from './navigation-bar'
import Home from './home/home';
import Test from './test/test';
import DoctorHome from './doctor/doctor-home';
//import {browserHistory} from 'react-switch'

import PersonContainer from './person/person-container'
import PersonPage from './person/components/person-page'
import DoctorPage from './doctor/doctor-page'
import CaregiverPage from './caregiver/caregiver-page'
 
import MedicationPage from './medication/medication-page'

import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';
import PatientPage from './patient/patient-page';

class App extends React.Component {


    render() {

        return (
            <div className={styles.back}>
            <Router >
                <div>
                    <NavigationBar />
                    <Switch >

                        <Route
                            exact
                            path='/'
                            render={() => <Home/>}
                        />

                        <Route
                            exact
                            path='/person'
                            render={() => <PersonContainer/>}
                        />
                          <Route
                            
                            path='/person/:id'
                            component = {PersonPage} // cum fac sa dat <TEst personID = ?/>
                        />
                           <Route
                            exact
                            path='/test'
                            render={() => <Test />}
                        />


                           <Route
                            exact
                            path='/doctorHome'
                            render={() => <DoctorHome />}
                        />

 <Route
                            
                            path='/doctorPage/:id'
                            component = {DoctorPage} // cum fac sa dat <TEst personID = ?/>
                        />

<Route
                            
                            path='/caregiverPage/:id'
                            component = {CaregiverPage} // cum fac sa dat <TEst personID = ?/>
                        />


<Route
                            
                            path='/patientPage/:id'
                            component = {PatientPage} // cum fac sa dat <TEst personID = ?/>
                        />




                        
 <Route
                            
                            path='/medicationPage/:id'
                            component = {MedicationPage} // cum fac sa dat <TEst personID = ?/>
                        />

                        {/*Error*/}
                        <Route
                            exact
                            path='/error'
                            render={() => <ErrorPage/>}
                        />

                        <Route render={() =><ErrorPage/>} />
                    </Switch>
                </div>
            </Router>
            </div>
        )
    };
}

export default App
