import { createSlice } from '@reduxjs/toolkit'

export interface ISeat {
  id: string
  cords: {
    x: number
    y: number
  }
  reserved: boolean
}

export interface ISeatInputData {
  counter: number | null
  nextToOthers: boolean
}

const initialState: ISeatInputData = {
  counter: null,
  nextToOthers: false,
}

export const seatsSlice = createSlice({
  name: 'seats',
  initialState,
  reducers: {
    setSeatsData(state, action) {
      state.counter = action.payload.counter
      state.nextToOthers = action.payload.nextToOthers
    },
  },
})

export const { setSeatsData } = seatsSlice.actions

export default seatsSlice.reducer
