import React from 'react'
import LeftNav from 'material-ui/lib/left-nav'
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
import {
  Colors,
  Spacing,
  Typography,
} from 'material-ui/lib/styles';
import Avatar from 'material-ui/lib/avatar';
import Divider from 'material-ui/lib/divider';
import a from '../../www/img/6.jpg'
import b from '../../www/img/5.png'
// const a =require('../../www/img/6.jpg')  也可以
import { connect } from 'react-redux'
import {Link} from 'react-router'

const SelectableList=SelectableContainerEnhance(List);

class AppLeftNav extends React.Component {
	constructor(props,context) {
		super(props,context)
	}

	static contextTypes={
		color:React.PropTypes.string,
	}

	componentWillReceiveProps(nextProps){
		
	}

	getStyles() {
		return {
			logo:{
				height:this.props.height,
        cursor: 'pointer',
        fontSize: 14,
        color: Typography.textFullWhite,
        // lineHeight: Spacing.desktopKeylineIncrement + 'px',
        // fontWeight: Typography.fontWeightLight,
        backgroundColor: this.context.color,
        paddingLeft: Spacing.desktopGutter,
        marginBottom: 8,
        backgroundImage:'url('+a+')',
        backgroundSize:'cover',
        boxShadow:' 0 3px 10px rgba(0,0,0,0.16), 0 3px 10px rgba(0,0,0,0.23)',
			},
		};
	}

	render() {
		const {
			onRequestChangeList,
			onRequestChangeLeftNav,
			width,
			docked,
			open,
		} = this.props;

		const style=this.getStyles();
		// console.log(this.props.category)
		const {category} =this.props
		return (
			<LeftNav 
				width={width}
				docked={docked}
				open={open}
				onRequestChange={
					onRequestChangeLeftNav
				}
			>
				<div style={style.logo}>
					<Avatar 
						src={b}
						style={{marginTop:21,height:'66px',width:'66px',}} />
					<div style={{marginTop:'5px'}}>
						mcdyzg
					</div>
					<div style={{marginTop:'5px'}}>
						https://github.com/mcdyzg
					</div>
				</div>
				<SelectableList
					valueLink={{
						value:location.pathname,
						// requestChange:
						// 	onRequestChangeList,
					}}
				>
					<Link to='/app/list'>
						<ListItem
							// value='/app/list'
							primaryText='博文列表'
							leftAvatar={
				        <Avatar
				          color={'#03A9F4'}
				          backgroundColor={'transparent'}
				        >
				          B
				        </Avatar>
				      }
						/>
					</Link>
					{
						category.map((item)=> {
							return <Link 
											to={{pathname:'/app/categorylist',query:{name:item.name}}}
											key={item._id}>
											<ListItem
												key={item._id}
												// value='/app/list'
												primaryText={item.name}
												leftAvatar={
									        <Avatar
									          color={'#03A9F4'}
									          backgroundColor={'transparent'}
									        >
									          {item.name.substr(0,1)}
									        </Avatar>
									      }
											/>
										 </Link>
						})
					}
					
				</SelectableList>
			</LeftNav>
			);
	}
}

function mapStateToProps(state) {
	return {
		category:state.category
	}
}

export default connect(
  mapStateToProps
)(AppLeftNav)
