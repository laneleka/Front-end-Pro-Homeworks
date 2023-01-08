import React from 'react';
import ContactRow from './ContactRow';
import './style.sass';

import TABLE_CAPTIONS from '../../constants/tableCaptions';

function ContactsTable({ contacts }) {
  return (
    <table>
      <caption>Contacts</caption>
      <thead>
        <tr>
          {TABLE_CAPTIONS.map(caption => <td key={caption}>{caption}</td>)}
        </tr>
      </thead>
      <tbody>
        {contacts.map((item) => <ContactRow key={item.id} item={item} />)}
      </tbody>
    </table>

  );
}

export default ContactsTable;