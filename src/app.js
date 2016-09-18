import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { fetchData } from './actions';
import * as reducers from './reducers';
reducers.routing = routerReducer;

//console.log(React);

import App from './components/App';
import VisibleCards from './components/VisibleCards';

//import NewCardModal from './components/NewCardModal';
//import EditCardModal from './components/EditCardModal';
import ManageCardModal from './components/ManageCardModal';

import StudyModal from './components/StudyModal';
/*
initial state of store looks like
reducers= {
  showBack : false,
  cardFilter: '',
  cards: [],
  decks: [],
  addingDeck: false
}

cards: [{ id: cardId, score, lastStudiedOn: +now, front, back }]
*/
const store = createStore(combineReducers(reducers), applyMiddleware(thunkMiddleware));
const history = syncHistoryWithStore(browserHistory, store);

//function run () {
  ReactDOM.render((<Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <Route path='/deck/:deckId' component={VisibleCards}>
          {/*<Route path='/deck/:deckId/new' component={NewCardModal} />
          <Route path='/deck/:deckId/edit/:cardId' component={EditCardModal} />*/}
          <Route path='/deck/:deckId/new' component={ManageCardModal} />
          <Route path='/deck/:deckId/edit/:cardId' component={ManageCardModal} />
          <Route path='/deck/:deckId/study' component={StudyModal} />
        </Route>
      </Route>
    </Router>
  </Provider>), document.getElementById('root'));
//}

function save() {
  var state = store.getState();

  fetch('/api/data', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      decks: state.decks,
      cards: state.cards
    })
  });
}

function init () {
  //run();
  //store.subscribe(run);

  //will be called every time an action is dispatched or store/state is changed
  store.subscribe(save);
  store.dispatch(fetchData());
}

init();
