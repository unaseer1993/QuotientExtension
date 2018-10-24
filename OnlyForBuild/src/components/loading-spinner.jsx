import React, { Component  , Fragment} from 'react';

export default class LoadingSpinner extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        nocss: false
       
      };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
     nocss : nextProps.nocss
    });
  } 

  render () {
  
    return (
      <Fragment>
      { this.state.nocss &&   <div>
      <img width="32" height="32" src={'images/spinner.gif'} alt="loading-spinner" />
    </div>}
    {!this.state.nocss && <div className="loading-overlay">
      <img width="32" height="32" src={'images/spinner.gif'} alt="loading-spinner" />
    </div> }
    </Fragment>
    
    );
  }
}
