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

class MedicationPeriodMedicationTable extends React.Component {

 
 
 
  columns = [
    {
        Header: 'Medication Name',
        accessor: 'name',
    },
    {
        Header: 'Medication Dossage',
        accessor: 'dosage',
       
    }  
    ,
    {
        Header: 'Press to set',
        Cell : props => {
            return (
                <Button color="primary" onClick={() => this.state.setMedication(props.original)}   > { new String (props.original.name)}</Button>

            )
        }
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
            setMedication : this.props.setMedication,
            tableData: this.props.tableData,
            redirect : false,
            redirectTo : "/"
        };
  
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

export default MedicationPeriodMedicationTable;