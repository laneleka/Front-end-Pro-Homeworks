import React, { useContext } from 'react';
import ContactsTableContext from '../../context/ContactsTableContext';

function ContactName({ item }) {
  const { changeName } = useContext(ContactsTableContext);

  const handleName = (e) => {
    changeName({ ...item, name: e.target.value });
  }

  return (
    <label>
      <input type="text" value={item.name} onChange={handleName} />
    </label>
  );
}

export default ContactName;