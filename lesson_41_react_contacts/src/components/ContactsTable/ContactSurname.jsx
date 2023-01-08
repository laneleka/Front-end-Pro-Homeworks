import React, { useContext } from 'react';
import ContactsTableContext from '../../context/ContactsTableContext';

function ContactSurname({ item }) {
  const { changeSurname } = useContext(ContactsTableContext);

  const handleSurname = (e) => {
    changeSurname({ ...item, surname: e.target.value });
  }

  return (
    <label>
      <input type="text" value={item.surname} onChange={handleSurname} />
    </label>
  );
}

export default ContactSurname;