import React, { useEffect, useState } from 'react'
import { Flex, Grid, GridItem, HStack, Spinner } from '@chakra-ui/react'
import { SingleSeat } from './SingleSeat'
import { ISeat, setSeatsData } from './seatsSlice'
import { RootState } from '../../app/store'
import { useHistory } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'

export const SeatsSelection: React.FC = () => {
  const history = useHistory()

  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

  const [seats, setSeats] = useState<ISeat[]>([])
  const [maxX, setMaxX] = useState(0)
  const [maxY, setMaxY] = useState(0)

  const seatsData = useAppSelector((state: RootState) => ({
    counter: state.seats.counter as number,
    nextToOthers: state.seats.nextToOthers as boolean,
  }))

  useEffect(() => {
    if (seatsData.counter === null) {
      history.replace('/')
    }
    return () => {
      setSeatsData([])
    }
  }, [seatsData])

  useEffect(() => {
    const fetchAPIData = async (): Promise<void> => {
      try {
        const result: ISeat[] = await (await fetch('http://localhost:4000/seats')).json()
        if (result) {
          const allX = result.map((s) => s.cords.x)
          const allY = result.map((s) => s.cords.y)
          setMaxX(Math.max(...allX))
          setMaxY(Math.max(...allY))

          setIsLoaded(true)
          setSeats(result)
        }
      } catch (e) {
        setIsLoaded(true)
        setError(e)
      }
    }
    fetchAPIData().then()
    return () => {
      setSeats([])
    }
  }, [])
  if (error) {
    return (
      <>
        <div>Error:</div>
        {error}
      </>
    )
  }
  if (!isLoaded) {
    return <Spinner />
  }

  if (seats) {
    return (
      <Flex w={'100%'} justify={'center'} align={'center'} direction={'column'}>
        {seatsData.counter}
        {seatsData.nextToOthers ? 'true' : 'false'}
        <Grid
          templateRows={`repeat(${maxY + 1}, 1fr)`}
          templateColumns={`repeat(${maxX + 1}, 1fr)`}
          w={{ base: '80%', sm: '60%', md: '45%', lg: '40%', xl: '25%' }}
          gridGap={'2px'}
          gridColumnGap={'2px'}
        >
          {seats.map((seat) => {
            return (
              <GridItem
                key={seat.id}
                colStart={seat.cords.x + 1}
                rowStart={seat.cords.y + 1}
                w={'auto'}
              >
                <SingleSeat reserved={seat.reserved} seatId={seat.id} selected={false} />
              </GridItem>
            )
          })}
        </Grid>
        <HStack mt={'20px'}>
          <Flex
            direction={'row'}
            justify={'center'}
            align={'center'}
            fontSize={{ base: '11px', md: '16px' }}
          >
            <SingleSeat reserved={false} selected={false} /> Miejsca wolne
            <SingleSeat reserved={true} selected={false} /> Miejsca zarezerwowane
            <SingleSeat reserved={false} selected={true} /> Twój wybór
          </Flex>
        </HStack>
      </Flex>
    )
  }
  return null
}
