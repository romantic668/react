import React, {Component} from 'react'
import { InputGroup, Modal, FormControl, Button, Form} from 'react-bootstrap';
import { connect } from 'react-redux';
import { createBug , editBug} from '../actions/bugActions'
import { DateTime } from 'react-datetime-bootstrap';


class MyModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      priority: '',
      username: '',
      deadline: new Date().toDateString("yyyy-MM-dd")
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeDate(deadline) {
    this.setState({
      deadline: deadline
    })
    console.log(deadline)
  }

  handleSubmit(event) {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();



    if (form.checkValidity()) {
 

      const bug = {
        title: this.state.title,
        description: this.state.description,
        priority: this.state.priority,
        username: this.state.username,
        deadline: this.state.deadline

      };

      const editBug = {
        id: this.props.editbug._id,
        title: this.state.title,
        description: this.state.description,
        priority: this.state.priority,
        deadline: this.state.deadline

      };
      this.setState({title:'', description:''})
      console.log(bug)
      if(this.props.editmode)
        this.props.editBug(editBug)
      else
        this.props.createBug(bug);}
      this.props.onHide();
      
  }

  render(){

  
    const userItems = this.props.users.map((user) =>
      <option key={user._id} value={user._id}>{user.username}</option>
    );
    return (
      <Modal
        onHide={this.props.onHide}
        show={this.props.show}
        createbug={this.createBug}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        style={{opacity:1}}
        centered
      >
        <Form onSubmit={this.handleSubmit}>

          <Modal.Header closeButton>

            
            {/* <Modal.Title id="contained-modal-title-vcenter"> */}
          
            <InputGroup className="mb-3" size='lg'>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default" >Title</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                required
                name="title"
                onChange={this.onChange}
                value={this.state.title} 
                placeholder={this.props.editmode ? this.props.editbug.title :"Title"}
                aria-label="Title"
                aria-describedby="inputGroup-sizing-default"
              />
              
            </InputGroup>
            {/* </Modal.Title> */}
          </Modal.Header>
          <Modal.Body>
            <h4>
              <Form.Label>Set Priority</Form.Label>
              <Form.Control as="select" size="lg" name="priority"
              required
              onChange={this.onChange}
              value={this.state.priority}  >
                
                <option value="">Select your option...</option>
                <option>URGENT</option>
                <option>COMMON</option>
                <option>LOW</option>
                
              </Form.Control>
            </h4>
            
            <InputGroup >
              <InputGroup.Prepend >
                <InputGroup.Text>Description</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
              required
              name="description"
              onChange={this.onChange}
              value={this.state.description} 
              as="textarea" 
              aria-label="Description" 
              style={{fontSize:"80%"}} 
              placeholder={this.props.editmode ? this.props.editbug.description :"Please describe the issue"}/>
            
            </InputGroup>
            <div>
            
              <h4>Deadline:</h4>
              <DateTime pickerOptions={{format:"LL"}} 
                required
                name="deadline"
                onChange={this.onChangeDate}
                value={this.state.deadline}
                />
              
              
            </div>
            {this.props.editmode ? null :
            <h4>
              <Form.Label>Assign it to</Form.Label>
                <Form.Control required as="select" size="lg"
                required
                name="username"
                onChange={this.onChange}
                value={this.state.username}  >
                  <option value="">Select your option...</option>
                  {userItems}

                  
                </Form.Control>
            </h4>

            }
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
            <Button variant="primary" type="submit" >{this.props.editmode ? "Edit" : "Save"}</Button> 
          </Modal.Footer>
          </Form>
      </Modal>
    );
  }

}

const mapStateToProps = state => ({
  editbug: state.bugs.editbug,
  editmode: state.bugs.editmode,
  users: state.users.users
})

const mapDispatchToProps = dispatch => ({
  editBug: (bug) => dispatch(editBug(bug)),
  createBug: (bug) => dispatch(createBug(bug))


})


  export default connect (mapStateToProps, mapDispatchToProps)(MyModal)
