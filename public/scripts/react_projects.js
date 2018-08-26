
//import anime from 'animejs';
'use strict';

const e = React.createElement;


class Modal extends React.Component {

  // Constructor
  constructor(props){
    super(props);
    this.state = { open: false };
    this.selectors = {
      lightbox: ".lightbox",
      modal: ".lightbox .modal"
    };
    this.node_lightbox;
    this.node_modal;

    this.modalTimeline;
  }

  componentDidMount(){
    console.log("mounting...");
    //set animation
    this.node_lightbox = document.querySelector(this.selectors['lightbox']);
    // this.node_lightbox.hidden = true; //this keeps element's hitbox
    //this.node_lightbox.style.display = "none"; //have to remember previous style
    //this.node_lightbox.style.visibility  = "hidden";
    this.node_modal = document.querySelector(this.selectors['modal']);

    //aniamtion
    this.modalTimeline = anime.timeline({
      autoplay: false
    });

    this.modalTimeline
    .add({ //darken lightbox
      targets: this.node_lightbox,
      opacity: [0,1],
      easing: 'easeOutExpo',
      duration: 300

    })
    .add({ //show modal
      targets: this.node_lightbox.querySelector('.modal'),
      translateY: [-50, 0],
      easing: 'easeOutExpo',
      //elasticity: 500,
      offset: 0, //should start at same time
      duration: 300
    });


  }
    


  openModal(){
    this.node_lightbox.style.pointerEvents = "auto";
    //this.node_modal.style.pointerEvents = "auto";
    this.modalTimeline.restart();
    this.modalTimeline.play();
    

    this.promise = this.modalTimeline.finished.then(() => {
      console.log("Animation done!");
    });

  }

  closeModal(e){
    e.preventDefault();
    e.stopPropagation();
    this.node_lightbox.style.pointerEvents = "none";
    //this.modalTimeline.restart();
    this.modalTimeline.play();
    this.modalTimeline.reverse();

  }

  // The Render function
  render(){
    return (
      <div className="lightbox" onClick={(e) => this.closeModal(e)}>
        <div className="modal" onClick={e => {e.stopPropagation();}}>
          <div className="header">
            <span className="projectName"></span>
            <span className="close" onClick={e => this.closeModal(e)}>Close</span>
          </div>
          <div className="content">{this.props.content}</div>

          <div className="footer"></div>
        </div> 
      </div>
      
    );
  } // end: render() 
} 


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
    r_modal.openModal();

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

      ReactDOM.render(data.html, document.querySelector('.modal .content'));
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
        className="view-button project" 
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
  ReactDOM.render(<ViewProjectButton projectId={projectId} modal_obj={r_modal}/>, buttonList[i]);
}

// render
// ReactDOM.render() returns a reference to the component being mounted.
// Parent.forceUpdate()
const r_modal = ReactDOM.render(<Modal testprop="2"/>, document.querySelector('body .reactModal'));

