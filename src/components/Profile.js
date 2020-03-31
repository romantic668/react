import React, { useState, useEffect } from 'react'
import Bugs from './Bugs'
import { Button } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar'
import MyModal from './MyModal'
import { CREATE_MODE } from '../actions/types';
import { connect } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/authActions';





function Profile(props) {

    const [show, setShow] = useState(false);
    const [complete, setComplete] = useState('');
    const [togo, setTogo] = useState('');


    const handleShow = () => {
        setShow(true)
        props.enableCreateMode()
    };

    useEffect(() => {
        store.dispatch(loadUser());
        if (props.auth && props.auth.user) {
            var count = 0;
            for (var i = 0; i < props.auth.user.bugs.length; ++i) {
                if (props.auth.user.bugs[i].finished === true)
                    count++;
            }
            setComplete(count);
            setTogo(props.auth.user.bugs.length - count);
        }

    }, [props.bugs]);





    return (
        <div id="profile">
            {props.auth.isAuthenticated ?
                <div>
                    <div className="jumbotron">
                        {props.auth && props.auth.user ? <h1 className="display-3">Welcome {props.auth.user.username} </h1> : ''}


                        <p className="lead">You have resolved {complete} bugs, {togo} to go. Keep it up!</p>
                        <ProgressBar variant="success" animated now={complete / (complete + togo) * 100} />
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
                </div> : props.auth.isLoading ?
                    <h1 >Loading </h1>
                    :
                    <h1 >Please log in </h1>
            }










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
