import React from 'react'
import { SeatsInput } from './features/seats/SeatsInput'
import { Route, Switch } from 'react-router-dom'
import { SeatsSelection } from './features/seats/SeatsSelection'
import { Flex } from '@chakra-ui/react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <Flex align={'center'} justify={'center'} h={'100%'}>
      <Switch>
        <Route exact path={'/'}>
          <SeatsInput></SeatsInput>
        </Route>
        <Route path={'/seats'}>
          <SeatsSelection></SeatsSelection>
        </Route>
        <Route path={'/summary'}>
          <div>Podsumowanie</div>
        </Route>
      </Switch>
    </Flex>
  )
}

export default App
