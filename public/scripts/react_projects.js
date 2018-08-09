'use strict';

const e = React.createElement;

class ViewProjectButton extends React.Component {

  constructor(props) {
    super(props); // All react components classes are subclass
    this.state = { clicked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

// Render
const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(ViewProjectButton), domContainer);