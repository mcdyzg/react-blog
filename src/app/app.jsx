import React from 'react'
import 'babel-polyfill'
import ReactDOM from 'react-dom'
import {Router ,browserHistory} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { syncHistoryWithStore } from 'react-router-redux'
import AppRoutes from './app-routes'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import { getAllArticle,getAllCategory } from './actions'
injectTapEventPlugin();

const store =configureStore()
const history=syncHistoryWithStore(browserHistory,store)

store.dispatch(getAllArticle())
store.dispatch(getAllCategory())

ReactDOM.render(
     <Provider store={store}>
       <div>
         <Router history={history} routes={AppRoutes} onUpdate={() => window.scrollTo(0,0)} />
       </div>
     </Provider>,document.getElementById('app')
	)

