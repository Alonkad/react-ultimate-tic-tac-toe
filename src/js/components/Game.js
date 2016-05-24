import React from 'react';
import AppStore from '../stores/AppStore';
import OuterBoard from '../components/OuterBoard';


class Game extends React.Component {
  constructor() {
    super();

    this._bindMethods();

    // set initial state
    this.state = AppStore.getData();
  }

  componentDidMount() {
    AppStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange);
  }

  _bindMethods() {
    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    this.setState(AppStore.getData());
  }

  render() {
    if (this.state.winningPlayer) {
      alert(`Player ${this.state.winningPlayer} is the winner!`);  // eslint-disable-line no-alert
    }

    return (
      <div>
        <h2>Game Goes Here</h2>
        <h2>It's player {this.state.currentPlayer} turn to play</h2>

        <div className="game-container">
          <OuterBoard data={this.state} />
        </div>
      </div>
    );
  }
}


export default Game;
