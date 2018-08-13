'use strict';


const e = React.createElement;

// Define component
class ViewProjectButton extends React.Component {

  constructor(props) {
    super(props); // All react components classes are subclass
    this.state = { clicked: false };
  }

  openProject(e){
    e.preventDefault();
    console.log("project id: " + this.props.projectId);

    // TODO: open modal

    // Make API call 
    // https://stackoverflow.com/questions/17216438/chain-multiple-then-in-jquery-when
    /*.ajax({...}).then(function(){
        return $.ajax({...});
    }).then(function(){
        return $.ajax({...});
    }).then(function(){
        return $.ajax({...});
    }).then(function(){
        return $.ajax({...});
    });*/
   

    // 

  }

  render() {

    // example using React.createElement()
    // Use this method if you have trouble using JSX

    /*return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    ); */
    
    return (
      <a 
        class="view-button project" 
        href="#"
        onClick={(e) => this.openProject(e)}>
        view project
      </a>
    );
  }
}

// Place it
const domTarget = document.querySelector('.button-container');
console.log(domTarget);

ReactDOM.render(<ViewProjectButton projectId='1'/>, domTarget);