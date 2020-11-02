import React from 'react';
import validate from "./validators/medication-time-validators";
import Button from "react-bootstrap/Button";
import * as MEDICATION_TIME_API from "./api/medication-time-api";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import * as MEDICATION_API from "../medication/api/medication-api";
 import {
 
    Card,
    CardHeader,
     Modal,
    ModalBody,
    ModalHeader,
    
} from 'reactstrap';


class MedicationTimeForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {
            medicationPeriodId : props.medicationPeriodId,
            errorStatus: 0,
            error: null,
          
            formIsValid: false,

            formControls: {
                time: {
                    value: '',
                    placeholder: 'What is the time?...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 8,
                        isRequired: true,
                        timeValidator : true
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



componentDidMount()
{
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

    registerMedicationTime(mP) {
        console.log(JSON.stringify(mP));
        return MEDICATION_TIME_API.postMedicationTime(mP, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted medication time with id: " + result);
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
        let medicationTime = {
            medicationPeriodId: this.state.medicationPeriodId,
            time: this.state.formControls.time.value,
              
        };

        console.log(medicationTime);
        this.registerMedicationTime(medicationTime);
    }

    render() {
        return (
            <div>

                <FormGroup id='time'>
                    <Label for='timeField'> time: </Label>
                    <Input name='time' id='timeField' placeholder={this.state.formControls.time.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.time.value}
                           touched={this.state.formControls.time.touched? 1 : 0}
                           valid={this.state.formControls.time.valid}
                           required
                    />
                    {this.state.formControls.time.touched && !this.state.formControls.time.valid &&
                    <div className={"error-message row"}> * time format not valid </div>}
                </FormGroup>

                
 
                    <Row>
                        <Col sm={{size: '4', offset: 8}}>
                            <Button type={"submit"} disabled={(!this.state.formIsValid) } onClick={this.handleSubmit}>  Submit </Button>
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

export default MedicationTimeForm;
