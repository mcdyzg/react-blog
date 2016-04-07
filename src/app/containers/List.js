import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router'

// import MobileTearSheet from '../../../MobileTearSheet';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Subheader from 'material-ui/lib/Subheader';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  fontFamily:'Microsoft Yahei',
});

class artlcleList extends React.Component {
	constructor(props,context) {
		super(props,context)
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
	}

	render() {
		const {article}=this.props
		// console.log(this.props.article)
		return (
			<div style={{backgroundColor:'#EEEEEE',overflow:'hidden',padding:'0 30px'}}> 
				<div style={{backgroundColor:'#fff',boxShadow: '0 1px 6px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.12)',margin:'35px auto 20px auto',maxWidth:1000}}>
					<List style={{paddingBottom:20}}>
						<Subheader>New Blog</Subheader>
					{
						article.map((item)=> {
							return (
								<Link to={{pathname:'/app/article',query:{_id:item._id}}} key={item._id}>
									<MuiThemeProvider muiTheme={muiTheme}>
									<ListItem
					          leftAvatar={
					          	<Avatar
					          		style={{borderRadius:'50%',fontSize:20,lineHeight:'48px',height:50,width:50}}
						          	color='#fff'
							          backgroundColor='#03A9F4'>
							          {item.auth.substr(0,1)} 
							        </Avatar>}
					          primaryText={
					          	<p>
					          		<span style={{color: '#333'}}>{item.title}</span>
					          		<span style={{float:'right',color: 'rgba(0, 0, 0, 0.541176)'}}>{item.time}</span>
					          	</p>

					          }
					          secondaryText={
					            <p>
					              <span style={{color: '#333'}}>{item.auth} 发表在 {item.category}</span> --
					              {item.intro}
					            </p>
					          }
					          secondaryTextLines={2}
					        />
					      	</MuiThemeProvider>
					        <Divider inset={true} />
					      </Link>
				        )
						})
					}
		      </List>
		    </div>
			</div>
			)
	}
}

function mapStateToProps(state) {
  return {
    article: state.article
  }
}

export default connect(
  mapStateToProps
)(artlcleList)
