/*global safari*/
import React from 'react';
import axios from 'axios';

class RecentlyVistedBox extends React.Component {

  recentItemClicked(url){

      safari.self.hide();
      var newURL = url;
      var targetWin = safari.application.activeBrowserWindow;
      targetWin.openTab().url = newURL;

  }

   /*  constructor(props){
        /* super(props);
        this.state={
            link: ''
        }

    } */
    /* componentWillMount(){

        /* axios.get('http://websvc.westus.cloudapp.azure.com/merchantapi/'+this.props.id)
        .then(res => {
            let merchant = res.data.data;
            console.log(merchant.domainUrl);
            this.setState({link: merchant.domainUrl});

        }).catch(error => {});


    } */
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
