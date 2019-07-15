import React,{Component} from 'react';
import {Table,Button} from 'reactstrap';
import axios from 'axios';

class App extends Component {
  state = {
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
          <Button color="primary" className="mr-4" style={btnStyle}>Add Contact</Button>
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
