/*global browser*/
/*global safari*/
import React from 'react';
import { REDIRECTION,CDN } from '../../utils/urls'
import axios from 'axios';
import LoadingSpinner from './loading-spinner';
import API from "../services/api";
import CouponService from "../services/couponService"


class MerchantItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: false,
      isUs : "false" ,
      cbId : 0
    };
  }
  componentDidMount() {
    CouponService.fetchIsUSA()
    .then(response => { 
   
      this.setState({isUs : response.data.data})
  });
  }
  

  merchantItemClicked(id,merchantId){

    const currentUnixTimeStamp = Math.round((new Date()).getTime() / 1000);
   
    var activatedlinks = [];   
    var actiii = false;
    // CouponService.fetchIsUSA()
    // .then(response => {
      if (this.state.isUs === "true") {
        if(localStorage.getItem('userId') !== null) {
          this.setState ({cbId :localStorage.getItem('userId') });
        }
      
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
        }
    //  }); 

    const self = this;
  this.setState({
    isloading: true
  });
  // alert(this.state.cbId);

CouponService.fetchRedirectURl(id,this.state.cbId)
  .then(response => {
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
       
      var linkStyle = {
            textDecoration: 'none'
          };




        return ([
          <div>
          {this.props.couponType !=="In-store" && percantage!==0 &&
            <a onClick={()=>{this.merchantItemClicked(couponId,merchantId )}}  style={linkStyle} class="cursor">
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
