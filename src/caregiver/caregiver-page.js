import React from 'react';
import validate from "./validators/caregiver-validators";
import Button from "react-bootstrap/Button";
 import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import { Redirect } from 'react-router';
import * as DOCTOR_API from "./api/caregiver-api";
import {
    Card,
    CardHeader,
    Modal,
    ModalBody,
    ModalHeader
} from 'reactstrap';
 
class CaregiverPage extends React.Component {

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
formIsValid: false,
formControls: {
    
    
    name: {
        value: '',
        placeholder: 'What is the caregiver\'s name?',
        valid: false,
        touched: false,
        validationRules: {
            minLength: 3,
            isRequired: false
        }
    },
    username: {
        value: '',
        placeholder: 'What is the caregiver\'s Username?',
        valid: false,
        touched: false,
        validationRules: {
            minLength: 3,
            isRequired: true
        }
    },
    password: {
        value: '',
        placeholder: 'What is the caregiver\'s Password?',
        valid: false,
        touched: false,
        validationRules: {
            minLength: 3,
            isRequired: false
        }
    },
    birthDate: {
        value: '',
        placeholder: 'What is the caregiver\'s Birth Date?...YYYY-MM-DD',
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
        placeholder: 'What is the caregiver\'s Gender ?',
        valid: false,
        touched: false,
        validationRules: {
            minLength: 3,
            isRequired: false
        }
    },
    address: {
        value: '',
        placeholder: 'What is the caregiver\'s Address ?',
        valid: false,
        touched: false,
        validationRules: {
            minLength: 3,
            isRequired: false
        }
    }

          
     
}

 
        }
            this.fetchCaregiver = this.fetchCaregiver.bind(this);
this.handleChange = this.handleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
this.registerCaregiver = this.registerCaregiver.bind(this);
this.toogleMessage = this.toogleMessage.bind(this);
this.goToCaregiverHome = this.goToCaregiverHome.bind(this);
this.afterFetchCaregiver = this.afterFetchCaregiver.bind(this);
this.handleDelete = this.handleDelete.bind(this);
this.deleteCaregiver = this.deleteCaregiver.bind(this);
    }

    fetchCaregiver() {
        let newParams = {"id" :  this.state.caregiverId};
        return DOCTOR_API.getCaregiverById(newParams,(result, status, err) => {
            if (result !== null && status === 200) {
                  this.state.caregiver = result;
                 this.state.isLoaded = true;
                 this.state.formControls.name.value = result.name;
                 this.state.formControls.username.value = result.username;
                 this.state.formControls.password.value = result.password;
                 this.state.formControls.birthDate.value = result.birthDate;
                 this.state.formControls.gender.value = result.gender;
                 this.state.formControls.address.value = result.address;
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






registerCaregiver(caregiver) {
    return DOCTOR_API.postUpdateCaregiver(caregiver, (result, status, error) => {
        if (result !== null && (status === 200 || status === 201)) {
            console.log("Successfully updated caregiver with id: " + result);
             
            this.state.messsage ="Successfully updated caregiver with id: " + result;
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

deleteCaregiver(caregiverId) {
    return DOCTOR_API.deleteCaregiver(caregiverId, (result, status, error) => {
        if (result !== null && (status === 200 || status === 201)) {
            console.log("Successfully deleted caregiver with id: " + result);
             
            this.state.messsage ="Successfully deleted caregiver with id: " + result;
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
goToCaregiverHome()
{
    this.state.redirectTo = "/doctorHome";
    this.state.redirect = true;
    this.setState(this.state);
}
handleSubmit() {
    let caregiver = {
        id : this.state.caregiverId,
        name: this.state.formControls.name.value,
        username: this.state.formControls.username.value,
        password: this.state.formControls.password.value,
        birthDate: this.state.formControls.birthDate.value,
        gender: this.state.formControls.gender.value,
        address: this.state.formControls.address.value,

     };

    console.log(caregiver);
    this.registerCaregiver(caregiver);
}

handleDelete() {
    let caregiverId = this.state.caregiverId;

     this.deleteCaregiver(caregiverId);
    
}




    render() {
        console.log("REDER);");
        console.log(this.state.isLoaded);
        console.log(this.state.redirect);

        return (
            <div>

                
                 {this.state.redirect === false &&    <p> {this.state.caregiverId}</p>}
                { this.state.redirect === false && this.state.isLoaded === true  &&  <div><p> {JSON.stringify(this.state.caregiver)}</p> <Button color="primary"> {this.state.caregiverId}</Button></div> }
                 {this.state.redirect === true && <Redirect to = {this.state.redirectTo}/>}

                 <Button type={"submit"}   onClick={this.goToCaregiverHome}>  Go to Doctor Home Page </Button>
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
<ModalHeader toggle={this.toogleMessage}>  {this.state.messsage} </ModalHeader>
 
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

export default CaregiverPage;
