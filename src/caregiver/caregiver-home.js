import React from 'react';
import validate from "./validators/caregiver-validators";
import Button from "react-bootstrap/Button";
 import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import { Redirect } from 'react-router';
import * as DOCTOR_API from "./api/caregiver-api";
import * as PATIENT_API from "../patient/api/patient-api";
import PatientCaregiverTable from './patient-caregiver-table';

import {
    Card,
    CardHeader,
    Modal,
    ModalBody,
    ModalHeader
} from 'reactstrap';
 
class CaregiverHome extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
redirect : false,
redirectTo : "/",
caregiverId : props.match.params.id,
caregiver : null,
isLoaded : false,
errorStatus : 0,
error : "",
showMessage : false,
messsage : "",
 

          tableData: [], 
          isLoadedTableData: false,

     errorStatusTable : 0,
errorTable : "",


 
        }
            this.fetchCaregiver = this.fetchCaregiver.bind(this);
 this.afterFetchCaregiver = this.afterFetchCaregiver.bind(this);
 this.fetchPatients = this.fetchPatients.bind(this);

     }


     fetchPatients() {
        let patientWithCaregiverId = {
             caregiverId : this.state.caregiverId
         }
        return PATIENT_API.getPatientByCaregiver(patientWithCaregiverId,(result, status, err) => {

            if (result !== null && status === 200) {
                this.state.tableData = result;
               // console.log("USer resumt : " + result);

                this.state.isLoadedTableData = true;
                this.setState(this.state);
            } else {
                this.state.errorStatusTable = status;
                this.state.errorTable =  err;
                this.setState(this.state);
            }
        });
    }

    fetchCaregiver() {
        let newParams = {"id" :  this.state.caregiverId};
        return DOCTOR_API.getCaregiverById(newParams,(result, status, err) => {
            if (result !== null && status === 200) {
                  this.state.caregiver = result;
                 this.state.isLoaded = true;
                 
                  this.setState(this.state);
                 this.afterFetchCaregiver();
             } else {
                  this.state.errorStatus = status;
                 this.state.error = err;
                 this.setState(this.state);
                 
            }
         
        });
    }
componentDidMount()
{
    this.fetchCaregiver();

   


}

afterFetchCaregiver()
{
this.fetchPatients();
 
}

 





 




    render() {
       
        return (
            <div>

                
                 {this.state.redirect === false &&    <p> {this.state.caregiverId}</p>}
                  {this.state.redirect === true && <Redirect to = {this.state.redirectTo}/>}
{this.state.isLoaded && <p> {JSON.stringify(this.state.caregiver)}</p>

        
                    
    }

    

                    {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }


            


            

<CardHeader>
                    <strong> Patients </strong>
                </CardHeader>
                <Card>
                     
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoadedTableData && <PatientCaregiverTable tableData = {this.state.tableData}/>}
                            {this.state.errorStatusTable > 0 && <APIResponseErrorMessage
                                                            errorStatusTable={this.state.errorTable}
                                                            error={this.state.errorTable}
                                                        />   }
                        </Col>
                    </Row>
                </Card>



                    
             
            </div>
        ) ;
    }
}

export default CaregiverHome;
