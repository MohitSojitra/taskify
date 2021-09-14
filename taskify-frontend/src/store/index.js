import { createStore, applyMiddleware } from 'redux'

import rootReducer from './reducer/rootReducer'
import thunk from 'redux-thunk';



export default createStore(rootReducer, applyMiddleware(thunk));