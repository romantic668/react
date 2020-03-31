import React, { useState, useEffect } from 'react'
import Bugs from './Bugs'
import { Button } from 'react-bootstrap';
import MyModal from './MyModal'
import { CREATE_MODE } from '../actions/types';
import { connect } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/authActions';





function Profile(props) {

    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(true)
        props.enableCreateMode()
    };

    useEffect(() => {
        store.dispatch(loadUser());
    }, [props.bugs]);



    return (
        <div id="profile">

            <div className="jumbotron">
                {props.auth && props.auth.user ? <h1 className="display-3">Welcome {props.auth.user.username} </h1> : ''}


                <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr className="my-4" />
                <p>Bugs are sorted by deadline. Colors are given based on their priority.</p>
                <p className="lead">
                    <Button variant="primary" onClick={handleShow} type="button" className="btn btn-primary btn-lg btn-block" style={{ fontSize: '100%' }}>Report New Issue</Button>
                </p>
            </div>
            <h3 className="display-5">Issues Assigned To You</h3>
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

const mapStateToProps = (state) => ({
    auth: state.auth,
    bugs: state.bugs
});


const mapDispatchToProps = dispatch => ({
    enableCreateMode: () => dispatch({ type: CREATE_MODE }),




})



export default connect(mapStateToProps, mapDispatchToProps)(Profile);
