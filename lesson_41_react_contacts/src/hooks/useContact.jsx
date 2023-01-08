import { useState } from "react";

export default function useContact() {
  const [newContact, setNewContact] = useState({
    name: '',
    surname: '',
    married: false
  });

  const modifyContact = (key, value) =>
    setNewContact(prevState => ({ ...prevState, [key]: value }));

  return { newContact, modifyContact };
}