import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Master extends React.Component {
	constructor(props,context) {
		super(props,context)
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
	}

	render() {
		return (
			<div>
			{React.cloneElement(this.props.children,{key:this.props.location.pathname})}
			</div>
			)
	}
}

