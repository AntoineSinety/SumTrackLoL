import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils';

export const recapSpell = createSlice({
  name: 'recapSpell',
  initialState: {
    value: [],
    stringRecap: ''
  },
  reducers: {
    changeRecap: (state, actions) =>{
        state.value.push({name: actions.payload.name, spell: actions.payload.spell, cd: actions.payload.cd})
        // if (state[actions.payload.name]){
        //     state[actions.payload.name][actions.payload.spell]= actions.payload.cd 
        // }else{
        //     state[actions.payload.name] = {[actions.payload.spell]: actions.payload.cd}
        // }
    },
    filterRecap: (state, actions) => ({
        ...state,
        value: state.value.filter((e) => e.name !== actions.payload.name && e.spell !== actions.payload.spell )
    }),
    generateRecap: (state) => {
        const getSumsString = (characterName, characherArray) => 
          `${characterName} : ` +
          characherArray.map((summ) => `${summ.spell} ${summ.cd}`).join(' - ');

        const summsByCharacters = state.value.reduce((acc, current) => {
        if (!acc[current.name]) return { ...acc, [current.name]: [current] };

        return { ...acc, [current.name]: [...acc[current.name], current] };
        }, {});

        const sumsString = Object.entries(summsByCharacters)
        .map((entry) => getSumsString(entry[0], entry[1]))
        .join(' / ');

        state.stringRecap = sumsString

    }
  },
})

// Action creators are generated for each case reducer function
export const { changeRecap, filterRecap, generateRecap } = recapSpell.actions

export default recapSpell.reducer