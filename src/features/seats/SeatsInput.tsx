import React, { useRef, useState } from 'react'
import {
  Button,
  Checkbox,
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { setSeatsData } from './slices/inputSeatsSlice'
import { useAppDispatch } from '../../app/hooks'

export const SeatsInput: React.FC = () => {
  const history = useHistory()
  const [seatsCount, setSeatsCount] = useState('1')
  const checkboxEl = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()

  const handleSaveData = (): void => {
    const nextToOthers = checkboxEl?.current?.checked ?? false
    const counter = Number(seatsCount)
    dispatch(setSeatsData({ counter, nextToOthers }))
    history.push('/seats')
  }

  return (
    <>
      <VStack m={'auto'}>
        <InputGroup w={'auto'}>
          <InputLeftAddon>Liczba miejsc</InputLeftAddon>
          <NumberInput min={1} max={20} value={seatsCount} onChange={(val) => setSeatsCount(val)}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </InputGroup>
        <Checkbox ref={checkboxEl}>Miejsca obok siebie?</Checkbox>
        <Button onClick={handleSaveData}>Wybierz miejsca</Button>
      </VStack>
    </>
  )
}
