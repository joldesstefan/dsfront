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

class MedicationPeriodTable extends React.Component {

 
 
openMedicationPeriodPage(props)
{
     
}
    
  columns = [
    {
        Header: 'Medication name',
        accessor: 'medicationName',
    },
 

    {
        Header: 'Start date ',
        accessor: 'startDate',
       
    }  
    ,
    
    {
        Header: 'Stop date  ',
        accessor: 'stopDate',
       
    }  
    ,
    {
        Header: 'MedicationPeriodPage',
        Cell : props => {
            return (
                <Button color="primary" onClick={() => this.openMedicationPeriodPage(props)}   > { new String ( props.original.medicationName)+ "'s Page"}</Button>

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
        this.state = {
            tableData: this.props.tableData,
            redirect : false,
            redirectTo : "/"
        };
        this.openMedicationPeriodPage = this.openMedicationPeriodPage.bind(this)

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

export default MedicationPeriodTable;