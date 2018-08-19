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

    var viewProject = function(){

      return $.ajax({
        url: "/api/projects/5b68e89afb6fc06162438a2e",
        data: '',
        dataType: 'json',
        method: "GET",
        beforeSend: function( xhr ) {
          //xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
        }
      });

    }// end: viewProject()

    var showProject = function(data){
      if (!data){
        console.error("No data recieved to display project");
        return;
      }

      console.log("Project object retrieved");
      console.log(data);



    }


    var makeReqTest = function(){
      return $.ajax({
        url: "/projects/test/",
        data: '',
        method: "GET",
        beforeSend: function( xhr ) {
          //xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
        }
      })
      .done(function( data ) {
        if ( console && console.log ) {
          if (data.hasOwnProperty("message")){
            console.log(data.message);
          }
        }
      });
    } // end: makeReq()

    var sayDone = function(){
      console.log("Everything done");
    }

    viewProject()
    .then((data) => showProject(data))
    .done(makeReqTest);
 
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
  } // end: render()


}

// Place it
const domTarget = document.querySelector('.view-button-container');
console.log(domTarget);

ReactDOM.render(<ViewProjectButton projectId='1'/>, domTarget);