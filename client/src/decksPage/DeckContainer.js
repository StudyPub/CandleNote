import { connect } from 'react-redux';

import Deck from './index';
import { addDeck, createDeck, setCurrentDeck, deleteDeck } from '../actions/decksActions';

const mapStateToProps = state => ({
  decksById: state.decks.byId,
  userId: state.user.currentUser.userId,
});

const mapDispatchToProps = dispatch => ({
  setCurrentDeck: deckId => dispatch(setCurrentDeck(deckId)),
  deleteDeck: deckId => dispatch(deleteDeck(deckId)),
  addDeck: deckInfo => dispatch(addDeck(deckInfo)),
  createDeck: deckInfo => dispatch(createDeck(deckInfo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Deck);
