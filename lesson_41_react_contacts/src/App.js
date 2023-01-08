import React, { Fragment } from 'react';

import Form from './components/ContactsForm/Form';
import ContactsTable from './components/ContactsTable/ContactsTable';
import useContacts from './hooks/useContacts';
import ContactsTableContext from './context/ContactsTableContext';

function App() {
  const { contacts, changeContactData, saveContactData, deleteContactData, addContactData } = useContacts();

  const changeName = (item) => changeContactData(item, 'name');

  const changeSurname = (item) => changeContactData(item, 'surname');

  const changeMarried = (item) => changeContactData(item, 'married');

  const saveContact = async (item) => await saveContactData(item);

  const deleteContact = async (id) => await deleteContactData(id);

  const addContact = async (obj) => await addContactData(obj);

  return (
    <Fragment>
      <Form addContact={addContact} />
      <ContactsTableContext.Provider value={{ changeName, changeSurname, changeMarried, saveContact, deleteContact }}>
        <ContactsTable contacts={contacts} />
      </ContactsTableContext.Provider>
    </Fragment>
  );
}

export default App;