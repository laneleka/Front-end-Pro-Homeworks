import React from 'react';
import ContactMarried from './ContactMarried';
import ContactName from './ContactName';
import ContactSurname from './ContactSurname';
import ContactSave from './ContactSave';
import ContactDelete from './ContactDelete';

function ContactRow({ item }) {

  return (
    <tr>
      <td>
        <ContactName item={item} />
      </td>
      <td>
        <ContactSurname item={item} />
      </td>
      <td>
        <ContactMarried item={item} />
      </td>
      <td>
        <ContactSave item={item} />
        <ContactDelete id={item.id} />
      </td>

    </tr>
  );
}

export default ContactRow;