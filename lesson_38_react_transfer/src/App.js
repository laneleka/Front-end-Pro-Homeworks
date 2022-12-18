import React, { Component } from 'react';
import ToDo from './components/ToDo'

class App extends Component {
  state = {
    list: [
      {
        id: 1,
        title: 'Task 1'
      },
      {
        id: 2,
        title: 'Task 2'
      },
      {
        id: 3,
        title: 'Task 3'
      },
      {
        id: 4,
        title: 'Task 4'
      }
    ]
  }

  render() {
    const { list } = this.state;

    return (
      <ToDo list={list} />
    );
  }
}

export default App;

