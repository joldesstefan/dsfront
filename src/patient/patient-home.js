import React from 'react';
import validate from "./validators/patient-validators";
import Button from "react-bootstrap/Button";
 import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import { Redirect } from 'react-router';
import * as PATIENT_API from "./api/patient-api";
import * as CAREGIVER_API from "../caregiver/api/caregiver-api";
import * as MEDICATION_PERIOD_API from "../medication-period/api/medication-period-api";

import {
    Card,
    CardHeader,
    Modal,
    ModalBody,
    ModalHeader
} from 'reactstrap';
import PatientCaregiverTable from './patient-caregiver-table';
import MedicationPeriodTable from '../medication-period/medication-period-table'
import MedicationPeriodForm from '../medication-period/medication-period-form'
import MedicationPeriodPatientTable from './medication-period-patient-table'

class PatientHome extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {

            patientId : props.match.params.id,
            
            patient : null,
            isLoadedPatient : false ,
            errorPatient : null,
            errorStatusPatient: 0,


            caregiver: null,
            isLoadedCaregiver: false,
            errorCaregiver : null,
            errorStatusCaregiver: 0,

            medicationPeriods : [],
            isLoadedMedicactionPeriods: false,
            errorMedicationPeriods : null,
            errorStatusMedicationPeriods: 0,
            

        }
        this.fetchPatient = this.fetchPatient.bind(this);
        this.afterFetchPatient = this.afterFetchPatient.bind(this);

        this.fetchCaregiver = this.fetchCaregiver.bind(this);
this.fetchMedicationPeriods = this.fetchMedicationPeriods.bind(this);
    }

    componentDidMount()
    {
this.fetchPatient();
    }
    fetchPatient() {
        let newParams = {"id" :  this.state.patientId};
        return PATIENT_API.getPatientById(newParams,(result, status, err) => {
            if (result !== null && status === 200) {
                  this.state.patient = result;
                 this.state.isLoadedPatient = true;

                  this.setState(this.state);
                 this.afterFetchPatient();
             } else {
                  this.state.errorStatus = status;
                 this.state.error = err;
                 this.setState(this.state);
                 
            }
         
        });
    }

    afterFetchPatient() {
         if(this.state.patient.caregiverId != null)
         {
             this.fetchCaregiver();
             this.fetchMedicationPeriods();
             
         }
    }

    fetchCaregiver() {
        let newParams = {"id" :  this.state.patient.caregiverId};
        return CAREGIVER_API.getCaregiverById(newParams,(result, status, err) => {
            if (result !== null && status === 200) {
                  this.state.caregiver = result;
                 this.state.isLoadedCaregiver = true;

                  this.setState(this.state);
              } else {
                  this.state.errorStatusCaregiver = status;
                 this.state.errorCaregiver = err;
                 this.setState(this.state);
                 
            }
         
        });
    }

    fetchMedicationPeriods() {
        let newParams = {"patientId" :  this.state.patient.id};
        return MEDICATION_PERIOD_API.getMedicationPeriodByPatient(newParams,(result, status, err) => {
            if (result !== null && status === 200) {
                  this.state.medicationPeriods = result;
                 this.state.isLoadedMedicactionPeriods = true;

                  this.setState(this.state);
              } else {
                  this.state.errorStatusMedicationPeriods = status;
                 this.state.errorMedicationPeriods = err;
                 this.setState(this.state);
                 
            }
         
        });
    }
    


    render() {
    

        return (
            <div>

{this.state.isLoadedPatient && <p>{JSON.stringify(this.state.patient)} </p>}
{this.state.isLoadedCaregiver && <p>{JSON.stringify(this.state.caregiver)} </p>}








<CardHeader>
                    <strong> Medication Plan </strong>
                </CardHeader>
                <Card>
                     

 


                     <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoadedMedicactionPeriods && <MedicationPeriodPatientTable tableData = {this.state.medicationPeriods}  />}
                            {this.state.errorStatusMedicationPeriods > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatusMedicationPeriods}
                                                            error={this.state.errorMedicationPeriods}
                                                        />   }
                        </Col>
                    </Row>




                </Card> 


            </div>
        );


        }




}
export default PatientHome;
