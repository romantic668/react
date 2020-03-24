import React, { Component } from 'react'
import Profile from './Profile'
import Bugs from'./Bugs'
import {Button, ButtonGroup} from 'react-bootstrap'
import {SHOW_COMPLETE, SHOW_IN_PROGRESS} from '../actions/types';
import { connect } from 'react-redux';



class Body extends Component {
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
                    <Profile activeTab={this.props.activeTab}/>
                    
                }

                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    completed: state.bugs.completed
})

const mapDispatchToProps = dispatch => ({
    showComplete: () => dispatch({type: SHOW_COMPLETE}),
    showProgress: () => dispatch({type: SHOW_IN_PROGRESS}),


})



export default connect(mapStateToProps, mapDispatchToProps)(Body);

