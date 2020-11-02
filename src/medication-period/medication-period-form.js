import React from 'react';
import validate from "./validators/medication-period-validators";
import Button from "react-bootstrap/Button";
import * as MEDICATION_PERIOD_API from "./api/medication-period-api";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import * as MEDICATION_API from "../medication/api/medication-api";
import MedicationPeriodMedicationTable from './medication-period-medication-table';
import {
 
    Card,
    CardHeader,
     Modal,
    ModalBody,
    ModalHeader,
    
} from 'reactstrap';


class MedicationPeriodForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {
            patientId : this.props.patientId,
            errorStatus: 0,
            error: null,
            errorStatusMedication: 0,
            errorMedication: null,

            tableData : [],
            isLoaded: false , 

            isLoadedMedicationToSet: false,
            medicationToSet : null,
            formIsValid: false,

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
        this.setMedication = this.setMedication.bind(this);
    }

   toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
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
    this.fetchMedication();
}
fetchMedication() {
    return MEDICATION_API.getMedication((result, status, err) => {

        if (result !== null && status === 200) {
            this.state.tableData = result;
            this.state.isLoaded = true;
            this.setState(this.state);
           // console.log("MEdication:: " + result);
          // console.log("Medication resumt : " + JSON.stringify(result)); zicea ceva a nu vedea ca primea object si nii in console nu il afica ca obiect numai [Object object]
        } else {
            this.state.errorStatusMedication = status;
            this.state.errorMedication = err;
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
        return MEDICATION_PERIOD_API.postMedicationPeriod(mP, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted medication period with id: " + result);
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
        let medicationPeriod = {
            patientId: this.state.patientId,
            startDate: this.state.formControls.startDate.value,
            stopDate: this.state.formControls.stopDate.value,
            medicationId: this.state.medicationToSet.id
            
        };

        console.log(medicationPeriod);
        this.registerMedicationPeriod(medicationPeriod);
    }

    render() {
        return (
            <div>

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
 
                    <Row>
                        <Col sm={{size: '4', offset: 8}}>
                            <Button type={"submit"} disabled={(!this.state.formIsValid) || (!this.state.isLoadedMedicationToSet)} onClick={this.handleSubmit}>  Submit </Button>
                        </Col>
                    </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }


                
<CardHeader>
                    <strong> Select Medication  </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
 {this.state.isLoadedMedicationToSet && <p>{JSON.stringify(this.state.medicationToSet)}</p>}              

                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <MedicationPeriodMedicationTable setMedication = {this.setMedication} tableData = {this.state.tableData}/>}
                             
                        </Col>
                    </Row>
                    {
                    this.state.errorStatusMedication > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatusMedication} error={this.state.errorMedication}/>
                }
                </Card>


            </div>
        ) ;
    }
}

export default MedicationPeriodForm;
