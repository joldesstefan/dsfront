import React from 'react';
import {useHistory} from 'react-router-dom';
import { Redirect } from 'react-router-dom'
 
import BackgroundImg from '../commons/images/test_image.jpg';

import {Button, Container, Jumbotron} from 'reactstrap';
const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "1920px",
    backgroundImage: `url(${BackgroundImg})`
};
const textStyle = {color: 'white', };

class Test extends React.Component {

   
constructor(props)
{
    
super(props);
console.log("Test props : " , props);
this.state = 
{
    redi : false
}
this.toHome = this.toHome.bind(this);
}

  toHome ()
{ 
   //useHistory().push("/home");
  // var Router = require('react-router');
  // Router.browserHistory.push('/home');
this.setState({redi: true});
}
    render() {

        return (

            <div>
                
              {this.state.redi === false &&  <Jumbotron fluid style={backgroundStyle}>
                    <Container fluid>
                        
                        <p className="lead">
                            <Button color="primary" onClick={ this.toHome}>Go Home</Button>
                        </p>
                    </Container>
                </Jumbotron>
    }


    { this.state.redi === true &&  <Redirect to= "/"/>  }

            </div>
        )
    };
}

export default Test
