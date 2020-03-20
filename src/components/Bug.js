import React from 'react'

export default function Bug() {
    return (
        
        <div className="col-md-4 card bg-danger">
                <div className="card-header">Title</div>
                <div className="card-body">
                    <h4 className="card-title">Urgent</h4>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <h3>Created At</h3>
                    <h3>Assigned to</h3>
                    <button type="button" className="btn btn-info btn-lg">Edit</button><br/>
                    <button type="button" className="btn btn-info btn-lg">Finish</button>
                </div>
            </div>
        
    )
}
