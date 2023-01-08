import React, { useContext } from 'react';
import ContactsTableContext from '../../context/ContactsTableContext';

function ContactSave({ item }) {
  const { saveContact } = useContext(ContactsTableContext);

  const handleSave = () => {
    saveContact(item);
  }

  return (
    <button onClick={handleSave}>Save</button>
  );
}

export default ContactSave;