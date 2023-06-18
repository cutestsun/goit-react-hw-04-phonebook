import { nanoid } from 'nanoid';
import { Formik } from 'formik';
import * as yup from 'yup';
import 'yup-phone-lite';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { ContactsList } from '../ContactsList/ContactsList';
import { ContactsForm } from '../ContactsForm/ContactsForm';
import { Filter } from '../Filter/Filter';
import { MainWrapper } from './App.styled';

const STORAGE_KEY = 'contacts';

const initialState = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

const validationSchema = yup.object({
  name: yup.string().required('This field is required'),
  number: yup
    .string()
    .phone(
      null,
      `Please enter a valid phone number in an international format. Example: +380 501234567`
    )
    .required('This field is required'),
});

export class App extends Component {
  state = { ...initialState };

  componentDidMount() {
    const savedContacts = localStorage.getItem(STORAGE_KEY);

    if (savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);

      return this.setState({ contacts: parsedContacts });
    }

    this.setState({ contacts: initialState.contacts });
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.contacts));
    }
  }

  onSubmit = (values, actions) => {
    const isInContacts = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === values.name.toLowerCase()
    );

    if (isInContacts) {
      return alert(`${values.name} is already in contacts`);
    }

    this.setState(prevState => ({
      contacts: [
        {
          name: values.name,
          number: values.number,
          id: nanoid(),
        },
        ...prevState.contacts,
      ],
    }));

    actions.resetForm();
  };

  onFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  getVisibleContacts() {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    return (
      <MainWrapper>
        <h1>Phonebook</h1>
        <Formik
          initialValues={{ name: '', number: '' }}
          validationSchema={validationSchema}
          onSubmit={this.onSubmit}
        >
          <ContactsForm />
        </Formik>
        <h2>Contacts</h2>
        <p>Find contacts by name</p>
        <Filter
          value={this.state.filter}
          onFilterChange={this.onFilterChange}
        />
        <ContactsList
          contacts={this.getVisibleContacts()}
          onDelete={this.deleteContact}
        />
      </MainWrapper>
    );
  }
}

Formik.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
};
