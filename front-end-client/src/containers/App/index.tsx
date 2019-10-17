/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import HomePage from '../Home'

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`

export default function App() {
  return (
    <AppWrapper>
      <Helmet titleTemplate="%s - React.js Boilerplate" defaultTitle="React.js Boilerplate">
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/:groupID" component={HomePage} />
        {/* <Route path='/features' component={FeaturePage} />
        <Route path='' component={NotFoundPage} /> */}
      </Switch>
    </AppWrapper>
  )
}
