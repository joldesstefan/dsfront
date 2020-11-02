import React from 'react';
import validate from "./validators/medication-period-validators";
import Button from "react-bootstrap/Button";
import * as MEDICATION_PERIOD_API from "./api/medication-period-api";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import * as MEDICATION_API from "../medication/api/medication-api";
import * as MEDICATION_TIME_API from "../medication-time/api/medication-time-api";


import MedicationTimeForm from "../medication-time/medication-time-form";
import MedicationTimeTable from "../medication-time/medication-time-table";

 
import MedicationPeriodMedicationTable from './medication-period-medication-table';
import {
 
    Card,
    CardHeader,
     Modal,
    ModalBody,
    ModalHeader,
    
} from 'reactstrap';
import { Redirect } from 'react-router';


class MedicationPeriodPage extends React.Component {

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
                    value: '',
                    placeholder: 'What is the start date?...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 10,
                        isRequired: true,
                        dateValidator : true
                    }
                },
                stopDate: {
                    value: '',
                    placeholder: 'What is the stop date?...',
                    valid: false,
                    touched: false,
                    validationRules: {

minLength: 10 ,
required : true,
dateValidator : true                    }
                }
                 
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchMedication = this.fetchMedication.bind(this);
        this.fetchMedicationPeriod = this.fetchMedicationPeriod.bind(this);
        this.afterFetchMedicationPeriod = this.afterFetchMedicationPeriod.bind(this);

        this.handleDelete= this.handleDelete.bind(this);
        this.deleteMedicationPeriod = this.deleteMedicationPeriod.bind(this);
        this.registerMedicationPeriod = this.registerMedicationPeriod.bind(this);
        this.goToPatientPage = this.goToPatientPage.bind(this);
        this.toogleMessage = this.toogleMessage.bind(this);
        this.fetchMedicationTimes = this.fetchMedicationTimes.bind(this);
        this.toggleInsertTime = this.toggleInsertTime.bind(this);
        this.reloadHandlerAndToggleInserTimes = this.reloadHandlerAndToggleInserTimes.bind(this);
        this.reloadHandler = this.reloadHandler.bind(this);

    }

    toggleInsertTime()
    {
        this.state.insertTime = ! this.state.insertTime;
        this.setState(this.state);
    }
    reloadHandlerAndToggleInserTimes()
    {
this.state.isLoadedMedicationPeriod = false;
this.state.isLoadedTableData = false;
this.state.isLoadedMedication= false;
this.state.insertTime = ! this.state.insertTime;

this.setState(this.state);
this.fetchMedicationPeriod();

    }
    reloadHandler()
    {
this.state.isLoadedMedicationPeriod = false;
this.state.isLoadedTableData = false;
this.state.isLoadedMedication= false;
this.setState(this.state);
this.fetchMedicationPeriod();

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
    this.state.redirectTo = "/patientPage/"+this.state.patientIdToRedirect;
    this.setState(this.state);
}
   
setMedication(medication)
{
    this.state.medicationToSet = medication;
    this.state.isLoadedMedicationToSet = true;
    console.log(this.state.medicationToSet);
    this.setState(this.state);
}


