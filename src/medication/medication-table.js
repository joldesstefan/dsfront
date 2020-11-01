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

class UserTable extends React.Component {

 
openMedicationPage(props)
{
    console.log("Medication page", props.original);
   let  newState = this.state;
   let  id= props.original.id;
      newState.redirectTo = '/medicationPage/'+id;
    newState.redirect = true;
    this.setState(newState);
}
 
 
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
        Header: 'Medication Page',
        Cell : props => {
            return (
                <Button color="primary" onClick={() => this.openMedicationPage(props)}   > { new String ( props.original.name)+ "'s Page"}</Button>

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
            tableData: this.props.tableData,
            redirect : false,
            redirectTo : "/"
        };
          this.openMedicationPage = this.openMedicationPage.bind(this);
 
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

export default UserTable;