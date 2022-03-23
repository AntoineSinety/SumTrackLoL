import { createSlice } from '@reduxjs/toolkit'

export const recapSpell = createSlice({
  name: 'recapSpell',
  initialState: {
  },
  reducers: {
    changeRecap: (state, actions) =>{
        if (state[actions.payload.name]){
            state[actions.payload.name][actions.payload.spell]= actions.payload.cd 
        }else{
            state[actions.payload.name] = {[actions.payload.spell]: actions.payload.cd}
        }
    }
  },
})

// Action creators are generated for each case reducer function
export const { changeRecap } = recapSpell.actions

export default recapSpell.reducer