/*global safari*/
import React from 'react';
import LoadingSpinner from './loading-spinner';
import CouponService from "../services/couponService"
import {activateLink} from "../../utils/methods"

class CouponsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: false,
      cbId : 0
    };
  }

  prevent(e) {
    e.preventDefault();
  }

  merchantItemClicked(id,couponType,Merchantid){
    var consumerId = localStorage.getItem('userId')
    const currentUnixTimeStamp = Math.round((new Date()).getTime() / 1000);
    const self = this;
    this.setState({
      isloading: true
    });
    
     CouponService.fetchIsUSA()
     .then(response => {
       if (response.data.data === "true") {
            if(couponType)
             {
              if(localStorage.getItem('userId') !== null) {
                       this.setState ({cbId :localStorage.getItem('userId') });
              }
              activateLink(Merchantid)
            }
          }
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
              self.setState({
               isloading: false
               });
            });
          });          


      
   
  }

    render() {
  const isLoading = this.state.isloading;
        const title = this.props.title;
        const percentage = this.props.percentage;
        const id = this.props.id;
          const type=this.props.type;
        const code=this.props.code;
        const date=this.props.date;
        const exclusive=this.props.exclusive;
        const couponType = this.props.CouponType;
        const hideExpirationDate = this.props.hideExpirationDate;



        var linkStyle = {
            textDecoration: 'none'
          };
              return (
            <a   style={linkStyle}  class="cursor">
            { isLoading &&
              <LoadingSpinner />
            }
            
            <div className="cash-back-product-row cash-back-page-dark-style ">
                <div onClick={()=>{this.merchantItemClicked(id,couponType,this.props.Merchantid)}} className="cash-back-product cash-back-deal no-border top-bottom-zero">
                {type !== 'Deal' &&
                    <div className="product-logo">

                        <div className="off-sale">
                            {type}
                    </div>


                        <div className="off-title">

                        </div>


                    { exclusive ==='Exclusive' &&
                        <div className="exclusive">
                            {exclusive}
                        </div>
                        }

                    </div>
                }
               
                    {type === 'Deal' &&

                        <div className="product-logo">
                        <img src={"https://quotientmedia.blob.core.windows.net/mediacontainer/"+id+"_deal.png"} alt={id} onError={(e) => { e.target.src = "index.png" }} />

                        { exclusive ==='Exclusive' &&
                        <div className="exclusive">
                            {exclusive}
                        </div>}

                        </div>
                    }

                    <div className="heading-detail">
                        <div className="product-heading">{title}</div>
                        {this.props.CouponType===true &&
                        <div className="cash-back-percentage">
                          {percentage}% Cash Back
                    </div>
                      }
                       <div className="cashback-bottom-content-row">
                   { !hideExpirationDate &&
                    <div className="date">   Ends: {date}  </div>}
                    <div className="day margin-left-25" onClick="prevent"> {code}  </div>
                    <a onClick={()=>{this.merchantItemClicked(id,couponType,this.props.Merchantid )}} className="click-save"></a>
                </div>
                    </div>
                
               
            </div>
            </div>
            </a>
        );
    }

}

export default CouponsItem;
