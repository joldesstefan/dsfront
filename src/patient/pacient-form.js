import React from 'react';
import validate from "./validators/patient-validators";
import Button from "react-bootstrap/Button";
import * as DOCTOR_API from "./api/patient-api";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';



class PatientForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

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
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

   toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
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

    registerPatient(patient) {
        return DOCTOR_API.postPatient(patient, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted patient with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    handleSubmit() {
        let patient = {
            name: this.state.formControls.name.value,
            username: this.state.formControls.username.value,
            password: this.state.formControls.password.value,
            birthDate: this.state.formControls.birthDate.value,
            gender: this.state.formControls.gender.value,
            address: this.state.formControls.address.value,
            medicalRecord: this.state.formControls.medicalRecord.value,

         };

        console.log(patient);
        this.registerPatient(patient);
    }

    render() {
        return (
            <div>

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
                            <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}>  Submit </Button>
                        </Col>
                    </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        ) ;
    }
}

export default PatientForm;
