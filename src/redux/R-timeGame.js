import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: {
        minutes: 0,
        seconds: -1
    },
  },
  reducers: {
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
    incrementMinutes: (state) =>{
        state.value.minutes +=1
    },
    incrementSeconds: (state) =>{
        state.value.seconds +=1
    },
    resetSeconds: (state) =>{
        state.value.seconds =0
    }
  },
})

// Action creators are generated for each case reducer function
export const { incrementSeconds, incrementMinutes, resetSeconds } = counterSlice.actions

export default counterSlice.reducer