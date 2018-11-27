/*global safari*/
import React from 'react';

class RecentlyVistedBox extends React.Component {

  recentItemClicked(url){

      safari.self.hide();
      var newURL = url;
      var targetWin = safari.application.activeBrowserWindow;
      targetWin.openTab().url = newURL;

  }

        render(){
           var id=this.props.id;
           var link = this.props.link;
           var linkStyle = {
            textDecoration: 'none'
          };
         // console.log(this.state.link);
            return ([
               <a onClick={()=>{this.recentItemClicked(link)}} class='recent-item'>
                <div className="recent-store">
                    <img src={"https://quotientmedia.blob.core.windows.net/mediacontainer/"+id+"_large.png"} alt={id} onError={(e) => { e.target.src = "index.png" }}/>
                     <div className="up-to">

                    </div>
                    <div className="recent-store-cash-back" >
                        Get Cash Back
                    </div>
                </div>
                </a>
            ]);
        }

}

export default  RecentlyVistedBox;
