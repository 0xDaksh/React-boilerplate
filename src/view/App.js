import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Home from './routes/Home'
import 'normalize.css'

export default class App extends React.Component {
	render() {
		return (
			<div>
				<BrowserRouter>
					<div>
						<Route path="/" exact component={Home} />
					</div>
				</BrowserRouter>
			</div>
		)
	}
} 