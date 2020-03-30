import React from 'react'
import { connect } from 'react-redux';
import { fetchBugs, fetchBug, finishBug, deleteBug } from '../actions/bugActions'
import { fetchUsers } from '../actions/userActions'

import MyModal from './MyModal'
import { EDIT_MODE } from '../actions/types';




class Bugs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    componentDidMount() {
        this.props.fetchBugs();
        this.props.fetchUsers();

    }

    componentDidUpdate(prevProps) {
        console.log(this.props.bugs)
        console.log(prevProps.bugs)

        if (JSON.stringify(this.props.bugs) !== JSON.stringify(prevProps.bugs)) {
            this.props.fetchBugs();
        }
    }

    handleShow(bool, id) {
        console.log(id)
        this.props.enbaleEditMode();
        this.props.fetchBug(id);
        this.setState({
            show: bool
        })
    }

    handleHide(bool) {
        this.setState({
            show: bool
        })
    }

    render() {

        let bugItems = this.props.bugs.items.map(bug => {
            let color = "col-md-4 card bg-danger"
            if (bug.priority === 'COMMON')
                color = "col-md-4 card bg-warning"
            else if (bug.priority === 'LOW')
                color = "col-md-4 card bg-success"

            return (
                <div className={color} key={bug._id}>
                    <div className="card-header">
                        <button onClick={() => this.props.deleteBug(bug._id)} type="button" className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div><h4>{bug.title}</h4></div>

                    </div>
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{bug.priority}</h5>
                        {bug.finished ? <h5 className="card-title">Completed</h5> : <h5 className="card-title">In Progress</h5>}
                        <p className="card-text">{bug.description}</p>


                        <div className="mt-auto">
                            {bug.username && <h5>Assigned to : {bug.username.username}</h5>}
                            {bug.deadline && <h6>Deadline : {new Date(bug.deadline).toDateString("yyyy-MM-dd")}</h6>}
                            {!bug.finished && <button type="button" onClick={() => this.handleShow(true, bug._id)} className="btn btn-info">Edit</button>}<br />
                            {!bug.finished && <button type="button" onClick={() => this.props.finishBug(bug._id)} className="btn btn-info" style={{ marginTop: "3%" }}>Finish</button>}
                        </div>

                    </div>
                </div>
            )
        })

        if (this.props.activeTab) {
            bugItems = this.props.bugs.items.filter(bug => bug.finished === this.props.completed).map(bug => {
                let color = "col-md-4 card bg-danger"
                if (bug.priority === 'COMMON')
                    color = "col-md-4 card bg-warning"
                else if (bug.priority === 'LOW')
                    color = "col-md-4 card bg-success"

                return (
                    <div className={color} key={bug._id}>
                        <div className="card-header"><h4>{bug.title}</h4></div>

                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{bug.priority}</h5>
                            {bug.finished ? <h5 className="card-title">Completed</h5> : <h5 className="card-title">In Progress</h5>}

                            <p className="card-text">{bug.description}</p>
                            <div className="mt-auto">

                                {bug.username && <h5>Assigned to : {bug.username.username}</h5>}
                                {bug.deadline && <h6>Deadline : {new Date(bug.deadline).toDateString("yyyy-MM-dd")}</h6>}
                            </div>

                        </div>
                    </div>
                )
            })
        }
        return (
            <div className="container">

                <div className="row">
                    {bugItems}
                </div>
                <MyModal
                    show={this.state.show}
                    onHide={() => this.handleHide(false)}
                />
            </div>



        )
    }

}

const mapStateToProps = state => ({
    bugs: state.bugs,
    editbug: state.bugs.editbug,
    editmode: state.bugs.editmode,
    users: state.users.users

})

const mapDispatchToProps = dispatch => ({
    enbaleEditMode: () => dispatch({ type: EDIT_MODE }),
    fetchBug: (id) => dispatch(fetchBug(id)),
    fetchBugs: () => dispatch(fetchBugs()),
    finishBug: (id) => dispatch(finishBug(id)),
    deleteBug: (id) => dispatch(deleteBug(id)),
    fetchUsers: () => dispatch(fetchUsers())



})


export default connect(mapStateToProps, mapDispatchToProps)(Bugs);
