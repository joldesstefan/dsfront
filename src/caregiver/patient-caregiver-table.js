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
        Header: 'Patient UserName',
        accessor: 'username',
    },
 

    {
        Header: 'Patient name',
        accessor: 'name',
       
    }  
    ,
    
    {
        Header: 'Patient birthdate',
        accessor: 'birthDate',
       
    }  ,
    
    {
        Header: 'Patient address',
        accessor: 'address',
       
    }  
    ,
    {
        Header: 'Patient gender',
        accessor: 'gender',
       
    }  ,
    
    {
        Header: 'Patient record',
        accessor: 'medicalRecord',
       
    }  
    
];

  filters = [
    {
        accessor: 'name',
    }
];


    constructor(props) {
        super(props);
        this.state = {
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

            {this.state.redirect === true && <Redirect to =  {this.state.redirectTo} />
             }
            </div>
        )
    }
}

export  default PatientCaregiverTable;