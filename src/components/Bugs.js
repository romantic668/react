import React, { Component } from 'react'

export default class Bugs extends Component {
    render() {
        return (
            <div>
                {
                    this.props.activeTab ? 
                    <div id="bugs">bugs</div> :
                    <div id="profile">
                        <div className="jumbotron">
                            <h1 className="display-3">Hello, world!</h1>
                            <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                            <hr className="my-4"/>
                            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                            <p className="lead">
                                <button type="button" className="btn btn-primary btn-lg btn-block" style={{fontSize: '100%'}}>Report New Issue</button>
                            </p>
                        </div>

                        <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">Type</th>
                        <th scope="col">Column heading</th>
                        <th scope="col">Column heading</th>
                        <th scope="col">Column heading</th>
                        </tr>
                    </thead>
                        <tbody>
                            <tr class="table-active">
                            <th scope="row">Active</th>
                            <td>Column content</td>
                            <td>Column content</td>
                            <td>Column content</td>
                            </tr>
                            <tr>
                            <th scope="row">Default</th>
                            <td>Column content</td>
                            <td>Column content</td>
                            <td>Column content</td>
                            </tr>
                            <tr class="table-primary">
                            <th scope="row">Primary</th>
                            <td>Column content</td>
                            <td>Column content</td>
                            <td>Column content</td>
                            </tr>
                            <tr class="table-secondary">
                            <th scope="row">Secondary</th>
                            <td>Column content</td>
                            <td>Column content</td>
                            <td>Column content</td>
                            </tr>
                            <tr class="table-success">
                            <th scope="row">Success</th>
                            <td>Column content</td>
                            <td>Column content</td>
                            <td>Column content</td>
                            </tr>
                            <tr class="table-danger">
                            <th scope="row">Danger</th>
                            <td>Column content</td>
                            <td>Column content</td>
                            <td>Column content</td>
                            </tr>
                            <tr class="table-warning">
                            <th scope="row">Warning</th>
                            <td>Column content</td>
                            <td>Column content</td>
                            <td>Column content</td>
                            </tr>
                            <tr class="table-info">
                            <th scope="row">Info</th>
                            <td>Column content</td>
                            <td>Column content</td>
                            <td>Column content</td>
                            </tr>
                            <tr class="table-light">
                            <th scope="row">Light</th>
                            <td>Column content</td>
                            <td>Column content</td>
                            <td>Column content</td>
                            </tr>
                            <tr class="table-dark">
                            <th scope="row">Dark</th>
                            <td>Column content</td>
                            <td>Column content</td>
                            <td>Column content</td>
                            </tr>
                        </tbody>
                    </table> 
                        
                    
                    
                    
                    
                    
                    
                    
                    </div> 
                    
                }

                
            </div>
        )
    }
}
