'use strict';


const e = React.createElement;

// Define component
class ViewProjectButton extends React.Component {

  constructor(props) {
    super(props); // All react components classes are subclass
    this.state = { clicked: false };
    this._id = props.projectId; 
  }

  openProject(e){
    e.preventDefault();

    // TODO: open modal 
    

    // Make API call 
    // https://stackoverflow.com/questions/17216438/chain-multiple-then-in-jquery-when
    
    var getProject = function(_id){
      if (_id === undefined){
        console.error("attempted to get project with empty id");
        return;
      }
      return $.ajax({
        url: "/api/projects/" + _id,
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

    // +++++++++++++++++++++
    // +++++++++++++++++++++
    // CHAIN

    getProject(this._id)
    .then((data) => showProject(data))
    .done(makeReqTest);

    // +++++++++++++++++++++
    // +++++++++++++++++++++
 
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
        id={this.props.projectId}
        onClick={(e) => this.openProject(e)}>
        view project
      </a>
    );
  } // end: render()


}


// ----------------------------
// ----------------------------
// Place it
// ----------------------------
// ----------------------------

const buttonList = document.querySelectorAll('.view-button-container');

for(let i=0; i<buttonList.length; i++){
  // grab id
  var projectId = buttonList[i].getAttribute("id");

  // render
  ReactDOM.render(<ViewProjectButton projectId={projectId}/>, buttonList[i]);   
}

