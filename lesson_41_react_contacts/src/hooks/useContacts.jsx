import { useEffect, useState } from 'react';
import { getItems, saveItem, deleteItem, addItem } from '../services/contactsServices';

function useContacts(props) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => setContacts(await getItems()))();
  }, [])

  const changeContactData = (item, value) => {
    setContacts(prevState => prevState.map(element => {
      if (element.id === item.id) {
        element[value] = item[value];
      }
      return element;
    }))
  }

  const saveContactData = async (item) => {
    await saveItem(item.id, item);
  }

  const deleteContactData = async (id) => {
    await deleteItem(id);
    
    setContacts(prevState => prevState.filter(item => item.id !== id));
  }

  const addContactData = async (obj) => {
    const addedContact = await addItem(obj);

    setContacts(prevState => ([...prevState, addedContact]))
  }

  return { contacts, changeContactData, saveContactData, deleteContactData, addContactData };
}

export default useContacts;