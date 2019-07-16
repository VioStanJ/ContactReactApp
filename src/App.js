import React,{Component} from 'react';
import {Table,Button, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import axios from 'axios';
import Modal from 'reactstrap/lib/Modal';
import MyInput from './components/Input/Input.js';

class App extends Component {
  state = {
    contact : {
      nom:'',
      prenom:'',
      phone:'',
      mail:'',
      adress:'',
      date:''
    },
    contacts : [],
    newContactModal : false
  }

  componentDidMount() {
    axios.get('http://localhost/www/CloudContact/api/v1/contacts').then((response) =>{
      this.setState({contacts : response.data});
    });
  }

  openContactModal = () =>{
    this.setState({newContactModal:!this.state.newContactModal});
  }

  editContact(contact){
    console.log(contact);
    
  }

  addContact() {
      axios.post('http://localhost/www/CloudContact/api/v1/contacts/add',this.state.contact).then(response => {
        console.log(response);
        this.setState({
          contact : {
            nom:'',
            prenom:'',
            phone:'',
            mail:'',
            adress:'',
            date:''
          },
          contacts : response.data,
          newContactModal : false
        });
      });
  }

  handleValue(event,id){
    let newState = {...this.state.contact};
    newState[id] = event.target.value;
    this.setState({contact : newState});
  }

  render() {

    let contacts = this.state.contacts.map((contact) => {
      return(
        <tr key={contact.id}>
          <td>{contact.id}</td>
          <td>{contact.nom}</td>
          <td>{contact.prenom}</td>
          <td>{contact.phone}</td>
          <td>{contact.email}</td>
          <td>{contact.adress}</td>
          <td>{contact.datenais}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editContact.bind(this,contact)}>Edit</Button>
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
          <h1 className="text-center">Contact React</h1>
          <Button color="primary" className="mr-4" onClick={this.openContactModal.bind(this)} style={btnStyle}>Add Contact</Button>
          <Modal isOpen={this.state.newContactModal}>
              <ModalHeader>Create Contact</ModalHeader>
              <ModalBody>
                
                <MyInput typ="text" hint="Nom" id="nom" val={this.state.contact.nom} 
                  change={(event) => this.handleValue(event,'nom')}/>

                <MyInput typ="text" hint="Prenom" id="prenom" val={this.state.contact.prenom} 
                  change={(event) => this.handleValue(event,'prenom')}/>
                  
                <MyInput typ="number" hint="Phone" id="phone" val={this.state.contact.phone}
                  change={(event) => this.handleValue(event,'phone')}/>

                <MyInput typ="email" hint="E-mail" id="email" val={this.state.contact.mail}
                  change={(event) => this.handleValue(event,'mail')}/>

                <MyInput typ="text" hint="Adress" id="adress" val={this.state.contact.adress}
                  change={(event) => this.handleValue(event,'adress')}/>

                <MyInput typ="date" id="datenais" val={this.state.contact.date}
                  change={(event) => this.handleValue(event,'date')}>Date de Naissance</MyInput>

              </ModalBody>
              <ModalFooter>
                <Button color="success" onClick={this.addContact.bind(this)}>Save</Button>
                <Button color="primary" onClick={this.openContactModal.bind(this)}>Cancel</Button>
              </ModalFooter>
          </Modal>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Prenom</th>
                <th>Phone</th>
                <th>Enail</th>
                <th>Adress</th>
                <th>Date Naissance</th>
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
