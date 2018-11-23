/*global safari*/
import React from 'react';
import {logoUrl} from '../../utils/urls';


class LogoHeader extends React.Component {
    // constructor(prop){
    //     super(prop);
    // }
    logoclicked()
    {
      safari.self.hide();
      var newURL = "https://couponseast.netpace.co/coupon-codes/";
      var targetWin = safari.application.activeBrowserWindow;
      targetWin.openTab().url = newURL;
    }

    hidePopover(){
      safari.self.hide()
    }

    render() {
        const logoUrl = this.props.src;
        return (
            <header>
                <div className="header-logo cursor" onClick={this.hidePopover} >
                    <a onClick={this.logoclicked}>
                    <img src={logoUrl} alt="logo"/>
                    </a>
                </div>
            </header>
        );
    }
}



export default LogoHeader;
