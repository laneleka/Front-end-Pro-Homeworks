import React from 'react';
import useContact from '../../hooks/useContact';
import './style.sass';

function Form({ addContact }) {
  const { newContact, modifyContact } = useContact();

  const handleName = e => modifyContact(e.target.name, e.target.value);

  const handleSurname = e => modifyContact(e.target.name, e.target.value);

  const handleMarried = e => modifyContact(e.target.name, e.target.checked);

  const handleSubmit = e => {
    e.preventDefault();

    addContact(newContact);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name: <input type="text" name="name" onBlur={handleName} />
      </label>
      <label>
        Surname: <input type="text" name="surname" onBlur={handleSurname} />
      </label>
      <label>
        Married: <input type="checkbox" name="married" onChange={handleMarried} />
      </label>
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default Form;