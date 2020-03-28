import React, {useState} from 'react'
import Bugs from './Bugs'
import {  Button } from 'react-bootstrap';
import MyModal from'./MyModal'
import { CREATE_MODE } from '../actions/types';
import { connect } from 'react-redux';


function Profile(props) {
    
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(true)
        props.enableCreateMode()
    };
  
    return (
        <div id="profile">
            
            <div className="jumbotron">
                <h1 className="display-3">Hello, world!</h1>
                <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr className="my-4"/>
                <p>Bugs are sorted by deadline. Colors are given based on their priority.</p>
                <p className="lead">
                    <Button variant="primary" onClick={handleShow} type="button" className="btn btn-primary btn-lg btn-block" style={{fontSize: '100%'}}>Report New Issue</Button>
                </p>
            </div>
            <h2 className="display-4">Issues Assigned To You</h2>
            <div className="container">
                <div className="row">
                    <Bugs />
                   

                </div>
            </div>
            <MyModal
                show={show}
                onHide={() => setShow(false)}
            />
            
            
        
        
        
        
        
        
        
        </div> 
    )
}


const mapDispatchToProps = dispatch => ({
    enableCreateMode: () => dispatch({type: CREATE_MODE}),
    
   


})



export default connect(null, mapDispatchToProps )(Profile);
