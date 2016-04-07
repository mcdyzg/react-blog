import React from 'react'
import {Route,Redirect,IndexRoute,IndexRedirect} from 'react-router'
import App from './components/App.jsx'
// import Lesson from './components/Lesson.js'
import List from './containers/List.js'
import CategoryList from './containers/CategoryList.js'
// import Webpack from './components/Webpack.js'
import Add from './containers/Add.js'
import Master from './components/Master.js'
import AdminWrap from './components/AdminWrap.js'
import ArticleList from './containers/ArticleList.js'
import Article from './containers/Article.js'
import Category from './containers/Category.js'




const AppRoutes=(
	<Route path='/' component={Master}>
		<IndexRedirect to='app'/>
		<Route path='app' component={App}>
			<IndexRoute component={List}/>
			<Route path='list' component={List}/>
			<Route path='article' component={Article}/>
			<Route path='categorylist' component={CategoryList}/>
		</Route>
		
		<Route path='admin' component={AdminWrap}>
			<IndexRoute component={ArticleList}/>
			<Route path='add' component={Add}/>
			<Route path='list' component={ArticleList}/>
			<Route path='category' component={Category}/>
		</Route>
	</Route>
	)

export default AppRoutes

