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
import * as MEDICATION_TIME_API from '../medication-time/api/medication-time-api'
class MedicationTimePatientTable extends React.Component {

 
  
  columns = [
    {
        Header: ' Time ',
        accessor: 'time',
    },
 
  
     
];

  filters = [
    {
        accessor: 'time',
    }
];


    constructor(props) {

        super(props);
        this.reloadHandler =props.reloadHandler;

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

           
            </div>
        )
    }
}

export default MedicationTimePatientTable;