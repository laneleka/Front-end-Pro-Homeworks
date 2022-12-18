import React, { Component, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './style.sass'


class List extends Component {

  render() {
    const { list, actions } = this.props;

    return (
      <Fragment>
        <ul>
          {list.map(item => <li key={item.id}>{item.title}</li>)}
        </ul>
        <div className='buttons-wrapper'>
          {actions.map(item => <button key={uuidv4()} onClick={item.action}>{item.text}</button>)}
        </div>
      </Fragment>
    );
  }
}

export default List;