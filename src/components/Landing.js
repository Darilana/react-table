import React from 'react'
import { Jumbotron, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Landing = () => (
    <div className="coverage">
        <Jumbotron className='container'>
            <h1>Excel table editor</h1>
            <p>
                This is a simple online editor that will help you to create Excel table online.
            </p>
            <p>
                <Link to="/table">
                    <Button bsStyle="success" bsSize="large">Try it now for FREE!</Button>
                </Link>
            </p>
        </Jumbotron>
    </div>
);

export default Landing;