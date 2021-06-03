import React from 'react'
import { Box, ListItem, UnorderedList, Heading, Text, Link, Flex } from '@chakra-ui/react'
import { useAppSelector } from '../app/hooks'
import { RootState } from '../app/store'
import { ISeat } from '../features/seats/slices/inputSeatsSlice'
import { Link as RouterLink } from 'react-router-dom'

export const Summary: React.FC = () => {
  const selectedSeats = useAppSelector((state: RootState) => {
    const s: ISeat[] = JSON.parse(JSON.stringify(state.selectSeats.selected as ISeat[]))
    return s.sort((a, b) => {
      if (a.cords.y === b.cords.y) {
        return a.cords.x > b.cords.x ? 1 : -1
      } else {
        return a.cords.y > b.cords.y ? 1 : -1
      }
    })
  })
  const expectedNumOfSeats = useAppSelector((state: RootState) => state.inputSeats.counter)

  if (selectedSeats.length > 0 && selectedSeats.length === expectedNumOfSeats) {
    return (
      <Box
        direction={'column'}
        align={{ base: 'flex-start', md: 'center' }}
        justify={'center'}
        fontSize={{ base: '14px', md: '16px' }}
        my={10}
        mx={8}
      >
        <Heading>Twoja rezerwacja przebiegła pomyślnie!</Heading>
        <Flex h={'auto'} w={'100%'} my={2} align={'center'} justify={'center'} direction={'column'}>
          <Text>Wybrane miejsca:</Text>
          <UnorderedList h={'100%'}>
            {selectedSeats.map((s) => {
              return (
                <ListItem key={s.id + 's'}>
                  Rząd {s.cords.y + 1}, miejsce {s.cords.x + 1}.
                </ListItem>
              )
            })}
          </UnorderedList>
        </Flex>
        <Text align={{ base: 'left', md: 'center' }}>
          Dziękujemy! W razie problemów prosimy o kontakt z działem administracji.
        </Text>
      </Box>
    )
  } else {
    return (
      <Box w={'60%'}>
        <Heading fontSize={{ base: '16px', sm: '20px', md: '22px', lg: '24px', xl: '28px' }}>
          Rezerwacja miejsc nie powiodła się,{' '}
          <Link as={RouterLink} cursor={'pointer'} to={'/'}>
            spróbuj ponownie
          </Link>
          , lub skontaktuj się z administratorem.
        </Heading>
      </Box>
    )
  }
}
