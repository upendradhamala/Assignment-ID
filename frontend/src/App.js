import React from 'react'
import Login from './components/Login'
import Home from './components/Home'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' component={Login} exact />
        <Route path='/home' component={Home} exact />
      </Switch>
    </Router>
  )
}

export default App
