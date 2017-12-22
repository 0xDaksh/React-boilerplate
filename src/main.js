import React from 'react'
import ReactDOM from 'react-dom'
import App from './view/App'
import injectServiceWorker from './injectSW'

ReactDOM.render(<App />, document.getElementById('app'))
injectServiceWorker()