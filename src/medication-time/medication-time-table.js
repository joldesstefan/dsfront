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
import * as MEDICATION_TIME_API from './api/medication-time-api'
class MedicationTimeTable extends React.Component {

 
 
deleteMedicationTime(props)
{
     
        return MEDICATION_TIME_API.deleteMedicationTime(props.original.id, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully deleted mediation time with id: " + result);
                 
                this.state.messsage ="Successfully deleted medication time with id: " + result;
                this.state.showMessage = true;
                this.setState(this.state);
                this.reloadHandler();
    
             } else {
                let newState = this.state;
                newState.errorStatusMedicationPeriod = status;
                newState.errorMedicationPeriod = error;
                this.setState(newState);
            }
        });
      
}
    
  columns = [
    {
        Header: ' Time ',
        accessor: 'time',
    },
 
  
    
    {
        Header: 'MedicationTimePage',
        Cell : props => {
            return (
                <Button color="primary" onClick={() => this.deleteMedicationTime(props)}   > { "Delete " + new String ( props.original.time)}</Button>

            )
        }
    }
];

  filters = [
    {
        accessor: 'medicationName',
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
        this.deleteMedicationTime = this.deleteMedicationTime.bind(this)

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

export default MedicationTimeTable;