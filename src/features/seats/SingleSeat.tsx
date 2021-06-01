import React, { useCallback, useState } from 'react'
import { Box } from '@chakra-ui/react'

interface SeatComponentProps {
  reserved: boolean
  selected: boolean
  seatId?: string
}

export const SingleSeat: React.FC<SeatComponentProps> = ({ reserved, seatId, selected }) => {
  const [isSelected, setIsSelected] = useState(selected)
  const handleClick = useCallback((): void => {
    if (reserved) {
      console.log(seatId)
    } else {
      setIsSelected(!isSelected)
    }
  }, [isSelected, reserved, seatId])

  return (
    <>
      <Box
        onClick={handleClick}
        w={{ base: '5vw', sm: '4vw', md: '3vw', lg: '2.5vw', xl: '2vw' }}
        h={{ base: '5vw', sm: '4vw', md: '3vw', lg: '2.5vw', xl: '2vw' }}
        bg={isSelected ? 'orange' : reserved ? 'red' : 'green'}
        border={2}
        borderRadius={6}
        borderColor={'white'}
        m={'5px'}
      />
    </>
  )
}
