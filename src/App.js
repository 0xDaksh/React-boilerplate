import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './routes/Home'
import NotFound from './routes/NotFound'

class App extends Component {
  render() {
    return (
      <div>
		  <BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="*" component={NotFound} />
			</Switch>
		  </BrowserRouter>
      </div>
    );
  }
}

export default App
