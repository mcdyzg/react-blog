import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import RaisedButton from 'material-ui/lib/raised-button';
import Snackbar from 'material-ui/lib/snackbar';
import {remove} from '../actions'
import {Link} from 'react-router'
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  fontFamily:'Microsoft Yahei',
});


class ArticleList extends React.Component {
	constructor(props,context) {
		super(props,context)
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state={
			open:false,
		}
	}


	mouseUp=()=> {
		this.props.remove((res)=> {
			if(res=='已删除') {
				this.setState({
		    	open:true,
		    })
			}
		})
    
	};

	handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

	render() {
		const {article}=this.props
		return (
			<div style={{border:'1px solid #e0e0e0',backgroundColor:'#fff',maxWidth:1000,position:'relative',margin:'30px auto 20px auto'}}>

				<Link to='/admin/add'>
					<FloatingActionButton
						mini={true}
						backgroundColor='#62D262' 
						secondary={false} 
						style={{position:'absolute',top:'-20px',left:'52px'}}>
			      <ContentAdd />
			    </FloatingActionButton>
				</Link>
				<MuiThemeProvider muiTheme={muiTheme}>
					<RaisedButton 
						onMouseUp={this.mouseUp}
						label="清空所有文章" 
						secondary={true} 
						style={{position:'absolute',right:12,top:12}} />
				</MuiThemeProvider>
				<Table wrapperStyle={{marginTop:48}}>
			    <TableHeader>
			      <TableRow>
			      	<TableHeaderColumn>title</TableHeaderColumn>
			      	<TableHeaderColumn>auth</TableHeaderColumn>
			      	<TableHeaderColumn>intro</TableHeaderColumn>
			      	<TableHeaderColumn>time</TableHeaderColumn>
			      </TableRow>
			    </TableHeader>
			    <TableBody>
			    	{
			    		article.map((item)=> {
			    			return <TableRow key={item._id}>
								        <TableRowColumn>{item.title}</TableRowColumn>
								        <TableRowColumn>{item.auth}</TableRowColumn>
								        <TableRowColumn>{item.intro}</TableRowColumn>
								        <TableRowColumn>{item.time}</TableRowColumn>
								      </TableRow>
			    		})
			    	}
			    </TableBody>
			  </Table>
			  <Snackbar
          open={this.state.open}
          message="文章已清空"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
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
	mapStateToProps,
	{remove}
	)(ArticleList)


					// <RaisedButton 
					// 	label="写一篇文章" 
					// 	secondary={true} 
					// 	style={{margin:12}} />