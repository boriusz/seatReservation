import React from 'react'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton } from '@chakra-ui/react'

interface IncompleteDataModalProps {
  expected: number
  got: number
  visible: boolean
  onClick: () => void
}

export const IncompleteDataModal: React.FC<IncompleteDataModalProps> = ({
  expected,
  got,
  visible,
  onClick,
}) => {
  if (visible) {
    return (
      <Alert
        status={'error'}
        position={'fixed'}
        top={'10%'}
        mx={'auto'}
        w={'50%'}
        variant={'solid'}
      >
        <AlertIcon />
        <Box flex={1}>
          <AlertTitle>Błąd przy wprowadzaniu danych</AlertTitle>
          <AlertDescription>
            Wybrano o {expected - got}{' '}
            {expected - got === 1
              ? 'miejsce'
              : expected - got > 1 && expected - got < 5
              ? 'miejsca'
              : 'miejsc'}{' '}
            za mało, wybierz resztę, lub zmień ilość
          </AlertDescription>
        </Box>
        <CloseButton position={'absolute'} right={'8px'} top={'8px'} onClick={onClick} />
      </Alert>
    )
  }
  return null
}
