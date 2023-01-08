import React, { useContext } from 'react';
import ContactsTableContext from '../../context/ContactsTableContext';

function ContactDelete({ id }) {
  const { deleteContact } = useContext(ContactsTableContext);

  const handleDelete = () => deleteContact(id);

  return (
    <button onClick={handleDelete}>Delete</button>
  );
}

export default ContactDelete;