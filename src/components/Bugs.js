import React from 'react'
import { connect } from 'react-redux';
import { fetchBugs } from '../actions/bugActions'

class Bugs extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchBugs();
    }

    componentDidUpdate(prevProps){
        console.log(this.props.bugs)
        console.log(prevProps.bugs)

        if (JSON.stringify(this.props.bugs) !== JSON.stringify(prevProps.bugs)) {
            this.props.fetchBugs();
        }
    }

    render(){

        let bugItems = this.props.bugs.items.map(bug => {
            let color = "col-md-4 card bg-danger" 
            if(bug.priority==='COMMON')
                color = "col-md-4 card bg-warning" 
            else if(bug.priority==='LOW')
                color = "col-md-4 card bg-success" 
            
            return (
            <div className={color} key={bug._id}>
                <div className="card-header">{bug.title}</div>
                <div className="card-body d-flex flex-column">
                    <h4 className="card-title">{bug.priority}</h4>
                    {bug.finished ? <h4 className="card-title">Completed</h4> : <h4 className="card-title">In Progress</h4>}
                    <p className="card-text">{bug.description}</p>
                    <h3>{bug.createdAt}</h3>
                    <h3>Assigned to</h3>
                    <div className="mt-auto">
                        {!bug.finished &&<button type="button" className="btn btn-info btn-lg">Edit</button>}<br/>
                        {!bug.finished && <button type="button" className="btn btn-info btn-lg">Finish</button>}
                    </div>
                    
                </div>
            </div>
        )})

        if(this.props.activeTab){
            bugItems = this.props.bugs.items.filter(bug => bug.finished === this.props.completed).map(bug => {
                let color = "col-md-4 card bg-danger" 
                if(bug.priority==='COMMON')
                    color = "col-md-4 card bg-warning" 
                else if(bug.priority==='LOW')
                    color = "col-md-4 card bg-success" 
                
                return (
                <div className={color} key={bug._id}>
                    <div className="card-header">{bug.title}</div>

                    <div className="card-body">
                        <h4 className="card-title">{bug.priority}</h4>
                        {bug.finished ? <h4 className="card-title">Completed</h4> : <h4 className="card-title">In Progress</h4>}

                        <p className="card-text">{bug.description}</p>
                        <h3>{bug.createdAt}</h3>
                        <h3>Assigned to</h3>
                        
                    </div>
                </div>
            )})
        }
        return (
            <div className="container">

                <div className="row">
                    {bugItems}
                </div>
            </div>

            
            
        )
    }
    
}

const mapStateToProps = state => ({
    bugs: state.bugs
})


export default connect(mapStateToProps, { fetchBugs })(Bugs);
