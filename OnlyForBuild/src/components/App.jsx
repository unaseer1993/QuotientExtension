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
      id: 39,
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
    var chkboxvalue = localStorage.getItem("chkbox");
    const currentUnixTimeStamp = Math.round((new Date()).getTime() / 1000);

    if (
      typeof safari.application.activeBrowserWindow.activeTab.url !==
      "undefined"
    ) {
      if (chkboxvalue !== null) {
        if (chkboxvalue == 1) {
          safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
            "message",
            1
          );
        } else {
          safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
            "message",
            0
          );
        }
      } else {
        localStorage.setItem("chkbox", 0);
        safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
          "message",
          0
        );
      }
    }

    var self = this;
    if (localStorage.getItem("userStatus") !== null) {
      if (localStorage.getItem("userStatus") == 1) {
        if (
          typeof safari.application.activeBrowserWindow.activeTab.url !==
          "undefined"
        ) {
          safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
            "userid",
            localStorage.getItem("userEmail")
          );
        }
        result = localStorage.getItem("chk");
        merchantID = localStorage.getItem("id");
      }
    } else {
      result = 3;
    }

    var activatedlinks = [];

    safari.application.addEventListener("message", handleMessage, false);
    function handleMessage(msg) {
      if (msg.name === "activatedlinks") {
        if (localStorage.getItem("activatedlinks") !== null) {
          activatedlinks = JSON.parse(localStorage.getItem("activatedlinks"));
        }
        if (!activatedlinks.includes(msg.message)) {
          activatedlinks.push(msg.message);
        }
        localStorage.setItem("activatedlinks", JSON.stringify(activatedlinks));
        window.location.reload();
      } else if (msg.name === "chkbox") {
        if (msg.message === 1) {
          localStorage.setItem("chkbox", 1);
        } else if (msg.message === 0) {
          localStorage.setItem("chkbox", 0);
        }
      }
    }

    if (result === "1") {
      chkResult = 1;
    } else if (result === "2") {
      chkResult = 2;
    } else {
      chkResult = 3;
    }

    this.setState({ chk: chkResult}, () => {
    
      if (self.state.chk == 2) {
        var iconUri = safari.extension.baseURI + "Icons/icon@2x.png";
        safari.extension.toolbarItems[0].image = iconUri;
     
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
        var iconUri = safari.extension.baseURI + "Icons/icon-available@2x.png";
        safari.extension.toolbarItems[0].image = iconUri;
CouponService.fetchMaxCashBackCouponByMercahat(merchantID)
.then(res => {
if(res.data.data.cashbackPercentage !== undefined)
{
this.setState({activated:res.data.data.cashbackPercentage,
  couponId:res.data.data.id
});
}
else
{

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
      } else {
        {
          var iconUri = safari.extension.baseURI + "Icons/icon@2x.png";
          safari.extension.toolbarItems[0].image = iconUri;
        }
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
