import { createSlice } from '@reduxjs/toolkit'
import type { ISeat } from './inputSeatsSlice'

interface ISelectState {
  selected: ISeat[]
}

const initialState: ISelectState = {
  selected: [],
}

export const selectSeatsSlice = createSlice({
  name: 'selectSeats',
  initialState,
  reducers: {
    selectSeat(state, action) {
      state.selected.push(action.payload.seat)
    },
    removeSeat(state, action) {
      state.selected = state.selected.filter((s) => {
        return s.id !== action.payload.seat.id
      })
    },
    removeAllSeats(state) {
      state.selected = []
    },
  },
})

export const { selectSeat, removeSeat, removeAllSeats } = selectSeatsSlice.actions

export default selectSeatsSlice.reducer
