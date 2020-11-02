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

class PatientPage extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
redirect : false,
redirectTo : "/",
patientId : props.match.params.id,
patient : null,
caregiver: null,
caregiverToSet: null,
caregiverToSetLoaded: false,

isLoadedCaregiver : false,
isLoaded : false,


tableDataCaregiver : [],
isLoadedTableDataCaregiver : false,


tableDataMedicationPeriod : [],
isLoadedTableDataMedicationPeriod : false,

errorStatus : 0,
error : "",


errorStatusCaregiver: 0,
errorCaregiver: "",



errorStatusCaregiverTable: 0,
errorCaregiverTable: "",


errorStatusMedicationPeriodTable: 0,
errorMedicationPeriodTable: "",

insertMedicationPeriod : false,

showMessage : false,
messsage : "",
formIsValid: false,
formControls: {
    
    
    name: {
        value: '',
        placeholder: 'What is the patient\'s name?',
        valid: false,
        touched: false,
        validationRules: {
            minLength: 3,
            isRequired: false
        }
    },
    username: {
        value: '',
        placeholder: 'What is the patient\'s Username?',
        valid: false,
        touched: false,
        validationRules: {
            minLength: 3,
            isRequired: true
        }
    },
    password: {
        value: '',
        placeholder: 'What is the patient\'s Password?',
        valid: false,
        touched: false,
        validationRules: {
            minLength: 3,
            isRequired: false
        }
    },
    birthDate: {
        value: '',
        placeholder: 'What is the patient\'s Birth Date?...YYYY-MM-DD',
        valid: false,
        touched: false,
        validationRules: {
            minLength: 10,
            isRequired: false,
            dateValidator: true
        }
    },
    gender: {
        value: '',
        placeholder: 'What is the patient\'s Gender ?',
        valid: false,
        touched: false,
        validationRules: {
            minLength: 3,
            isRequired: false
        }
    },
    address: {
        value: '',
        placeholder: 'What is the patient\'s Address ?',
        valid: false,
        touched: false,
        validationRules: {
            minLength: 3,
            isRequired: false
        }
    },
    medicalRecord: {
        value: '',
        placeholder: 'What is the patient\'s Medical Record ?',
        valid: false,
        touched: false,
        validationRules: {
            minLength: 3,
            isRequired: false
        }
    }

          
     
}

 
        }
            this.fetchPatient = this.fetchPatient.bind(this);
this.handleChange = this.handleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
this.registerPatient = this.registerPatient.bind(this);
this.toogleMessage = this.toogleMessage.bind(this);
this.goToPatientHome = this.goToPatientHome.bind(this);
this.afterFetchPatient = this.afterFetchPatient.bind(this);
this.handleDelete = this.handleDelete.bind(this);
this.deletePatient = this.deletePatient.bind(this);
this.fetchCaregiver = this.fetchCaregiver.bind(this);
this.fetchTableDataCaregiver = this.fetchTableDataCaregiver.bind(this);
this.setCaregiver  = this.setCaregiver.bind(this);
this.registerToSetCaregiver = this.registerToSetCaregiver.bind(this);
this.handleRegisterToSetCaregiver = this.handleRegisterToSetCaregiver.bind(this);
this.reloadPage = this.reloadPage.bind(this);
this.toggleInsertMedicationPeriod = this.toggleInsertMedicationPeriod.bind(this);


this.fetchTableDataMediationPeriod = this.fetchTableDataMediationPeriod.bind(this);
this.reloadMedicationPeriods = this.reloadMedicationPeriods.bind(this);

   }
