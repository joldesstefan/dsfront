import React from 'react';
import validate from "./validators/person-validators";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/person-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import { Redirect } from 'react-router';
import * as API_USER from "../api/person-api";
import {
    Card,
    CardHeader,
    Modal,
    ModalBody,
    ModalHeader
} from 'reactstrap';
 
class PersonPage extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
redirect : false,
redirectTo : "/",
personId : props.match.params.id,
person : null,
isLoaded : false,
errorStatus : 0,
error : "",
showMessage : false,
messsage : "",
formIsValid: false,
formControls: {
    name: {
        value: '',
        placeholder: 'Person Name:',
        valid: true,
        touched: false,
        validationRules: {
            minLength: 3,
            isRequired: true
        }
    },
    email: {
        value: '',
        placeholder: 'Email: ',
        valid: true,
        touched: false,
        validationRules: {
            emailValidator: true
        }
    },
    age: {
        value: '',
        placeholder: 'Age: ',
        valid: true,
        touched: false,
    },
    address: {
        value: '',
        placeholder: 'Address: ',
        valid: true,
        touched: false,
    },
}

 
        }
            this.fetchPersons = this.fetchPersons.bind(this);
this.handleChange = this.handleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
this.registerPerson = this.registerPerson.bind(this);
this.toogleMessage = this.toogleMessage.bind(this);
this.goToPerson = this.goToPerson.bind(this);
    }

    fetchPersons() {
        let newParams = {"id" :  this.state.personId};
        return API_USERS.getPersonById(newParams,(result, status, err) => {
            if (result !== null && status === 200) {
                  let newState = this.state;
                 newState.person = result;
                 newState.isLoaded = true;
                 newState.formControls.name.value = result.name;
                 newState.formControls.age.value = result.age;
                 newState.formControls.address.value = result.address;
                 this.setState(newState);
                 console.log ("LOOOADDDEEDDEE");
            } else {
                 let newState = this.state;
                 newState.errorStatus = status;
                 newState.error = err;
                 this.setState(newState);
                 
            }
         
        });
    }
componentDidMount()
{
    this.fetchPersons();

    let formIsValid = true;
    for (let formElementName in this.state.formControls) {
        formIsValid = this.state.formControls[formElementName].valid && formIsValid;
    }

   
    let newState = this.state;
 newState.formIsValid = formIsValid;
this.setState(newState);


}



handleChange (event) {

    const name = event.target.name;
    const value = event.target.value;

    const updatedControls = this.state.formControls;

    const updatedFormElement = updatedControls[name];

    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
    updatedControls[name] = updatedFormElement;
    console.log("ValidaTION Rules : "+updatedFormElement.validationRules);

    let formIsValid = true;
    for (let updatedFormElementName in updatedControls) {
        formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
    }

   
    let newState = this.state;
newState.formControls = updatedControls;
newState.formIsValid = formIsValid;
this.setState(newState);

};






registerPerson(person) {
    return API_USERS.postUpdatePerson(person, (result, status, error) => {
        if (result !== null && (status === 200 || status === 201)) {
            console.log("Successfully inserted person with id: " + result);
             
            this.state.messsage = "Successfully inserted person with id: " + result;
            this.state.showMessage = true;
            this.setState(this.state);

         } else {
            let newState = this.state;
            newState.errorStatus = status;
            newState.error = error;
            this.setState(newState);
        }
    });
}
toogleMessage()
{
    this.state.showMessage = false;
    this.setState(this.state);
}
goToPerson()
{
    this.state.redirectTo = "/person";
    this.state.redirect = true;
    this.setState(this.state);
}
handleSubmit() {
    let person = {
        id: this.state.person.id,
        name: this.state.formControls.name.value,
        email: this.state.formControls.email.value,
        age: this.state.formControls.age.value,
        address: this.state.formControls.address.value
    };

    console.log(person);
    this.registerPerson(person);
}




    render() {
        console.log("REDER);");
        console.log(this.state.isLoaded);
        console.log(this.state.redirect);

        return (
            <div>

                
                 {this.state.redirect === false &&    <p> {this.state.persionId}</p>}
                { this.state.redirect === false && this.state.isLoaded === true  &&  <div><p> {JSON.stringify(this.state.person)}</p> <Button color="primary"> {this.state.personId}</Button></div> }
                 {this.state.redirect === true && <Redirect to = {this.state.redirectTo}/>}

                 <Button type={"submit"}   onClick={this.goToPerson}>  Go to Person List Page </Button>

                < FormGroup id='name'>
                    <Label for='nameField'> Name: </Label>
                    <Input name='name' id='nameField' placeholder={this.state.formControls.name.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.name.value}
                           touched={this.state.formControls.name.touched? 1 : 0}
                           valid={this.state.formControls.name.valid}
                           required
                    />
                    {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='email'>
                    <Label for='emailField'> Email: </Label>
                    <Input name='email' id='emailField' placeholder={this.state.formControls.email.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.email.value}
                           touched={this.state.formControls.email.touched? 1 : 0}
                           valid={this.state.formControls.email.valid}
                           required
                    />
                    {this.state.formControls.email.touched && !this.state.formControls.email.valid &&
                    <div className={"error-message"}> * Email must have a valid format</div>}
                </FormGroup>

                <FormGroup id='address'>
                    <Label for='addressField'> Address: </Label>
                    <Input name='address' id='addressField' placeholder={this.state.formControls.address.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.address.value}
                           touched={this.state.formControls.address.touched? 1 : 0}
                           valid={this.state.formControls.address.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='age'>
                    <Label for='ageField'> Age: </Label>
                    <Input name='age' id='ageField' placeholder={this.state.formControls.age.placeholder}
                           min={0} max={100} type="number"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.age.value}
                           touched={this.state.formControls.age.touched? 1 : 0}
                           valid={this.state.formControls.age.valid}
                           required
                    />
                </FormGroup>

                <Row>
                        <Col sm={{size: '4', offset: 8}}>
                            <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}>  Update </Button>
                        </Col>
                    </Row>

                    
               {this.state.showMessage && 
                     <div>
                            <p>{this.state.messsage}</p>
                            <Button type={"submit"}   onClick={this.toogleMessage}>  OK </Button>
                            </div>
                        
                    
    }

    {this.state.showMessage && 

<Modal isOpen={this.state.showMessage} toggle={this.toogleMessage}
className={this.props.className} size="lg">
<ModalHeader toggle={this.toogleMessage}> Person Updated </ModalHeader>
 
</Modal>
    }

                    {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }


            
                    
            </div>
        ) ;
    }
}

export default PersonPage;
