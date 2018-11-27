/*global browser*/
/*global safari*/
import React from 'react';
import couponService from '../services/couponService';
import {HELP_URL,BASE_URL} from '../../utils/urls'

class Footer extends React.Component {

 constructor(props) {
        super(props);
        this.state = {
      islogout:false,
      isDisable:false
        }
   

    }
     componentWillMount() 
     {
         var logout = localStorage.getItem('userEmail');
         if(logout==null)
         {
this.setState({ islogout : true})
         }
       

     }
     componentDidMount() {
        couponService.fetchIsUSA()
        .then(res => {   
       this.setState({ isDisable : res.data.data });
         });
     }

    settingClicked() {
        safari.self.hide();
         var targetWin = safari.application.activeBrowserWindow.openTab();
         targetWin.url = safari.extension.baseURI + 'build/settings.html';

        }

        helpClicked(){
          safari.self.hide();
          var newURL = HELP_URL;
          var targetWin = safari.application.activeBrowserWindow;
          targetWin.openTab().url = newURL;

        }
        signout()
        {
             safari.self.hide();
                 localStorage.removeItem('a');
          localStorage.removeItem('b');
          localStorage.removeItem('redirected');
          localStorage.removeItem('chk');
          localStorage.removeItem('id');
          localStorage.removeItem('stack');
          localStorage.removeItem('userEmail');
        localStorage.setItem('userStatus',0);
        localStorage.removeItem('activated');
        localStorage.removeItem('activatedlinks');
        var newURL = BASE_URL;
        var targetWin = safari.application.activeBrowserWindow;
        targetWin.openTab().url = newURL;

        window.location.reload();
        }


    render() {
        const islogout = this.state.islogout;
        const isDisable = this.state.isDisable;
        return (
            <footer>
                <a onClick={this.settingClicked} class="cursor">
                    <img src="images/settings.png" alt="Settings" class="cursor"/> Settings</a>
              { this.state.isDisable === "true" &&  <a onClick={this.helpClicked} class="cursor">
                    <img src="images/help.png" alt="Help"/> Help</a> }
                    { !islogout &&
                <a onClick={this.signout} class="cursor">
                    <img src="images/sign-out.png" alt="Logout"/> Logout</a>
                    }
                    
            </footer>
        );
    }
}



export default Footer;
