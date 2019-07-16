import React,{Component} from 'react';
import {Table,Button, ModalHeader, ModalBody, ModalFooter, FormGroup, Label} from 'reactstrap';
import axios from 'axios';
import Modal from 'reactstrap/lib/Modal';
import Input from 'reactstrap/lib/Input';

class App extends Component {
  state = {
    contact : {
      nom : '',
      prenom : '',
      datenais : '',
      phone : '',
      email : '',]
      adress : ''
    },
    contacts : [],
    newContactModal : false
  }

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    axios.get('http://localhost/www/CloudContact/api/v1/contacts').then((response) =>{
      console.log(response.data);
      this.setState({contacts : response.data});
    });
  }

  openContactModal = () =>{
    this.setState({newContactModal:!this.state.newContactModal});
  }

  render() {
    let contacts = this.state.contacts.map((contact) => {
      return(
        <tr key={contact.id}>
          <td>{contact.id}</td>
          <td>{contact.nom}</td>
          <td>{contact.prenom}</td>
          <td>{contact.datenais}</td>
          <td>{contact.phone}</td>
          <td>{contact.email}</td>
          <td>{contact.adress}</td>
          <td>
            <Button color="success" size="sm" className="mr-2">Edit</Button>
            <Button color="danger" size="sm">Delete</Button>
          </td>
        </tr>
      );
    });

    const btnStyle = (
      {
        marginTop:"20px",
        marginBottom:"20px"
      }
    );

    return (
        <div className="App container">
          <Button color="primary" className="mr-4" onClick={this.openContactModal.bind(this)} style={btnStyle}>Add Contact</Button>
          <Modal isOpen={this.state.newContactModal}>
              <ModalHeader>Create Contact</ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Input id="nom" placeholder="Nom"/>
                </FormGroup>
                <FormGroup>
                  <Input id="prenom" placeholder="Prenom"/>
                </FormGroup>
                
                <FormGroup>
                  <Input id="phone" placeholder="Phone"/>
                </FormGroup>
                <FormGroup>
                  <Input id="email" placeholder="E-mail" type="email"/>
                </FormGroup>
                <FormGroup>
                  <Label  for="datenais">Date de Naissance</Label>
                  <Input id="datenais" type="date"/>
                </FormGroup>
                <FormGroup>
                  <Input id="adress" placeholder="Adresse"/>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="success" onClick={this.openContactModal.bind(this)}>Save</Button>
                <Button color="primary" onClick={this.openContactModal.bind(this)}>Cancel</Button>
              </ModalFooter>
          </Modal>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Prenom</th>
                <th>Date Naissance</th>
                <th>Phone</th>
                <th>Enail</th>
                <th>Adress</th>
              </tr>
            </thead>
            <tbody>
              {contacts}
            </tbody>
          </Table>
      </div>   
    );
  } 
}

export default App;
