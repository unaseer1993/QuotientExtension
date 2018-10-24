/*global browser*/
/*global safari*/
import React from 'react';
import { REDIRECTION,CDN } from '../../utils/urls'
import axios from 'axios';
import LoadingSpinner from './loading-spinner';
import API from "../services/api";

class MerchantItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: false,
    };
  }
  

  merchantItemClicked(url,merchantId){
    const currentUnixTimeStamp = Math.round((new Date()).getTime() / 1000);
   
  //  var link = new URL(this.state.results[i].domainUrl);
    var activatedlinks = [];   
           
  //  var urlhostt= safari.application.activeBrowserWindow.activeTab.url;
  //               var pathArray = urlhostt.split( '/' );
  //               var host = pathArray[2];
    var actiii = false;
    if(localStorage.getItem('activatedlinks')!==null)
          {  
            activatedlinks = JSON.parse(localStorage.getItem('activatedlinks'));
               for (var i = 0; i < activatedlinks.length; i++) {
 if (activatedlinks[i] == merchantId)
 {
actiii = true;
break;
 }
}
if(!actiii)
{
    activatedlinks.push(merchantId);
} 
         
          }
          else
          {
            activatedlinks.push(merchantId);
          }
                localStorage.setItem('activatedlinks',JSON.stringify(activatedlinks));    
                      
          


    const self = this;
  this.setState({
    isloading: true
  });
  const config = { headers: {'Content-Type': 'application/json' ,
  'Authorization': localStorage.getItem('token'),
  'X-LOCATION-TIME':`${API.getTodaysDate()} ${API.getFormattedTime(currentUnixTimeStamp)}`
}};
console.log(url);
  axios.put(url,'', config).then(response => {
    self.setState({
      isloading: false
    });
    safari.self.hide();
      var newURL = response.data.data.redirectUrl;
      var targetWin = safari.application.activeBrowserWindow;
      targetWin.openTab().url = newURL;

  })
  .catch(function (response) {
    console.log(response);
    self.setState({
      isloading: false
    });
  });

  }
    render() {
        const title = this.props.title;
        const isLoading = this.state.isloading;
        const percantage = this.props.percantage;
        const merchantId = this.props.merchantId;
        const couponId=this.props.couponId;
       
        const url='https://codesapi.coupons.com/couponapi/coupons/redirectUrl/web?couponId='+couponId+'&consumerId=1';
      //   const url='https://codesapi.pdn.coupons.com/couponapi/coupons/redirectUrl/web?couponId='+couponId+'&consumerId=1';
        var linkStyle = {
            textDecoration: 'none'
          };




        return ([
          <div>
          {this.props.couponType !=="In-store" &&
            <a onClick={()=>{this.merchantItemClicked(url,merchantId )}}  style={linkStyle} class="cursor">
            { isLoading &&
              <LoadingSpinner />
            }
            <div className="cash-back-product-row">
                <div className="cash-back-product best-deal">
                    <div className="product-logo">


                    {/* if coupon is deal then couponId_deal
                    else if coupon is in_store then couponid_instore
                    else merchantid_deal */}

                        <img class="logo-images" src={CDN+merchantId+"_large.png"} alt={merchantId} onError={(e) => { e.target.src = "index.png" }} />
                    </div>
                    <div className="product-detail">
                        <div> {title} </div>
                        <div className="product-btn">Up to {percantage}% Cash Back</div>
                    </div>
                </div>
            </div>
            </a>
          }
          </div>
        ])
    }
}


export default MerchantItem;