componentDidMount()
{
    this.fetchMedicationPeriod();
 }

 afterFetchMedicationPeriod()
 {


    
    let formIsValid = true;
    for (let formElementName in this.state.formControls) {
        this.state.formControls[formElementName].valid = validate(this.state.formControls[formElementName].value, this.state.formControls[formElementName].validationRules);

        formIsValid = this.state.formControls[formElementName].valid && formIsValid;
    }

    this.setState({
        formControls : this.state.formControls,
         formIsValid: formIsValid
    });

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


    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    registerMedicationPeriod(mP) {
        console.log(JSON.stringify(mP));
        return MEDICATION_PERIOD_API.postUpdateMedicationPeriod(mP, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully updated medication period with id: " + result);
                this.state.messsage ="Successfully updated medication period with id: " + result;
                this.state.showMessage = true;
                this.setState(this.state);
             } else {
                this.setState(({
                    errorStatusMedicationPeriod: status,
                    errorMedicationPeriod: error
                }));
            }
        });
    }

    handleSubmit() {
        let medicationPeriod = {
id : this.state.medicationPeriod.id,
            startDate: this.state.formControls.startDate.value,
            stopDate: this.state.formControls.stopDate.value
             
        };

         this.registerMedicationPeriod(medicationPeriod);
    }

    deleteMedicationPeriod() {
        return MEDICATION_PERIOD_API.deleteMedicationPeriod(this.state.medicationPeriodId, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully deleted mediation period with id: " + result);
                 
                this.state.messsage ="Successfully deleted medication period with id: " + result;
                this.state.showMessage = true;
                this.setState(this.state);
    
             } else {
                let newState = this.state;
                newState.errorStatusMedicationPeriod = status;
                newState.errorMedicationPeriod = error;
                this.setState(newState);
            }
        });
    }
    
handleDelete() {
 
     this.deleteMedicationPeriod();
    
}
toogleMessage()
{
    this.state.showMessage = false;
    this.setState(this.state);
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
                    <Input name='startDate' id='startDateField' placeholder={this.state.formControls.startDate.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.startDate.value}
                           touched={this.state.formControls.startDate.touched? 1 : 0}
                           valid={this.state.formControls.startDate.valid}
                           required
                    />
                    {this.state.formControls.startDate.touched && !this.state.formControls.startDate.valid &&
                    <div className={"error-message row"}> * startDate format not valid </div>}
                </FormGroup>

                <FormGroup id='stopDate'>
                    <Label for='stopDateField'> stopDate: </Label>
                    <Input name='stopDate' id='stopDateField' placeholder={this.state.formControls.stopDate.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.stopDate.value}
                           touched={this.state.formControls.stopDate.touched? 1 : 0}
                           valid={this.state.formControls.stopDate.valid}
                           required
                    />
                    {this.state.formControls.stopDate.touched && !this.state.formControls.stopDate.valid &&
                    <div className={"error-message"}> * stopDate format not valid</div>}
                </FormGroup>

                {this.state.isLoadedMedication &&
                <Row>
                        <Col sm={{size: '4', offset: 8}}>
                            <p>  {JSON.stringify(this.state.medication)} </p>
                        </Col>
                    </Row>
    }
                    <Row>
                        <Col sm={{size: '4', offset: 8}}>
                            <Button type={"submit"} disabled={(!this.state.formIsValid) } onClick={this.handleSubmit}>  Update </Button>
                            <Button type={"submit"}  onClick={this.handleDelete}>  Delete </Button>

                        </Col>
                    </Row>





                   < CardHeader>
                    <strong> TIme management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                        <Button type={"submit"}  onClick={this.toggleInsertTime}>  Add time </Button>

                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoadedTableData && <MedicationTimeTable tableData = {this.state.tableData} reloadHandler = {this.reloadHandler}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                            errorStatusTable={this.state.errorStatusTable}
                                                            error={this.state.errorTable}
                                                        />   }
                        </Col>
                    </Row>
                </Card>

                    <Modal isOpen={this.state.insertTime} toggle={this.toggleInsertTime}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleInsertTime}> Add Time: </ModalHeader>
                    <ModalBody>
                        <MedicationTimeForm reloadHandler={this.reloadHandlerAndToggleInserTimes} medicationPeriodId = {this.state.medicationPeriodId}/>
                    </ModalBody>
                </Modal>



                    

                

                    {this.state.showMessage && 
                     <div>
                            <p>{this.state.messsage}</p>
                            <Button type={"submit"}   onClick={this.toogleMessage}>  OK </Button>
                            </div>
                        
                    
    }

            </div>
        ) ;
    }
}

export default MedicationPeriodPage;
