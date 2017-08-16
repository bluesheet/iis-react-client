import Home from './home'
import Admin from './admin'
import Information from './information'
import HomeReducer from './home/reducer'
import InformationReducer from './information/reducer'

export const Routes = [
  Home,
  Admin,
  Information
]

export const Reducers = {
  Home                : HomeReducer,
  Information         : InformationReducer
}