/* using onChange + value - similar to what being used in redux-pluralsight
=> need UI state
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

console.log('CardModal 2');

/* similar to CourseForm in redux-pluralsight */
//cannot use 
const CarModalForm = ({ card, onSave, onDelete, onChange}) => (
    <div className='modal'>
      <h1> { card.id ? 'Edit' : 'New' } Card </h1>
      <label> Card Front: </label>
      <textarea onChange={onChange} name="front" value={card.front}></textarea>
      <label> Card Back: </label>
      <textarea onChange={onChange} name="back" value={card.back}></textarea>
      <p>
        <button onClick={onSave}> Save Card </button>
        <Link className='btn' to={`/deck/${card.deckId}`}> Cancel </Link>
        { card.id ? 
          <button onClick={onDelete} className='delete'> Delete Card </button> :
          null}
      </p>
    </div>
);

/* similar to ManageCoursePage in redux-pluralsight */
const CardModal = React.createClass({
  getInitialState: function() {
    // naming it initialX clearly indicates that the only purpose
    // of the passed down prop is to initialize something internally
    return {card: Object.assign({}, this.props.card)};
  },
  /*
  componentDidUpdate() {
    ReactDOM.findDOMNode(this.refs.front).focus();
  },*/
  render() {
    return (<CarModalForm 
      card={this.state.card} 
      onSave={this.onSave} 
      onChange={this.updateCardState} 
      onDelete={this.onDelete}  />);
  },

  updateCardState(event) {
    const field = event.target.name;
    let card = this.state.card;
    card[field] = event.target.value;
    return this.setState({card: card});
  }, 
  onSave(evt) {
    this.props.onSave(this.state.card);
    browserHistory.push(`/deck/${this.props.card.deckId}`);
  },
  onDelete(e) {
    this.props.onDelete(this.props.card.id);
    browserHistory.push(`/deck/${this.props.card.deckId}`);
  }
});

export default CardModal;