toggleInsertMedicationPeriod()
{

    this.state.insertMedicationPeriod = !this.state.insertMedicationPeriod;
    this.setState(this.state);
}
    fetchPatient() {
        let newParams = {"id" :  this.state.patientId};
        return PATIENT_API.getPatientById(newParams,(result, status, err) => {
            if (result !== null && status === 200) {
                  this.state.patient = result;
                 this.state.formControls.name.value = result.name;
                 this.state.formControls.username.value = result.username;
                 this.state.formControls.password.value = result.password;
                 this.state.formControls.birthDate.value = result.birthDate;
                 this.state.formControls.gender.value = result.gender;
                 this.state.formControls.address.value = result.address;
                 this.state.formControls.medicalRecord.value = result.medicalRecord;
                 this.state.isLoaded = true;

                  this.setState(this.state);
                 this.afterFetchPatient();
             } else {
                  this.state.errorStatus = status;
                 this.state.error = err;
                 this.setState(this.state);
                 
            }
         
        });
    }
    fetchCaregiver() {
        if(this.state.patient.caregiverId != null)
        {
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
    }


    fetchTableDataCaregiver() {
        return CAREGIVER_API.getCaregiver((result, status, err) => {

            if (result !== null && status === 200) {
                this.state.tableDataCaregiver = result;
               // console.log("USer resumt : " + result);

                this.state.isLoadedTableDataCaregiver = true;
                this.setState(this.state);
            } else {
                this.state.errorStatusCaregiverTable = status;
                this.state.errorCaregiverTable = err;
                this.setState(this.state);
            }
        });
    }


    fetchTableDataMediationPeriod() {
        let mediationPeriod  =
        {
            patientId : this.state.patientId
        }
        return MEDICATION_PERIOD_API.getMedicationPeriodByPatient(mediationPeriod,(result, status, err) => {

            if (result !== null && status === 200) {
                this.state.tableDataMedicationPeriod = result;
               // console.log("USer resumt : " + result);

                this.state.isLoadedTableDataMedicationPeriod = true;
                this.setState(this.state);
            } else {
                this.state.errorMedicationPeriodTable = status;
                this.state.errorStatusMedicationPeriodTable = err;
                this.setState(this.state);
            }
        });;
    }

reloadMedicationPeriods()
{
    this.state.isLoadedTableDataMedicationPeriod = false;
    this.toggleInsertMedicationPeriod();
    this.setState(this.state);

    this.fetchTableDataMediationPeriod();
}
reloadPage()
{
    this.state.isLoadedTableDataCaregiver = false;
    this.state.isLoadedCaregiver = false;
    this.state.isLoaded = false;
    this.setState(this.state);
    this.fetchPatient();
this.fetchTableDataCaregiver();
}

componentDidMount()
{ 
       this.state.isLoadedTableDataCaregiver = false;
    this.state.isLoadedCaregiver = false;
    this.state.isLoaded = false;
    this.setState(this.state);
    this.fetchPatient();
this.fetchTableDataCaregiver();
this.fetchTableDataMediationPeriod();
   


}

afterFetchPatient()
{
    let formIsValid = true;
    for (let formElementName in this.state.formControls) {
        this.state.formControls[formElementName].valid = validate(this.state.formControls[formElementName].value, this.state.formControls[formElementName].validationRules);
    
 
        this.setState(this.state);
        formIsValid = this.state.formControls[formElementName].valid && formIsValid;
    }

     let newState = this.state;
 newState.formIsValid = formIsValid;
this.setState(newState);
this.fetchCaregiver();
}


 


handleChange (event) {

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

   
    let newState = this.state;
newState.formControls = updatedControls;
newState.formIsValid = formIsValid;
this.setState(newState);

};






registerPatient(patient) {
    return PATIENT_API.postUpdatePatient(patient, (result, status, error) => {
        if (result !== null && (status === 200 || status === 201)) {
            console.log("Successfully updated patient with id: " + result);
             
            this.state.messsage ="Successfully updated patient with id: " + result;
            this.state.showMessage = true;
            this.setState(this.state);

         } else {
            let newState = this.state;
            newState.errorStatus = status;
            newState.error = error;
            this.setState(newState);
        }
    });
}

deletePatient(patientId) {
    return PATIENT_API.deletePatient(patientId, (result, status, error) => {
        if (result !== null && (status === 200 || status === 201)) {
            console.log("Successfully deleted patient with id: " + result);
             
            this.state.messsage ="Successfully deleted patient with id: " + result;
            this.state.showMessage = true;
            this.setState(this.state);

         } else {
            let newState = this.state;
            newState.errorStatus = status;
            newState.error = error;
            this.setState(newState);
        }
    });
}
toogleMessage()
{
    this.state.showMessage = false;
    this.setState(this.state);
}
goToPatientHome()
{
    this.state.redirectTo = "/doctorHome";
    this.state.redirect = true;
    this.setState(this.state);
}
handleSubmit() {
    let patient = {
        id : this.state.patientId,
        name: this.state.formControls.name.value,
        username: this.state.formControls.username.value,
        password: this.state.formControls.password.value,
        birthDate: this.state.formControls.birthDate.value,
        gender: this.state.formControls.gender.value,
        address: this.state.formControls.address.value,
        medicalRecord : this.state.formControls.medicalRecord.value

     };

    console.log(patient);
    this.registerPatient(patient);
}

handleDelete() {
    let patientId = this.state.patientId;

     this.deletePatient(patientId);
    
}



setCaregiver(caregiver)
{
    console.log(JSON.stringify(caregiver));
    this.state.caregiverToSet = caregiver;
    this.state.caregiverToSetLoaded = true;
    this.setState(this.state);
}
registerToSetCaregiver(patient) {
    console.log(JSON.stringify(patient));
     return PATIENT_API.setCaregiverPatient(patient, (result, status, error) => {
        if (result !== null && (status === 200 || status === 201)) {
            console.log("Successfully setted caregiver  " + result);
             
            this.state.messsage ="Successfully setted caregiver  " + result;
            this.state.showMessage = true;
            this.setState(this.state);

         } else {
            let newState = this.state;
            newState.errorStatus = status;
            newState.error = error;
            this.setState(newState);
        }
    });
}

handleRegisterToSetCaregiver()
{
 
    let patient = 
    {
        id: this.state.patient.id,
        caregiverId : this.state.caregiverToSet.id
    }
    this.registerToSetCaregiver (patient);
    this.state.caregiverToSetLoaded = null;
    this.state.caregiverToSet = null;
    this.setState(this.state);
    this.reloadPage();

}

    render() {
        console.log("REDER);");
        console.log(this.state.isLoaded);
        console.log(this.state.redirect);

        return (
            <div>

                
                 {this.state.redirect === false &&    <p> {this.state.patientId}</p>}
                { this.state.redirect === false && this.state.isLoaded === true  &&  <div><p> {JSON.stringify(this.state.patient)}</p> <Button color="primary"> {this.state.patientId}</Button></div> }
                 {this.state.redirect === true && <Redirect to = {this.state.redirectTo}/>}

                 <Button type={"submit"}   onClick={this.goToPatientHome}>  Go to Doctor Home Page </Button>


                 {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatus}
                                                            error={this.state.error} />}
                 



                 <FormGroup id='name'>
                    <Label for='nameField'> Name: </Label>
                    <Input name='name' id='nameField' placeholder={this.state.formControls.name.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.name.value}
                           touched={this.state.formControls.name.touched? 1 : 0}
                           valid={this.state.formControls.name.valid}
                           required
                    />
                    {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='username'>
                    <Label for='usernameField'> Username: </Label>
                    <Input name='username' id='usernameField' placeholder={this.state.formControls.username.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.username.value}
                           touched={this.state.formControls.username.touched? 1 : 0}
                           valid={this.state.formControls.username.valid}
                           required
                    />
                    {this.state.formControls.username.touched && !this.state.formControls.username.valid &&
                    <div className={"error-message"}> * Username must have at least 3 characters</div>}
                </FormGroup>

                <FormGroup id='password'>
                    <Label for='passwordField'> Password: </Label>
                    <Input name='password' id='passwordField' placeholder={this.state.formControls.password.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.password.value}
                           touched={this.state.formControls.password.touched? 1 : 0}
                           valid={this.state.formControls.password.valid}
                           required
                    />
                    {this.state.formControls.password.touched && !this.state.formControls.password.valid &&
                    <div className={"error-message"}> * Password must have at least 3 characters</div>}
                </FormGroup>

                <FormGroup id='birthDate'>
                    <Label for='birthDateField'> birthDate: </Label>
                    <Input name='birthDate' id='birthDateField' placeholder={this.state.formControls.birthDate.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.birthDate.value}
                           touched={this.state.formControls.birthDate.touched? 1 : 0}
                           valid={this.state.formControls.birthDate.valid}
                           required
                    />
                    {this.state.formControls.birthDate.touched && !this.state.formControls.birthDate.valid &&
                    <div className={"error-message"}> * Not valid format</div>}
                </FormGroup>


                <FormGroup id='gender'>
                    <Label for='genderField'> gender: </Label>
                    <Input name='gender' id='genderField' placeholder={this.state.formControls.gender.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.gender.value}
                           touched={this.state.formControls.gender.touched? 1 : 0}
                           valid={this.state.formControls.gender.valid}
                           required
                    />
                    {this.state.formControls.gender.touched && !this.state.formControls.gender.valid &&
                    <div className={"error-message"}> * gender must have at least 3 characters</div>}
                </FormGroup>

                <FormGroup id='address'>
                    <Label for='addressField'> address: </Label>
                    <Input name='address' id='addressField' placeholder={this.state.formControls.address.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.address.value}
                           touched={this.state.formControls.address.touched? 1 : 0}
                           valid={this.state.formControls.address.valid}
                           required
                    />
                    {this.state.formControls.address.touched && !this.state.formControls.address.valid &&
                    <div className={"error-message"}> * address must have at least 3 characters</div>}
                </FormGroup>


                <FormGroup id='medicalRecord'>
                    <Label for='medicalRecordField'> medicalRecord: </Label>
                    <Input name='medicalRecord' id='medicalRecordField' placeholder={this.state.formControls.medicalRecord.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.medicalRecord.value}
                           touched={this.state.formControls.medicalRecord.touched? 1 : 0}
                           valid={this.state.formControls.medicalRecord.valid}
                           required
                    />
                    {this.state.formControls.medicalRecord.touched && !this.state.formControls.medicalRecord.valid &&
                    <div className={"error-message"}> * medicalRecord must have at least 3 characters</div>}
                </FormGroup>




                <Row>
                        <Col sm={{size: '4', offset: 8}}>
                            <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}>  Update </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={{size: '4', offset: 1}}>
                            <Button type={"delete"}  onClick={this.handleDelete}>  Delete </Button>
                        </Col>
                    </Row>

                    
               {this.state.showMessage && 
                     <div>
                            <p>{this.state.messsage}</p>
                            <Button type={"submit"}   onClick={this.toogleMessage}>  OK </Button>
                            </div>
                        
                    
    }


                  {  <div><CardHeader>
                    <strong> Caregiever management </strong>
                </CardHeader>
                <Card>
                     { this.state.isLoadedCaregiver && <p>Caregiver : {this.state.caregiver.username} - {this.state.caregiver.name}</p>}
                     { !this.state.isLoadedCaregiver && <p> Unknown caregiver</p>}
                     {this.state.errorStatusCaregiver > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatusCaregiver}
                                                            error={this.state.errorCaregiver}
                                                        />   }

                      { this.state.caregiverToSetLoaded && <p>Caregiver to Set : {this.state.caregiverToSet.username} - {this.state.caregiverToSet.name}</p>}
                      { this.state.caregiverToSetLoaded &&  <Button type={"submit"}   onClick={this.handleRegisterToSetCaregiver}>  Set this Caregiver </Button>}



                     <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoadedTableDataCaregiver && <PatientCaregiverTable tableData = {this.state.tableDataCaregiver} patientSetCaregiver = {this.setCaregiver}/>}
                            {this.state.errorStatusCaregiverTable > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatusCaregiverTable}
                                                            error={this.state.errorCaregiverTable}
                                                        />   }
                        </Col>
                    </Row>




                </Card> 
                </div>
                }


