import React from 'react';
import validate from "./validators/medication-validators";
import Button from "react-bootstrap/Button";
 import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import { Redirect } from 'react-router';
import * as DOCTOR_API from "./api/medication-api";
import {
    Card,
    CardHeader,
    Modal,
    ModalBody,
    ModalHeader
} from 'reactstrap';
 
class MedicationPage extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
redirect : false,
redirectTo : "/",
medicationId : props.match.params.id,
medication : null,
isLoaded : false,
errorStatus : 0,
error : "",
showMessage : false,
messsage : "",
formIsValid: false,
formControls: {
    
    
        name: {
            value: '',
            placeholder: 'What is the medication\'s name?',
            valid: false,
            touched: false,
            validationRules: {
                minLength: 3,
                isRequired: false
            }
        },
        dosage: {
            value: '',
            placeholder: 'What is the medication\'s dosage?',
            valid: false,
            touched: false,
            validationRules: {
                minLength: 3,
                isRequired: true
            }
        },
        sideEffects: {
            value: '',
            placeholder: 'What is the medication\'s sideEffects?',
            valid: false,
            touched: false,
            validationRules: {
                minLength: 3,
                isRequired: false
            }
        }

          
     
}

 
        }
            this.fetchMedication = this.fetchMedication.bind(this);
this.handleChange = this.handleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
this.registerMedication = this.registerMedication.bind(this);
this.toogleMessage = this.toogleMessage.bind(this);
this.goToMedicationHome = this.goToMedicationHome.bind(this);
this.afterFetchMedication = this.afterFetchMedication.bind(this);
this.handleDelete = this.handleDelete.bind(this);
this.deleteMedication = this.deleteMedication.bind(this);
    }

    fetchMedication() {
        let newParams = {"id" :  this.state.medicationId};
        return DOCTOR_API.getMedicationById(newParams,(result, status, err) => {
            if (result !== null && status === 200) {
                  this.state.medication = result;
                 this.state.isLoaded = true;
                 this.state.formControls.name.value = result.name;
                 this.state.formControls.dosage.value = result.dosage;
                 this.state.formControls.sideEffects.value = result.sideEffects;
                  this.setState(this.state);
                 this.afterFetchMedication();
             } else {
                  this.state.errorStatus = status;
                 this.state.error = err;
                 this.setState(this.state);
                 
            }
         
        });
    }
componentDidMount()
{
    this.fetchMedication();

   


}

afterFetchMedication()
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






registerMedication(medication) {
    return DOCTOR_API.postUpdateMedication(medication, (result, status, error) => {
        if (result !== null && (status === 200 || status === 201)) {
            console.log("Successfully updated medication with id: " + result);
             
            this.state.messsage ="Successfully updated medication with id: " + result;
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

deleteMedication(medicationId) {
    return DOCTOR_API.deleteMedication(medicationId, (result, status, error) => {
        if (result !== null && (status === 200 || status === 201)) {
            console.log("Successfully deleted medication with id: " + result);
             
            this.state.messsage ="Successfully deleted medication with id: " + result;
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
goToMedicationHome()
{
    this.state.redirectTo = "/doctorHome";
    this.state.redirect = true;
    this.setState(this.state);
}
handleSubmit() {
    let medication = {
        id: this.state.medication.id,
        name: this.state.formControls.name.value,
        dosage: this.state.formControls.dosage.value,
        sideEffects: this.state.formControls.sideEffects.value,
     };

    console.log(medication);
    this.registerMedication(medication);
}

handleDelete() {
    let medicationId = this.state.medicationId;

     this.deleteMedication(medicationId);
    
}




    render() {
        console.log("REDER);");
        console.log(this.state.isLoaded);
        console.log(this.state.redirect);

        return (
            <div>

                
                 {this.state.redirect === false &&    <p> {this.state.medicationId}</p>}
                { this.state.redirect === false && this.state.isLoaded === true  &&  <div><p> {JSON.stringify(this.state.medication)}</p> <Button color="primary"> {this.state.medicationId}</Button></div> }
                 {this.state.redirect === true && <Redirect to = {this.state.redirectTo}/>}

                 <Button type={"submit"}   onClick={this.goToMedicationHome}>  Go to Doctor Home Page </Button>

                < FormGroup id='name'>
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


                <FormGroup id='dosage'>
                    <Label for='dosageField'> Dosage: </Label>
                    <Input name='dosage' id='dosageField' placeholder={this.state.formControls.dosage.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.dosage.value}
                           touched={this.state.formControls.dosage.touched? 1 : 0}
                           valid={this.state.formControls.dosage.valid}
                           required
                    />
                    {this.state.formControls.dosage.touched && !this.state.formControls.dosage.valid &&
                    <div className={"error-message"}> * Username must have at least 3 characters</div>}
                </FormGroup>

                <FormGroup id='sideEffects'>
                    <Label for='sideEffectsField'> SideEffects: </Label>
                    <Input name='sideEffects' id='sideEffectsField' placeholder={this.state.formControls.sideEffects.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.sideEffects.value}
                           touched={this.state.formControls.sideEffects.touched? 1 : 0}
                           valid={this.state.formControls.sideEffects.valid}
                           required
                    />
                </FormGroup>

                <Row>
                        <Col sm={{size: '4', offset: 8}}>
                            <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}>  Update </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={{size: '4', offset: 1}}>
                            <Button type={"delete"} disabled={!this.state.formIsValid} onClick={this.handleDelete}>  Delete </Button>
                        </Col>
                    </Row>

                    
               {this.state.showMessage && 
                     <div>
                            <p>{this.state.messsage}</p>
                            <Button type={"submit"}   onClick={this.toogleMessage}>  OK </Button>
                            </div>
                        
                    
    }

    {this.state.showMessage && 

<Modal isOpen={this.state.showMessage} toggle={this.toogleMessage}
className={this.props.className} size="lg">
<ModalHeader toggle={this.toogleMessage}> Medication Updated </ModalHeader>
 
</Modal>
    }

                    {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }


            
                    
            </div>
        ) ;
    }
}

export default MedicationPage;
