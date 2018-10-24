import React, { Component,Fragment } from 'react';


class Notifier extends Component{
    
    render(){
        const link = 'https://quotientmedia.blob.core.windows.net/quotient-web-assets/images/favicon-ext.ico';
      return([   <Fragment>
            <img src={link} alt="icon" width="16" height="16" />
            <div class='coupons'>{ "Upto " +this.props.cB +"% Cash Back"}</div>
            </ Fragment>
        ])
    }
}

export default Notifier;