import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import inputSeatsReducer from '../features/seats/inputSeatsSlice'
import selectSeatsReducer from '../features/seats/selectSeatsSlice'

export const store = configureStore({
  reducer: {
    inputSeats: inputSeatsReducer,
    selectSeats: selectSeatsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
