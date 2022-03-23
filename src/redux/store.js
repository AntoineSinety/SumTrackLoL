import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './R-timeGame'
import recapSpellReducer from './R-recapSpell'

export default configureStore({
  reducer: {
    timeGame: counterReducer,
    recapSpell: recapSpellReducer
  },
})