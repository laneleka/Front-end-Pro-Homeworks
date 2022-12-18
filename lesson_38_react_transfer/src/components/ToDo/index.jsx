import React, { Component } from 'react';
import List from '../List';
import './style.sass'

class ToDo extends Component {
  constructor(props) {
    super(props);

    this.transferToSecond = this.transferToSecond.bind(this);
    this.transferToFirst = this.transferToFirst.bind(this);
    this.transferToThird = this.transferToThird.bind(this);
    this.removeLastItem = this.removeLastItem.bind(this);
  }

  state = {
    firstList: this.props.list,
    secondList: [],
    thirdList: []
  }

  transferToSecond() {
    this.setState({
      secondList: [...this.state.firstList.splice(0, 1), ...this.state.secondList]
    })
  }

  transferToFirst() {
    this.setState({
      firstList: [...this.state.secondList.splice(0, 1), ...this.state.firstList]
    })
  }

  transferToThird() {
    this.setState({
      thirdList: [...this.state.secondList.splice(0, 1), ...this.state.thirdList]
    })

  }

  removeLastItem() {
    this.setState({
      thirdList: this.state.thirdList.slice(0, -1)
    })
  }

  render() {
    return (
      <div className='todos'>
        <div className='column'>
          <List list={this.state.firstList} 
                actions={[{ text: 'Transfer first to right', 
                            action: this.transferToSecond }]} />
        </div>

        <div className='column'>
          {this.state.secondList.length 
            ? <List list={this.state.secondList} 
                    actions={[{ text: "Transfer first to left", 
                                action: this.transferToFirst }, 
                              { text: "Transfer first to right", 
                                action: this.transferToThird }]} /> 
            : null}
        </div>

        <div className='column'>
          {this.state.thirdList.length 
            ? <List list={this.state.thirdList} 
                    actions={[{ text: "Remove last item", 
                                action: this.removeLastItem }]} /> 
            : null}
        </div>
        
      </div>
    );
  }
}

export default ToDo;