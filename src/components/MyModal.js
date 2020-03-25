import React from 'react'
import { InputGroup, Modal, FormControl, Button, Form} from 'react-bootstrap';


export default function MyModal(props) {
    const userItems = props.users.map((user) =>
      <option key={user._id}>{user.username}</option>
    );
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        style={{opacity:1}}
        centered
      >
        <Form>

          <Modal.Header closeButton>

            
            {/* <Modal.Title id="contained-modal-title-vcenter"> */}
            <InputGroup className="mb-3" size='lg'>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default"  >Title</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
              
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
              <Form.Control as="select" size="lg" >
                <option>Urgent</option>
                <option>Common</option>
                <option>Low</option>
                
              </Form.Control>
            </h4>
            
            <InputGroup >
              <InputGroup.Prepend >
                <InputGroup.Text>Description</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl as="textarea" aria-label="Description" style={{fontSize:"80%"}} placeholder="describe the issue"/>
            </InputGroup>
            
            <h4>
              <Form.Label>Assign it to</Form.Label>
                <Form.Control as="select" size="lg" >
                  {userItems}

                  
                </Form.Control>
            </h4>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>Close</Button>
            <Button variant="primary">Save</Button> 
          </Modal.Footer>
          </Form>
      </Modal>
    );
  }
