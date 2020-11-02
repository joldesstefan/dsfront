import React from 'react';
 import Button from "react-bootstrap/Button";
import * as MEDICATION_PERIOD_API from "../medication-period/api/medication-period-api";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import * as MEDICATION_API from "../medication/api/medication-api";
import * as MEDICATION_TIME_API from "../medication-time/api/medication-time-api";


  
import MedicationTimePatientTable from "./medication-time-patient-table";

 import {
 
    Card,
    CardHeader,
     Modal,
    ModalBody,
    ModalHeader,
    
} from 'reactstrap';
import { Redirect } from 'react-router';


class MedicationPeriodPatientPage extends React.Component {

    constructor(props) {
        super(props);
  
        this.state = {
            medicationPeriodId : props.match.params.id,
            medicationPeriod : null,
            isLoadedMedicationPeriod : false,

            patientIdToRedirect : null,
            errorStatusMedicationPeriod: 0,
            errorMedicationPeriod: null,
             

            medication : null,
            isLoadedMedication : false,

            errorStatusMedication: 0,
            errorMedication: null,

            tableData : [],
            isLoadedTableData: false , 
            
            errorTable: null,
            errorStatusTable : false,

            showMessage : false,
            message : null,

            formIsValid: false,



            redirect : false,
            redirectTo : "",
insertTime : false,

            formControls: {
                startDate: {
                    value: ''
                   
                },
                stopDate: {
                    value: ''
                
                }
                 
            }
        };

      
        this.fetchMedication = this.fetchMedication.bind(this);
        this.fetchMedicationPeriod = this.fetchMedicationPeriod.bind(this);
        this.afterFetchMedicationPeriod = this.afterFetchMedicationPeriod.bind(this);

         this.goToPatientPage = this.goToPatientPage.bind(this);
         this.fetchMedicationTimes = this.fetchMedicationTimes.bind(this);

    }

  
  

    fetchMedicationTimes() {

        let medicationPeriodIdToSend = {
            medicationPeriodId : this.state.medicationPeriodId
        };
         return MEDICATION_TIME_API.getMedicationTimeByMedicationPeriod(medicationPeriodIdToSend,(result, status, err) => {
            if (result !== null && status === 200) {
                  this.state.tableData = result;
                 this.state.isLoadedTableData = true; 
                 this.setState(this.state);
             } else {
                  this.state.errorStatusTable = status;
                 this.state.errorTable = err;
                 this.setState(this.state);
                 
            }
         
        });
    }
goToPatientPage()
{
    this.state.redirect = true;
    this.state.redirectTo = "/patientHome/"+this.state.patientIdToRedirect;
    this.setState(this.state);
}
   
 


componentDidMount()
{
    this.fetchMedicationPeriod();
 }

 afterFetchMedicationPeriod()
 {

 

    this.fetchMedicationTimes();

     this.fetchMedication();
 }
fetchMedication() {

    let medicationIdToSend = {
        id : this.state.medicationPeriod.medicationId
    };
    return MEDICATION_API.getMedicationById(medicationIdToSend,(result, status, err) => {

        if (result !== null && status === 200) {
            this.state.medication = result;
            this.state.isLoadedMedication = true;
            this.setState(this.state);
         } else {
            this.state.errorStatusMedication = status;
            this.state.errorMedication = err;
            this.setState(this.state);
        }
    });
}
fetchMedicationPeriod() {
let medicationPeriodIdToSend = {
    id : this.state.medicationPeriodId
};
 
  return MEDICATION_PERIOD_API.getMedicationPeriodById(medicationPeriodIdToSend,(result, status, err) => {

        if (result !== null && status === 200) {
  this.state.medicationPeriod = result;
  this.state.isLoadedMedicationPeriod = true;
  this.state.formControls.startDate.value = result.startDate;
  this.state.formControls.stopDate.value = result.stopDate;
  this.state.patientIdToRedirect = result.patientId;
  this.setState(this.state);
  this.afterFetchMedicationPeriod()
            // console.log("MEdication:: " + result);
          // console.log("Medication resumt : " + JSON.stringify(result)); zicea ceva a nu vedea ca primea object si nii in console nu il afica ca obiect numai [Object object]
        } else {
            this.state.errorStatusMedicationPeriod = status;
            this.state.errorMedicationPeriod = err;
            this.setState(this.state);
        }
    });
}
 
    

    render() {
        return (
            <div>
                {this.state.redirect && <Redirect to = {this.state.redirectTo}/>}
                <Button type={"submit"}  onClick={this.goToPatientPage}>  Go Back </Button>


{
                    this.state.errorMedicationPeriod > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatusMedicationPeriod} error={this.state.errorMedicationPeriod}/>
                }
                <FormGroup id='startDate'>
                    <Label for='startDateField'> startDate: </Label>
                    <Input name='startDate' id='startDateField'  
                            defaultValue={this.state.formControls.startDate.value}
                     />
                  
                </FormGroup>

                <FormGroup id='stopDate'>
                    <Label for='stopDateField'> stopDate: </Label>
                    <Input name='stopDate' id='stopDateField'  
                            defaultValue={this.state.formControls.stopDate.value}
                         
                    />
                 </FormGroup>

                {this.state.isLoadedMedication &&
                <Row>
                        <Col sm={{size: '4', offset: 8}}>
                            <p>  {JSON.stringify(this.state.medication)} </p>
                        </Col>
                    </Row>
    }
                    




                   < CardHeader>
                    <strong> Time </strong>
                </CardHeader>
                <Card>
                  
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoadedTableData && <MedicationTimePatientTable tableData = {this.state.tableData} />}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                            errorStatusTable={this.state.errorStatusTable}
                                                            error={this.state.errorTable}
                                                        />   }
                        </Col>
                    </Row>
                </Card>
 

                    

                 

            </div>
        ) ;
    }
}

export default MedicationPeriodPatientPage;
