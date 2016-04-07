import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router'

// import MobileTearSheet from '../../../MobileTearSheet';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import {findcategoryarticlelist} from '../actions'
import Subheader from 'material-ui/lib/Subheader';

class CategoryList extends React.Component {
	constructor(props,context) {
		super(props,context)
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
	}
 
	componentWillReceiveProps(nextProps) {
		if(!this.props.categoryList[nextProps.location.query.name]){
			nextProps.findcategoryarticlelist(nextProps.location.query.name)
		}
	}

	componentDidMount() {
		if(!this.props.categoryList[this.props.location.query.name]){
			this.props.findcategoryarticlelist(this.props.location.query.name)
		}
	}

	render() {
		const {categoryList}=this.props
		// console.log(categoryList)
		const catelist=categoryList[this.props.location.query.name]
		return ( 
			<div style={{backgroundColor:'#EEEEEE',overflow:'hidden',padding:'0 30px'}}> 
				<div style={{backgroundColor:'#fff',boxShadow: '0 1px 6px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.12)',margin:'35px auto 20px auto',maxWidth:1000}}>
					<List style={{paddingBottom:20}}>
						<Subheader>New Blog</Subheader>
					{
						catelist?catelist.map((item)=> {
							return (
								<Link to={{pathname:'/app/article',query:{_id:item._id}}} key={item._id}>
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
					        <Divider inset={true} />
					      </Link>
				        )
						}):<div>正在加载</div>
					}
		      </List>
		    </div>
			</div>
			)
	}
}

function mapStateToProps(state) {
  return {
    categoryList: state.categoryList
  }
}

export default connect(
  mapStateToProps,
  {findcategoryarticlelist}
)(CategoryList)
