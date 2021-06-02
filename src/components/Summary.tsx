import React from 'react'
import { Flex, Box, ListItem, UnorderedList, Heading, Text, Link } from '@chakra-ui/react'
import { useAppSelector } from '../app/hooks'
import { RootState } from '../app/store'
import { ISeat } from '../features/seats/inputSeatsSlice'
import { Link as RouterLink } from 'react-router-dom'

export const Summary: React.FC = () => {
  const selectedSeats = useAppSelector((state: RootState) => state.selectSeats.selected as ISeat[])
  const expectedNumOfSeats = useAppSelector((state: RootState) => state.inputSeats.counter)

  if (selectedSeats.length > 0 && selectedSeats.length === expectedNumOfSeats) {
    return (
      <Flex
        direction={'column'}
        align={{ base: 'flex-start', md: 'center' }}
        justify={'center'}
        height={'60%'}
        mx={8}
      >
        <Heading>Twoja rezerwacja przebiegła pomyślnie!</Heading>
        <Box h={'60%'} mt={'auto'}>
          Wybrane miejsca:
          <UnorderedList>
            {selectedSeats.map((s) => {
              return (
                <ListItem key={s.id}>
                  Rząd {s.cords.y + 1}, miejsce {s.cords.x + 1}.
                </ListItem>
              )
            })}
          </UnorderedList>
        </Box>
        <Text>Dziękujemy! W razie problemów prosimy o kontakt z działem administracji.</Text>
      </Flex>
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
