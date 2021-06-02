import { createSlice } from '@reduxjs/toolkit'

export interface ISeat {
  id: string
  cords: {
    x: number
    y: number
  }
  reserved: boolean
  selected?: boolean
}

export interface ISeatInputData {
  counter: number | null
  nextToOthers: boolean
}

const initialState: ISeatInputData = {
  counter: null,
  nextToOthers: false,
}

export const inputSeatsSlice = createSlice({
  name: 'inputSeats',
  initialState,
  reducers: {
    setSeatsData(state, action) {
      state.counter = action.payload.counter
      state.nextToOthers = action.payload.nextToOthers
    },
  },
})

export const { setSeatsData } = inputSeatsSlice.actions

export default inputSeatsSlice.reducer
