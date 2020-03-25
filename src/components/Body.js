import React, { Component } from 'react'
import Profile from './Profile'
import Bugs from'./Bugs'
import {Button, ButtonGroup} from 'react-bootstrap'
import {SHOW_COMPLETE, SHOW_IN_PROGRESS} from '../actions/types';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions/userActions'




class Body extends Component {
    componentDidMount(){
        this.props.fetchUsers();
        console.log(this.props.users)
    }

    render() {
        return (
            <div>
                {
                    this.props.activeTab ? 
                    <div id='bugs' className="container">
                        <ButtonGroup size="lg">
                            <Button onClick={this.props.showProgress}>In Progress</Button>
                            <Button onClick={this.props.showComplete}>Completed</Button>
                        </ButtonGroup>
                       
                        <div className="row">
                            <Bugs activeTab={this.props.activeTab} completed={this.props.completed}/>
                           
                        </div>
                    </div>
             :
                    <Profile users={this.props.users} activeTab={this.props.activeTab}/>
                    
                }

                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    completed: state.bugs.completed,
    users: state.users.users

})

const mapDispatchToProps = dispatch => ({
    showComplete: () => dispatch({type: SHOW_COMPLETE}),
    showProgress: () => dispatch({type: SHOW_IN_PROGRESS}),
    fetchUsers: () => dispatch(fetchUsers())


})



export default connect(mapStateToProps, mapDispatchToProps )(Body);

