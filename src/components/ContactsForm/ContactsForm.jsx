import { Form, Label } from './ContactsForm.styled';
import { Field, ErrorMessage } from 'formik';

export const ContactsForm = () => {
  return (
    <>
      <Form>
        <Label>
          Name
          <Field
            type="text"
            name="name"
            // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />
          <ErrorMessage name="name" render={message => <p>{message}</p>} />
        </Label>
        <Label>
          Number
          <Field
            type="tel"
            name="number"
            // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          />
          <ErrorMessage name="number" render={message => <p>{message}</p>} />
        </Label>

        <button type="submit">Add contact</button>
      </Form>
    </>
  );
};
