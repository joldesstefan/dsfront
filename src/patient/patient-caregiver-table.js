import React from "react";
import Table from "../commons/tables/table";

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
import { Redirect } from "react-router";

class PatientCaregiverTable extends React.Component {

 

 
    
  columns = [
    {
        Header: ' UserName',
        accessor: 'username',
    },
 

    {
        Header: ' Name',
        accessor: 'name',
       
    }  ,
    {
        Header: ' Gender ',
        accessor: 'gender',
       
    }  ,
    {
        Header: '  Address ',
        accessor: 'address',
       
    }  ,
    {
        Header: 'Birth Date',
        accessor: 'birthDate',
       
    }   
    ,
    {
        Header: 'Press To Set As Caregiver',
        Cell : props => {
            return (
                <Button color="primary" onClick={() => this.state.patientSetCaregiver(props.original)}   > { new String ( props.original.username)}</Button>

            )
        }
    }
];

  filters = [
    {
        accessor: 'gender',
    }
];


    constructor(props) {
        super(props);
        this.state = {
            patientSetCaregiver : props.patientSetCaregiver,
            tableData: this.props.tableData,
            redirect : false,
            redirectTo : "/"
        };
         

        console.log(this.state.tableData);
    }

    render() {
        return (
            <div>
            { this.state.redirect === false  &&<Table 
                data={this.state.tableData}
                columns={this.columns}
                search={this.filters}
                pageSize={10}
            />}

            
            </div>
        )
    }
}

export default PatientCaregiverTable;