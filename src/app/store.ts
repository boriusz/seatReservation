import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import seatsReducer from '../features/seats/seatsSlice'

export const store = configureStore({
  reducer: {
    seats: seatsReducer,
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
