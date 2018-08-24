'use strict';

const e = React.createElement;

class Modal extends React.Component {

	// Constructor
	constructor(props){
		super(props);
		this.state = { open: false };
    	//this._id = props.projectId; 
	}

	// Custom functions


 
	// The Render function
	render(){
		return (
			<div class="lightbox">
				<div class="modal">
	      	<div class="header">{this.props.projectName}</div>
	      	<div class="content">{this.props.content}</div>

	      	<div class="footer">This is footer</div>
      	</div> 
			</div>
      
    );
	} // end: render() 
} 

// The syntax highlighter for babel kind of sucks on sublime
ReactDOM.render(<Modal testprop="2"/>, document.querySelector('body .reactModal'));  