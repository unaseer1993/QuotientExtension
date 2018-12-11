/*global chrome*/
/*global safari*/
import React from "react";
import PopUp from "./popUp";
import CouponService from "../services/couponService"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coupons: [],
      chk: 3,
      filterText: "",
      id: 0,
      activated: 0,
      couponId:0,
      last: false,
      pageNumber: 0
    };
  }

  componentDidMount() {
    var result;
    var merchantID;
    let chkResult;

    var self = this;
    var userId =localStorage.getItem("userId");
    if (userId!== null ) {
        result = localStorage.getItem("chk");
        merchantID = localStorage.getItem("id");
    } else {
      result = 3;
    }

    var activatedlinks = [];

  

    if (result === "1") {
      chkResult = 1;
    } else if (result === "2") {
      chkResult = 2;
    } else {
      chkResult = 3;
    }

    this.setState({ chk: chkResult}, () => {
    
      if (self.state.chk == 2) {      
        CouponService.fetchCashbackCoupons(0)
          .then(res => {
            const coupons = res.data.data.content;
            localStorage.setItem("a", JSON.stringify(coupons)); //chane this into chrome.storage.local api
            self.setState({
              coupons: res.data.data.content,
              pageNumber: res.data.data.pageable.pageNumber,
              last: res.data.data.last
            });
          })
          .catch(error => {
            console.log("catching Error");
            let couponsdata = localStorage.getItem("a");
            self.setState({ coupons: JSON.parse(couponsdata) });
          });

      } else if (self.state.chk == 1) {
        CouponService.fetchMaxCashBackCouponByMercahat(merchantID)
        .then(res => {
        if(res.data.data.cashbackPercentage !== undefined)
        {
        this.setState({activated:res.data.data.cashbackPercentage,
          couponId:res.data.data.id
        });
      }
        }).catch(error => {
        this.setState({activated:0});
        });
        this.setState({ id: merchantID }, () => {
          self.setState({ id: merchantID });
            CouponService.fetchCouponsByMerchants(0,self.state.id)
            .then(res => {
              let coupon = res.data.data;
              localStorage.setItem("b", JSON.stringify(coupon))
              self.setState({
                coupons: res.data.data.content,
                pageNumber: res.data.data.pageable.pageNumber,
                last: res.data.data.last
              });
       
            })
            .catch(error => {
              let couponsdata = localStorage.getItem("b");
              self.setState({ coupons: JSON.parse(couponsdata) });
            });
        });
      } 
    });


  }

  render() {
    return (
      <PopUp
        coupons={this.state.coupons}
        chk={this.state.chk}
        id={this.state.id}
        pageNumber={this.state.pageNumber}
        last={this.state.last}
        activated= {this.state.activated}
        couponId = {this.state.couponId}
      />
    );
  }
}

export default App;
