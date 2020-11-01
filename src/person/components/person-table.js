import React from "react";
import Table from "../../commons/tables/table";

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

class PersonTable extends React.Component {

 
openPersonPage(props)
{
    console.log("Person page", props.original);
   let  newState = this.state;
   let  id= props.original.id;
      newState.redirectTo = '/person/'+id;
    newState.redirect = true;
    this.setState(newState);
}
    
  columns = [
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Age',
        accessor: 'age',
       
    }  
    ,
    {
        Header: 'PersonPage',
        Cell : props => {
            return (
                <Button color="primary" onClick={() => this.openPersonPage(props)}   > { new String ( props.original.name)+ "'s Page"}</Button>

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
        this.openPersonPage = this.openPersonPage.bind(this);
        console.log(this.state.tableData);
    }

    render() {
        return (
            <div>
            { this.state.redirect === false  &&<Table 
                data={this.state.tableData}
                columns={this.columns}
                search={this.filters}
                pageSize={5}
            />}

            {this.state.redirect === true && <Redirect to =  {this.state.redirectTo} />
             }
            </div>
        )
    }
}

export default PersonTable;