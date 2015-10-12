import React from 'react';

export default class EventForm extends React.Component {
	render() {
		return (
			<form>
				<div>
					<label>Title</label>
					<input ref="title" type="text" placeholder="" />
				</div>
				<div>
					<label>Description</label>
					<input ref="title" type="text" placeholder="" />
				</div>
				<div>
					<label>Image</label>
					<input ref="title" type="file" placeholder="" />
				</div>
				<div>					
					<input onSubmit={this.handleSubmit} ref="title" type="submit" value="Submit"/>
				</div>												
			</form>
		);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		alert('submit');
	}
}