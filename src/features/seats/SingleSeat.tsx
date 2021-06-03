import React, { useCallback, useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectSeat, removeSeat } from './slices/selectSeatsSlice'
import { ISeat } from './slices/inputSeatsSlice'
import { RootState } from '../../app/store'

interface SeatComponentProps {
  reserved: boolean
  selected: boolean
  seat?: ISeat
  clickable?: boolean
}

export const SingleSeat: React.FC<SeatComponentProps> = ({
  reserved,
  selected,
  seat,
  clickable = true,
}) => {
  const dispatch = useAppDispatch()

  const selectedSeats = useAppSelector((state: RootState) => state.selectSeats.selected as ISeat[])
  const availableSeats = useAppSelector((state: RootState) => state.inputSeats.counter as number)

  const [isSelected, setIsSelected] = useState(selected)

  const handleClick = useCallback((): void => {
    if (!clickable) return
    if (!reserved) {
      if (selectedSeats.some((s) => s.id === seat?.id)) {
        dispatch(removeSeat({ seat }))
      } else {
        if (selectedSeats.length >= availableSeats) return
        dispatch(selectSeat({ seat }))
      }
    }
  }, [clickable, reserved, selectedSeats, seat, dispatch, availableSeats])

  useEffect(() => {
    if (seat?.id) {
      if (selectedSeats.some((s) => s.id === seat.id)) {
        setIsSelected(true)
      } else {
        setIsSelected(false)
      }
    }
  }, [seat?.id, selectedSeats])

  return (
    <Box
      onClick={handleClick}
      cursor={clickable && !reserved ? 'pointer' : undefined}
      w={{ base: '5vw', sm: '4vw', md: '3vw', lg: '2.5vw', xl: '2vw' }}
      h={{ base: '5vw', sm: '4vw', md: '3vw', lg: '2.5vw', xl: '2vw' }}
      bg={isSelected ? 'orange' : reserved ? 'red' : 'green'}
      border={2}
      borderRadius={6}
      borderColor={'white'}
      m={'5px'}
    />
  )
}
