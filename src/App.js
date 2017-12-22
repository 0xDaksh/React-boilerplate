import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './routes/Home'

class App extends Component {
  render() {
    return (
      <div>
		  <BrowserRouter>
			<div>
				<Route exact path="/" component={Home} />
			</div>
		  </BrowserRouter>
      </div>
    );
  }
}

export default App
