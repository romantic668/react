import React, { Component } from 'react'
import Bugs from './Bugs'
import { Button, ButtonGroup } from 'react-bootstrap'
import { SHOW_COMPLETE, SHOW_IN_PROGRESS } from '../actions/types';
import { connect } from 'react-redux';





class Body extends Component {


    render() {
        return (
            <div>

                <div id='bugs' className="container">
                    <ButtonGroup id="button">
                        <Button onClick={this.props.showProgress} active={!this.props.completed}>In Progress</Button>
                        <Button onClick={this.props.showComplete} active={this.props.completed}>Completed</Button>
                    </ButtonGroup>

                    <div className="row">
                        <Bugs activeTab={this.props.activeTab} completed={this.props.completed} />

                    </div>
                </div>



            </div>
        )
    }
}

const mapStateToProps = state => ({
    completed: state.bugs.completed,

})

const mapDispatchToProps = dispatch => ({
    showComplete: () => dispatch({ type: SHOW_COMPLETE }),
    showProgress: () => dispatch({ type: SHOW_IN_PROGRESS }),


})



export default connect(mapStateToProps, mapDispatchToProps)(Body);

