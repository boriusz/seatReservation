import React from 'react'
import { SeatsInput } from './features/seats/SeatsInput'
import { Route, Switch } from 'react-router-dom'
import { SeatsSelection } from './features/seats/SeatsSelection'
import { Flex } from '@chakra-ui/react'
import { Summary } from './components/Summary'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <Flex align={'center'} justify={'center'} h={'100%'}>
      <Switch>
        <Route exact path={'/'}>
          <SeatsInput />
        </Route>
        <Route path={'/seats'}>
          <SeatsSelection />
        </Route>
        <Route path={'/summary'}>
          <Summary />
        </Route>
      </Switch>
    </Flex>
  )
}

export default App
