import React from 'react';
import testAction from '../actions/AppActions';
import AppStore from '../stores/AppStore';


class Game extends React.Component {
  constructor() {
    super();

    this._bindMethods();

    // set initial state
    this.state = {
      list: AppStore.getList()
    };
  }

  componentDidMount() {
    AppStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange);
  }

  _bindMethods() {
    this._onChange = this._onChange.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  _onChange() {
    this.setState({
      list: AppStore.getList()
    });
  }

  clickHandler() {
    testAction(Math.floor(Math.random() * 100));
  }

  render() {
    return (
      <div>
        <h2>Game Goes Here</h2>
        <button onClick={this.clickHandler}>Click to test data flow</button>
        <br /><br />
        <div>Random numbers should be added to the array: {JSON.stringify(this.state.list)}</div>
      </div>
    );
  }
}


export default Game;
