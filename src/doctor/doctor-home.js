import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';
 
//import * as DOCTOR_API from "./api/doctor-api"
//import * as PATIENT_API from "./api/patient-api"
//import * as CAREGIVER_API from "./api/caregiver-api"
import * as USER_API from "../userapi/user-api"
import * as MEDICATION_API from "../medication/api/medication-api"

import UserTable from './user-table'
import DoctorForm from './doctor-form'
import CaregiverForm from '../caregiver/caregiver-form'
import PatientForm from '../patient/pacient-form'

import MedicationTable from '../medication/medication-table'
import MedicationForm from '../medication/medication-form'



class DoctorHome extends React.Component {

    constructor(props) {
        super();
        super(props);
      
        this.state = {
            insertDoctor: false,
            insertPatient: false,
            insertCaregiver: false,
            insertMedication: false,

            collapseForm: false,
            tableData: [],
            tableDataMedication : [],
            isLoaded: false,
            isLoadedMedication: false,

            errorStatus: 0,
            error: null,
            
            errorStatusMedication: 0,
            errorMedication: null,
             
        };

        this.toggleInsertDoctorForm = this.toggleInsertDoctorForm.bind(this);
        this.toggleInsertCaregiverForm = this.toggleInsertCaregiverForm.bind(this);
        this.toggleInsertPatientForm = this.toggleInsertPatientForm.bind(this);
        this.toggleInsertMedicationForm = this.toggleInsertMedicationForm.bind(this);



        this.reloadDoctor = this.reloadDoctor.bind(this);
        this.reloadCaregiver = this.reloadCaregiver.bind(this);
        this.reloadPatient = this.reloadPatient.bind(this);
        this.reloadMedication = this.reloadMedication.bind(this);


        this.fetchUsers = this.fetchUsers.bind(this);
        this.fetchMedication = this.fetchMedication.bind(this);




    }

    componentDidMount() {
        this.fetchUsers();
        this.fetchMedication();
    }

    fetchUsers() {
        return USER_API.getUsers((result, status, err) => {

            if (result !== null && status === 200) {
                this.state.tableData = result;
               // console.log("USer resumt : " + result);

                this.state.isLoaded = true;
                this.setState(this.state);
            } else {
                this.state.errorStatus = status;
                this.state.error = err;
                this.setState(this.state);
            }
        });
    }
    fetchMedication() {
        return MEDICATION_API.getMedication((result, status, err) => {

            if (result !== null && status === 200) {
                this.state.tableDataMedication = result;
                this.state.isLoadedMedication = true;
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

    toggleInsertDoctorForm() {
         this.state.insertDoctor = !this.state.insertDoctor;
        this.setState(this.state);
    }
    toggleInsertMedicationForm() {
        this.state.insertMedication = !this.state.insertMedication;
       this.setState(this.state);
   }
   toggleInsertCaregiverForm() {
    this.state.insertCaregiver = !this.state.insertCaregiver;
   this.setState(this.state);
}
toggleInsertPatientForm() {
    this.state.insertPatient = !this.state.insertPatient;
   this.setState(this.state);
}


    reloadDoctor() {
        this.state.isLoaded = false;
        this.setState(this.state);
        this.toggleInsertDoctorForm();
        this.fetchUsers();
    }
    reloadCaregiver() {
        this.state.isLoaded = false;
        this.setState(this.state);
        this.toggleInsertCaregiverForm();
        this.fetchUsers();
    }
    reloadPatient() {
        this.state.isLoaded = false;
        this.setState(this.state);
        this.toggleInsertPatientForm();
        this.fetchUsers();
    }
    reloadMedication() {
        this.state.isLoadedMedication = false;
        this.setState(this.state);
        this.toggleInsertMedicationForm();
        this.fetchMedication();
    }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong> Users Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                        <Button color = "primary"  onClick={this.toggleInsertDoctorForm}>  Add doctor </Button>
                        <Button color = "primary"   onClick={this.toggleInsertPatientForm}>  Add patient </Button>
                        <Button color = "primary"   onClick={this.toggleInsertCaregiverForm}>  Add caregiver </Button>

                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <UserTable tableData = {this.state.tableData}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatus}
                                                            error={this.state.error}
                                                        />   }
                        </Col>
                    </Row>
                </Card>



                <CardHeader>
                    <strong> Medication Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                        <Button color = "primary"  onClick={this.toggleInsertMedicationForm}>  Add medication </Button>
              

                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoadedMedication && <MedicationTable tableData = {this.state.tableDataMedication}/>}
                            {this.state.errorStatusMedication > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatusMedication}
                                                            error={this.state.errorMedication}
                                                        />   }
                        </Col>
                    </Row>
                </Card>




                <Modal isOpen={this.state.insertDoctor} toggle={this.toggleInsertDoctorForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleInsertDoctorForm}> Add Doctor: </ModalHeader>
                    <ModalBody>
                        <DoctorForm reloadHandler={this.reloadDoctor}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.insertCaregiver} toggle={this.toggleInsertCaregiverForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleInsertCaregiverForm}> Add Caregiver: </ModalHeader>
                    <ModalBody>
                        <CaregiverForm reloadHandler={this.reloadCaregiver}/>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.insertPatient} toggle={this.toggleInsertPatientForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleInsertPatientForm}> Add Pacient: </ModalHeader>
                    <ModalBody>
                        <PatientForm reloadHandler={this.reloadPatient}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.insertMedication} toggle={this.toggleInsertMedicationForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleInsertMedicationForm}> Add Medication: </ModalHeader>
                    <ModalBody>
                        <MedicationForm reloadHandler={this.reloadMedication}/>
                    </ModalBody>
                </Modal>

            </div>
        )

    }
}


export default DoctorHome;
