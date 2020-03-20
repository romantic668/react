import React, { Component } from 'react'
import Profile from './Profile'
import Bug from'./Bug'
import {Button, ButtonGroup} from 'react-bootstrap'

export default class Body extends Component {
    render() {
        return (
            <div>
                {
                    this.props.activeTab ? 
                    <div id='bugs' className="container">
                        <ButtonGroup size="lg">
                            <Button>In Progress</Button>
                            <Button>Done</Button>
                        </ButtonGroup>
                       
                        <div className="row">
                            <Bug />
                            <Bug />
                            <Bug />
                        </div>
                    </div>
             :
                    <Profile />
                    
                }

                
            </div>
        )
    }
}
