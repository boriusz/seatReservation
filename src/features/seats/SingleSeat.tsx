import React, { useCallback, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectSeat, removeSeat } from './selectSeatsSlice'
import { ISeat } from './inputSeatsSlice'
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
        setIsSelected(false)
      } else {
        if (selectedSeats.length >= availableSeats) return
        dispatch(selectSeat({ seat }))
        setIsSelected(true)
      }
    }
  }, [clickable, reserved, selectedSeats, seat, dispatch, availableSeats])

  return (
    <Box
      onClick={handleClick}
      cursor={clickable ? 'pointer' : undefined}
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
