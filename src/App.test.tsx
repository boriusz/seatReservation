import React from 'react'
import { cleanup, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { BrowserRouter } from 'react-router-dom'
import { Summary } from './components/Summary'
import { SeatsInput } from './features/seats/SeatsInput'
import { SeatsSelection } from './features/seats/SeatsSelection'
import { setSeatsData } from './features/seats/slices/inputSeatsSlice'
import { selectSeat } from './features/seats/slices/selectSeatsSlice'

afterEach(cleanup)

it('renders seats data input page', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Provider store={store}>
        <SeatsInput />
      </Provider>
    </BrowserRouter>
  )

  expect(getByText(/Wybierz miejsca/gi)).toBeInTheDocument()
})

it('renders selection page', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Provider store={store}>
        <SeatsSelection />
      </Provider>
    </BrowserRouter>
  )
  expect(getByText(/Loading.../gi)).toBeInTheDocument()
})

it('renders empty summary page', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Provider store={store}>
        <Summary />
      </Provider>
    </BrowserRouter>
  )

  expect(getByText(/Rezerwacja miejsc nie powiodła się/gi)).toBeInTheDocument()
})

it('displays correct summary page', () => {
  const seat = { id: 's23', cords: { x: 2, y: 3 }, reserved: false }
  store.dispatch(selectSeat({ seat }))
  store.dispatch(setSeatsData({ counter: 1, nextToOthers: false }))
  const { getByText } = render(
    <BrowserRouter>
      <Provider store={store}>
        <Summary />
      </Provider>
    </BrowserRouter>
  )
  expect(getByText(/Rząd 4, miejsce 3/gi)).toBeInTheDocument()
})

it('displays failed summary page', () => {
  // one seat is already there, so just increment expected amount
  store.dispatch(setSeatsData({ counter: 2, nextToOthers: false }))
  const { getByText } = render(
    <BrowserRouter>
      <Provider store={store}>
        <Summary />
      </Provider>
    </BrowserRouter>
  )
  expect(getByText(/Rezerwacja miejsc nie powiodła się/gi)).toBeInTheDocument()
})

it('displays already selected seats', async () => {
  const { getByText, findByTestId } = render(
    <BrowserRouter>
      <Provider store={store}>
        <SeatsSelection />
      </Provider>
    </BrowserRouter>
  )

  await findByTestId('loadeddata')

  // we have set 2 as seats counter, so it will select 2 of them and display it

  expect(getByText(/2\/2/gi)).toBeInTheDocument()
})

it('displays more seats(adjacent)', async () => {
  store.dispatch(setSeatsData({ counter: 20, nextToOthers: true }))
  const { getByText, findByTestId } = render(
    <BrowserRouter>
      <Provider store={store}>
        <SeatsSelection />
      </Provider>
    </BrowserRouter>
  )

  await findByTestId('loadeddata')

  // we have set 20 as seats counter, so it will select 20 of them and display it

  expect(getByText(/20\/20/gi)).toBeInTheDocument()
})

it('displays correct summary page with more seats', () => {
  const { getAllByTestId } = render(
    <BrowserRouter>
      <Provider store={store}>
        <Summary />
      </Provider>
    </BrowserRouter>
  )
  // there are 20 selected seats in store
  expect(getAllByTestId('li')).toHaveLength(20)
})
