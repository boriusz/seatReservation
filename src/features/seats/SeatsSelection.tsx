import React, { useEffect, useState } from 'react'
import { Flex, Box, Grid, GridItem, HStack, Spinner, Button } from '@chakra-ui/react'
import { SingleSeat } from './SingleSeat'
import type { ISeat } from './inputSeatsSlice'
import { RootState } from '../../app/store'
import { useHistory } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { removeAllSeats, selectSeat } from './selectSeatsSlice'
import { IncompleteDataModal } from '../../components/IncompleteDataModal'
import { automaticSeatSelection } from '../../automaticSeatSelection'

export const SeatsSelection: React.FC = () => {
  const history = useHistory()

  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const [seats, setSeats] = useState<ISeat[]>([])
  const [maxX, setMaxX] = useState<number>(0)
  const [maxY, setMaxY] = useState<number>(0)

  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false)

  const userSeatsData = useAppSelector((state: RootState) => ({
    counter: state.inputSeats.counter as number,
    nextToOthers: state.inputSeats.nextToOthers as boolean,
  }))
  const selectedSeats = useAppSelector((state: RootState) => state.selectSeats.selected as ISeat[])

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(removeAllSeats())
  }, [dispatch])

  useEffect(() => {
    if (seats.length > 0) {
      const selected = automaticSeatSelection({
        allSeats: seats,
        numOfSeats: userSeatsData.counter,
        adjacent: userSeatsData.nextToOthers,
      })
      selected.forEach((seat) => dispatch(selectSeat({ seat })))
    }
  }, [seats, dispatch, userSeatsData.counter, userSeatsData.nextToOthers])

  useEffect(() => {
    if (userSeatsData.counter === null) {
      history.replace('/')
    }
  }, [history, userSeatsData])

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
        console.log(e)
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
    return <Box>Error:{JSON.stringify(error)}</Box>
  }

  if (!isLoaded) {
    return <Spinner />
  }

  return (
    <>
      <IncompleteDataModal
        expected={userSeatsData.counter}
        got={selectedSeats.length}
        visible={isAlertVisible}
        onClick={() => setIsAlertVisible(false)}
      />
      <Flex w={'100%'} justify={'center'} align={'center'} direction={'column'}>
        {selectedSeats.length}/{userSeatsData.counter}
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
                <SingleSeat
                  selected={selectedSeats.some((s) => s.id === seat.id)}
                  reserved={seat.reserved}
                  seat={seat}
                />
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
            {/*These props are to make them look as mentioned in description, and also not to make them selectable by user*/}
            <SingleSeat reserved={false} selected={false} clickable={false} /> Miejsca wolne
            <SingleSeat reserved={true} selected={false} clickable={false} /> Miejsca zarezerwowane
            <SingleSeat reserved={false} selected={true} clickable={false} /> Twój wybór
            <Button
              variant={'outline'}
              mx={2}
              onClick={() => {
                if (selectedSeats.length === userSeatsData.counter) history.push('summary')
                else setIsAlertVisible(true)
              }}
            >
              <Box fontSize={{ base: '11px', md: '16px' }}>Rezerwuj</Box>
            </Button>
          </Flex>
        </HStack>
      </Flex>
    </>
  )
}