{  <div><CardHeader>
                    <strong> Medication Period management </strong>
                </CardHeader>
                <Card>
                     

                    <Button type={"submit"}   onClick={this.toggleInsertMedicationPeriod}>  Add medication period </Button>



                     <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoadedTableDataMedicationPeriod && <MedicationPeriodTable tableData = {this.state.tableDataMedicationPeriod}  />}
                            {this.state.errorStatusMedicationPeriodTable > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatusMedicationPeriodTable}
                                                            error={this.state.errorMedicationPeriodTable}
                                                        />   }
                        </Col>
                    </Row>




                </Card> 
                </div>
                }




                            


    {this.state.showMessage && 

<Modal isOpen={this.state.showMessage} toggle={this.toogleMessage}
className={this.props.className} size="lg">
<ModalHeader toggle={this.toogleMessage}> {this.state.messsage} </ModalHeader>
 
</Modal>
    }

                    {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }


            
                    
                <Modal isOpen={this.state.insertMedicationPeriod} toggle={this.toggleInsertMedicationPeriod}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleInsertMedicationPeriod}> Add Medication Period: </ModalHeader>
                    <ModalBody>
                        <MedicationPeriodForm patientId = {this.state.patientId} reloadHandler={this.reloadMedicationPeriods}/>
                    </ModalBody>
                </Modal>



            </div>
        ) ;
    }
}

export default PatientPage;
