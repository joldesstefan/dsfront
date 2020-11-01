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

 
openDoctorPage(props)
{
    console.log("Doctor page", props.original);
   let  newState = this.state;
   let  id= props.original.id;
      newState.redirectTo = '/doctorPage/'+id;
    newState.redirect = true;
    this.setState(newState);
}
 
openPatientPage(props)
{
    console.log("Patient page", props.original);
   let  newState = this.state;
   let  id= props.original.id;
      newState.redirectTo = '/patientPage/'+id;
    newState.redirect = true;
    this.setState(newState);
}
 
openCaregiverPage(props)
{
    console.log("Caregiver page", props.original);
   let  newState = this.state;
   let  id= props.original.id;
      newState.redirectTo = '/caregiverPage/'+id;
    newState.redirect = true;
    this.setState(newState);
}
openUserPage(props)
{
    if(props.original.type === 1)
    {
this.openDoctorPage(props);
    }
    if(props.original.type === 2)
    {
this.openPatientPage(props);
    }
    if(props.original.type === 3)
    {
this.openCaregiverPage(props);
    }
}
    
  columns = [
    {
        Header: 'User UserName',
        accessor: 'username',
    },
 

    {
        Header: 'UserType',
        accessor: 'typepretty',
       
    }  
    ,
    {
        Header: 'UserPage',
        Cell : props => {
            return (
                <Button color="primary" onClick={() => this.openUserPage(props)}   > { new String ( props.original.username)+ "'s Page"}</Button>

            )
        }
    }
];

  filters = [
    {
        accessor: 'typepretty',
    }
];


    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData,
            redirect : false,
            redirectTo : "/"
        };
        this.openUserPage = this.openUserPage.bind(this);
        this.openPatientPage = this.openPatientPage.bind(this);
        this.openDoctorPage = this.openDoctorPage.bind(this);
        this.openCaregiverPage = this.openCaregiverPage.bind(this);

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

export default UserTable;