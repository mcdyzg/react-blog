import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import request from 'superagent'
import {connect } from 'react-redux'
import {findonearticle} from '../actions'
import Paper from 'material-ui/lib/paper'
import '../../www/scss/Article.scss' 
import Avatar from 'material-ui/lib/avatar'
import marked from 'marked'
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  fontFamily:'Microsoft Yahei',
});

class Article extends React.Component {
	constructor(props,context) {
		super(props,context)
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
	}

	componentDidMount() {
		// request
		// 	.get('http://localhost:3004/findarticle')
		// 	.query({_id:this.props.location.query._id})
		// 	.end(function(err,res) {
		// 		console.log(res.body)
		// 	})
		this.props.findonearticle(this.props.location.query._id)

	}

	render() {
		const {onearticle}=this.props
		// console.log(onearticle.auth)
		const content=onearticle.content?onearticle.content:''
		return (
			<div style={{backgroundColor:'#EEEEEE',overflow:'hidden',padding:'0 30px'}}>
				<MuiThemeProvider muiTheme={muiTheme}>
					<Paper className='article-paper' style={{margin:'35px auto 20px auto',maxWidth:1000}} zDepth={1}>
						<header className='head'>
							<Avatar
								className='pic'
					    	style={{fontSize:16}}
						   	color='#fff'
							  backgroundColor='#F57C00'>
							  {onearticle.auth?onearticle.auth.substr(0,1):''}
							</Avatar>
							<div className='title'> 
								{onearticle.title?onearticle.title:''}
							</div>
							<div className='subtitle'> 
								{onearticle.auth} 发表在 {onearticle.category} --{onearticle.time}
							</div>
						</header>
						<div className='content'>
							<div className='markdown-body' dangerouslySetInnerHTML={{__html:marked(marked(content)) }} />
						</div>
					</Paper>
				</MuiThemeProvider>
			</div>
			)
	}
}

function mapStateToProps(state) {
  return {
    onearticle: state.onearticle
  }
}

export default connect(
	mapStateToProps,
	{findonearticle}
	)(Article)
