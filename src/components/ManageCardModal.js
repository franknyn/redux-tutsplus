//combine NewCardModal and EditCardModal into one
//similar to ManageCoursePage container in redux-pluralsight
import { addCard, updateCard, deleteCard } from '../actions';
import { connect } from 'react-redux'
import CardModal from './CardModal';

const mapStateToProps = ({ cards }, { params: { deckId, cardId }}) => ({
  card: (cardId)? cards.filter(card => card.id === parseInt(cardId, 10))[0]: {deckId}
});

const mapDispatchToProps = dispatch => ({
  onSave:   card   => (card.id) ? dispatch(updateCard(card)): dispatch(addCard(card)),
  onDelete: cardId => dispatch(deleteCard(cardId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CardModal);
