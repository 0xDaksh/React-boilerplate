import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Home from './routes/home'
import About from './routes/about'

export default class App extends React.Component {
	render() {
		return (
			<div>
				<BrowserRouter>
					<div>
						<Route path="/" exact component={Home} />
						<Route path="/about" component={About} />
						<Link to='/'>
							Home Page.
						</Link>
						<Link to='/about'>
							About Page.
						</Link>
					</div>
				</BrowserRouter>
			</div>
		)
	}
} 