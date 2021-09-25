import React, { Component } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import { v4 as uuidv4 } from 'uuid';
import s from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onSubmit = ({ name, number }) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    if (this.state.contacts.find((contact) => contact.name === name)) {
      alert(`${name} is already in contacts.`);
    } else {
      return this.setState(({ contacts }) => ({ contacts: [contact, ...contacts] }));
    }
  };

  onChangeFilter = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) => name.toLowerCase().includes(normalizedFilter));
  };

  handleContactDeleting = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;

    return (
      <div className={s.mainContainer}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onSubmit} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.onChangeFilter} />
        <ContactList
          contacts={this.filteredContacts()}
          onDeleteClick={this.handleContactDeleting}
        />
      </div>
    );
  }
}
export default App;
