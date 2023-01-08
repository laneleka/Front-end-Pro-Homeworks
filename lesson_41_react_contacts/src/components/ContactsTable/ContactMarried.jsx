import React, { useContext } from 'react';
import ContactsTableContext from '../../context/ContactsTableContext';

function ContactMarried({ item }) {
  const { changeMarried } = useContext(ContactsTableContext);

  const handleMarried = (e) => changeMarried({ ...item, married: e.target.checked });

  return (
    <label>
      <input type="checkbox" defaultChecked={item.married} onChange={handleMarried} />
    </label>
  );
}

export default ContactMarried;