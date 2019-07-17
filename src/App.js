import React,{Component} from 'react';
import {Table,Button, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import axios from 'axios';
import Modal from 'reactstrap/lib/Modal';
import MyInput from './components/Input/Input.js';

class App extends Component {
  state = {
    contact : {
      id:'',
      nom:'sjkasjaksj',
      prenom:'',
      phone:'',
      mail:'',
      adress:'',
      date:''
    },
    contacts : [],
    newContactModal : false,
    editContactModal : false
  }

  componentDidMount() {
    axios.get('http://localhost/www/CloudContact/api/v1/contacts').then((response) =>{
      this.setState({contacts : response.data});
    });
  }

  openNewContactModal = () =>{
    this.setState({newContactModal:!this.state.newContactModal});
  }

  openEditContactModal(id,nm,pr,ph,ml,ad,dt){
    const contact = {
      id : id,
      nom:nm,
      prenom:pr,
      phone:ph,
      mail:ml,
      adress:ad,
      date:dt
    }
    this.setState({editContactModal : !this.state.editContactModal,contact  : contact});
  }

  editContact(contact){
    axios.put('http://localhost/www/CloudContact/api/v1/contacts/edit/'+this.state.contact.id,this.state.contact).then(response => {
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
        newContactModal : false,
        editContactModal : false
      });
    });
  }

  addContact() {
      axios.post('http://localhost/www/CloudContact/api/v1/contacts/add',this.state.contact).then(response => {
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
          newContactModal : false,
          editContactModal : false
        });
      });
  }

  deleteContact(index,id){
    axios.delete('http://localhost/www/CloudContact/api/v1/contacts/delete/'+id).then(response =>{      
      const contacts = [...this.state.contacts];
      contacts.splice(index,1);
      this.setState({contacts:contacts});
    });
  }

  handleValue(event,id){
    let newState = {...this.state.contact};
    newState[id] = event.target.value;
    this.setState({contact : newState});
  }

  render() {

    let contacts = this.state.contacts.map((contact,index) => {
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
            <Button color="success" size="sm" className="mr-2" onClick={this.openEditContactModal.bind(this,contact.id,contact.nom,contact.prenom,contact.phone,contact.email,contact.adress,contact.datenais)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteContact.bind(this,index,contact.id)}>Delete</Button>
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
          <Button color="primary" className="mr-4" onClick={this.openNewContactModal.bind(this)} style={btnStyle}>Add Contact</Button>
          {/* Save Modal */}
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
                <Button color="primary" onClick={this.openNewContactModal.bind(this)}>Cancel</Button>
              </ModalFooter>
          </Modal>
          {/* End Save Modal */}

          {/* Edit Modal */}
          <Modal isOpen={this.state.editContactModal}>
              <ModalHeader>Edit Contact</ModalHeader>
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
                <Button color="warning" onClick={this.editContact.bind(this)}>Edit</Button>
                <Button color="primary" onClick={this.openEditContactModal.bind(this,'','','','','','','')}>Cancel</Button>
              </ModalFooter>
          </Modal>
          {/* End Edit Modal */}
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
