import {combineReducers} from 'redux'
import boardReducer from './boardReducer'
import fetchReducer from './fetchDataReducer'

const rootReducer = combineReducers({
  data: boardReducer,
  fetch: fetchReducer,
})

export default rootReducer
