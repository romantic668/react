import React, {Component} from 'react'
import { InputGroup, Modal, FormControl, Button, Form} from 'react-bootstrap';
import { connect } from 'react-redux';
import { createBug } from '../actions/bugActions'

class MyModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      priority: 'COMMON',
      username: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const bug = {
      title: this.state.title,
      description: this.state.description,
      priority: this.state.priority,
      // username: this.state.username

    };
    console.log(bug)

    this.props.createBug(bug);
  }

  render(){

  
    const userItems = this.props.users.map((user) =>
      <option key={user._id}>{user.username}</option>
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
        <Form onSubmit={this.onSubmit}>

          <Modal.Header closeButton>

            
            {/* <Modal.Title id="contained-modal-title-vcenter"> */}
            <InputGroup className="mb-3" size='lg'>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default" >Title</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
              
                name="title"
                onChange={this.onChange}
                value={this.state.title} 
                placeholder="Title"
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
              onChange={this.onChange}
              value={this.state.priority}  >
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
              name="description"
              onChange={this.onChange}
              value={this.state.description} 
              as="textarea" 
              aria-label="Description" 
              style={{fontSize:"80%"}} 
              placeholder="describe the issue"/>
            </InputGroup>
            
            <h4>
              <Form.Label>Assign it to</Form.Label>
                <Form.Control as="select" size="lg" >
                  {userItems}

                  
                </Form.Control>
            </h4>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
            <Button variant="primary" type="submit" onClick={this.props.onHide}>Save</Button> 
          </Modal.Footer>
          </Form>
      </Modal>
    );
  }

}




  export default connect (null, {createBug})(MyModal)
