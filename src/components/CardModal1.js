/* using ref and defaultValue
=> no need value and onChange
=> no need UI state
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

console.log('CardModal 1');

const CardModal = React.createClass({
  componentDidUpdate() {
    ReactDOM.findDOMNode(this.refs.front).focus();
  },
  render() {
    let { card } = this.props;

    return (<div className='modal'>
      <h1> { card.id ? 'Edit' : 'New' } Card </h1>
      <label> Card Front: </label>
      <textarea ref='front' defaultValue={card.front}></textarea>
      <label> Card Back: </label>
      <textarea ref='back' defaultValue={card.back}></textarea>
      <p>
        <button onClick={this.onSave}> Save Card </button>
        <Link className='btn' to={`/deck/${card.deckId}`}> Cancel </Link>
        { card.id ? 
          <button onClick={this.onDelete} className='delete'> Delete Card </button> :
          null}
      </p>
    </div>);
  },
  onSave(evt) {
    var front = ReactDOM.findDOMNode(this.refs.front);
    var back = ReactDOM.findDOMNode(this.refs.back);

    this.props.onSave(Object.assign({}, this.props.card, {
      front: front.value,
      back: back.value
    }));
    browserHistory.push(`/deck/${this.props.card.deckId}`);
  },
  onDelete(e) {
    this.props.onDelete(this.props.card.id);
    browserHistory.push(`/deck/${this.props.card.deckId}`);
  }
});

export default CardModal;
