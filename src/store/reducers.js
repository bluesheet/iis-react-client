import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { Reducers } from '../features'
import rootReducer from '../containers/reducer'
import { Reducer as PassportReducer } from '../passport'

export default combineReducers({
  router     : routerReducer,
  Root       : rootReducer,
  Passport   : PassportReducer,
  ...Reducers
})