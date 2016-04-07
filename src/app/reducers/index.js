import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import article from './article.js'
import onearticle from './onearticle.js'
import category from './category.js'
import categoryList from './categoryList.js'


const rootReducer = combineReducers({
	categoryList,
	category,
	onearticle,
  article,
  routing
})

export default rootReducer
