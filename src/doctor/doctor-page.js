import React from 'react';
import validate from "./validators/doctor-validators";
import Button from "react-bootstrap/Button";
 import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import { Redirect } from 'react-router';
import * as DOCTOR_API from "./api/doctor-api";
import {
    Card,
    CardHeader,
    Modal,
    ModalBody,
    ModalHeader
} from 'reactstrap';
 
class DoctorPage extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
redirect : false,
redirectTo : "/",
doctorId : props.match.params.id,
doctor : null,
isLoaded : false,
errorStatus : 0,
error : "",
showMessage : false,
messsage : "",
formIsValid: false,
formControls: {
    
    
        name: {
            value: '',
            placeholder: 'What is the doctor\'s name?',
            valid: false,
            touched: false,
            validationRules: {
                minLength: 3,
                isRequired: false
            }
        },
        username: {
            value: '',
            placeholder: 'What is the doctor\'s username?',
            valid: false,
            touched: false,
            validationRules: {
                minLength: 3,
                isRequired: true
            }
        },
        password: {
            value: '',
            placeholder: 'What is the doctor\'s Password?',
            valid: false,
            touched: false,
            validationRules: {
                minLength: 3,
                isRequired: false
            }
        }

          
     
}

 
        }
            this.fetchDoctor = this.fetchDoctor.bind(this);
this.handleChange = this.handleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
this.registerDoctor = this.registerDoctor.bind(this);
this.toogleMessage = this.toogleMessage.bind(this);
this.goToDoctorHome = this.goToDoctorHome.bind(this);
this.afterFetchDoctor = this.afterFetchDoctor.bind(this);
this.handleDelete = this.handleDelete.bind(this);
this.deleteDoctor = this.deleteDoctor.bind(this);
    }

    fetchDoctor() {
        let newParams = {"id" :  this.state.doctorId};
        return DOCTOR_API.getDoctorById(newParams,(result, status, err) => {
            if (result !== null && status === 200) {
                  this.state.doctor = result;
                 this.state.isLoaded = true;
                 this.state.formControls.name.value = result.name;
                 this.state.formControls.username.value = result.username;
                 this.state.formControls.password.value = result.password;
                 console.log("NEEEEEEEEEEWWWWW", JSON.stringify(this.state));
                 this.setState(this.state);
                 this.afterFetchDoctor();
             } else {
                  this.state.errorStatus = status;
                 this.state.error = err;
                 this.setState(this.state);
                 
            }
         
        });
    }
componentDidMount()
{
    this.fetchDoctor();

   


}

afterFetchDoctor()
{
    let formIsValid = true;
    for (let formElementName in this.state.formControls) {
        this.state.formControls[formElementName].valid = validate(this.state.formControls[formElementName].value, this.state.formControls[formElementName].validationRules);
    
        console.log("Elem: "+ JSON.stringify(this.state.formControls[formElementName]));

        this.setState(this.state);
        formIsValid = this.state.formControls[formElementName].valid && formIsValid;
    }

   console.log("VVVVVALAVAVALAL: "+formIsValid);
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
    console.log("ValidaTION Rules : "+updatedFormElement.validationRules);

    let formIsValid = true;
    for (let updatedFormElementName in updatedControls) {
        formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
    }

   
    let newState = this.state;
newState.formControls = updatedControls;
newState.formIsValid = formIsValid;
this.setState(newState);

};






registerDoctor(doctor) {
    return DOCTOR_API.postUpdateDoctor(doctor, (result, status, error) => {
        if (result !== null && (status === 200 || status === 201)) {
            console.log("Successfully updated doctor with id: " + result);
             
            this.state.messsage ="Successfully updated doctor with id: " + result;
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

deleteDoctor(doctorId) {
    return DOCTOR_API.deleteDoctor(doctorId, (result, status, error) => {
        if (result !== null && (status === 200 || status === 201)) {
            console.log("Successfully deleted doctor with id: " + result);
             
            this.state.messsage ="Successfully deleted doctor with id: " + result;
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
goToDoctorHome()
{
    this.state.redirectTo = "/doctorHome";
    this.state.redirect = true;
    this.setState(this.state);
}
handleSubmit() {
    let doctor = {
        id: this.state.doctor.id,
        name: this.state.formControls.name.value,
        username: this.state.formControls.username.value,
        password: this.state.formControls.password.value,
     };

    console.log(doctor);
    this.registerDoctor(doctor);
}

handleDelete() {
    let doctorId = this.state.doctorId;

     this.deleteDoctor(doctorId);
    
}




    render() {
        console.log("REDER);");
        console.log(this.state.isLoaded);
        console.log(this.state.redirect);

        return (
            <div>

                
                 {this.state.redirect === false &&    <p> {this.state.doctorId}</p>}
                { this.state.redirect === false && this.state.isLoaded === true  &&  <div><p> {JSON.stringify(this.state.doctor)}</p> <Button color="primary"> {this.state.doctorId}</Button></div> }
                 {this.state.redirect === true && <Redirect to = {this.state.redirectTo}/>}

                 <Button type={"submit"}   onClick={this.goToDoctorHome}>  Go to Doctor Home Page </Button>

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

export default DoctorPage;
