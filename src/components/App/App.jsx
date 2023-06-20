import { nanoid } from 'nanoid';
import { Formik } from 'formik';
import * as yup from 'yup';
import 'yup-phone-lite';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ContactsList } from '../ContactsList/ContactsList';
import { ContactsForm } from '../ContactsForm/ContactsForm';
import { Filter } from '../Filter/Filter';
import { MainWrapper } from './App.styled';

const STORAGE_KEY = 'contacts';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
const initialFilter = '';

const validationSchema = yup.object({
  name: yup.string().min(2).max(32).required('This field is required'),
  number: yup
    .string()
    .phone(
      null,
      `Please enter a valid phone number in an international format. Example: +380 50-123-4567`
    )
    .required('This field is required'),
});

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? initialContacts
  );
  const [filter, setFilter] = useState(initialFilter);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const onSubmit = (values, actions) => {
    const isInContacts = contacts.some(
      ({ name }) => name.toLowerCase() === values.name.toLowerCase()
    );

    if (isInContacts) {
      return alert(`${values.name} is already in contacts`);
    }

    setContacts(prevState => [
      {
        name: values.name,
        number: values.number,
        id: nanoid(),
      },
      ...prevState,
    ]);

    actions.resetForm();
  };

  const onFilterChange = e => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(({ id }) => id !== contactId));
  };

  return (
    <MainWrapper>
      <h1>Phonebook</h1>
      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <ContactsForm />
      </Formik>
      <h2>Contacts</h2>
      <p>Find contacts by name</p>
      <Filter value={filter} onFilterChange={onFilterChange} />
      <ContactsList contacts={getVisibleContacts()} onDelete={deleteContact} />
    </MainWrapper>
  );
};

Formik.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
};
