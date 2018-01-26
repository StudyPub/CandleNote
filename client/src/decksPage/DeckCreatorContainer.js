import { connect } from 'react-redux';

import DeckCreator from './DeckCreator';
import { addDeck } from '../actions/decksActions';

const mapStateToProps = state => ({ userId: state.user.userId });

const mapDispatchToProps = dispatch => ({ addDeck: deckInfo => dispatch(addDeck(deckInfo)) });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckCreator);