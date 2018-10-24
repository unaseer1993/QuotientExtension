/*global chrome*/
/*global safari*/
import React from "react";
import axios from "axios";
import PopUp from "./popUp";
import Login from "./login";
import API from "../services/api";

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
    //alert(API.getFormattedTime(currentUnixTimeStamp));

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
      // alert(this.state.chk);
//chkResult
      if (self.state.chk == 2) {
        axios.get("https://codesapi.coupons.com/token/")
 .then(res => {
  var token = res.data.data;
  if(token == null || token == undefined)
  {
    token = ""
  }
  // localStorage.setItem('token',res.data.data)
        var iconUri = safari.extension.baseURI + "Icons/icon@2x.png";
        safari.extension.toolbarItems[0].image = iconUri;
        axios
          .get(
         // `https://api.pdn.netpace.net/couponapi/coupons/max_cashback_coupons/pages/web/?page=0&size=10`
         `https://codesapi.coupons.com/couponapi/coupons/max_cashback_coupons/pages/web/?page=0&size=10`
                ,{
                  headers: {
                    'Authorization':token,
                    'X-LOCATION-TIME':`${API.getTodaysDate()} ${API.getFormattedTime(currentUnixTimeStamp)}`
                  }}
          )
          .then(res => {
            const coupons = res.data.data.content;
            // const pageNumber = res.data.data.pageable.pageNumber;
            // const last = res.data.data.last;
            //console.log(res);
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
            //console.log(error.response)
          });
        })
        .catch(error => {
       
           });
      } else if (self.state.chk == 1) {
        var iconUri = safari.extension.baseURI + "Icons/icon-available@2x.png";
        safari.extension.toolbarItems[0].image = iconUri;
//merchantID

axios.get('https://codesapi.coupons.com/couponapi/coupons/max_cashback_coupon/web/' +merchantID
,{
  headers: {
    'X-LOCATION-TIME':`${API.getTodaysDate()} ${API.getFormattedTime(currentUnixTimeStamp)}`
  }})
.then(res => {
//alert(JSON.stringify(res.data.data.cashbackPercentage));
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
//alert(JSON.stringify(error));
this.setState({activated:0});
});
        this.setState({ id: merchantID }, () => {
          // self.setState({ id: merchantID });
          axios
            .get(
             // "https://codesapi.pdn.coupons.com/couponapi/coupons/search/pages/merchant?title=&merchant=" +
             "https://codesapi.coupons.com/couponapi/coupons/search/pages/merchant?title=&merchant=" +
                self.state.id +
                 "&page=0&size=10&sort=isCashback,desc&sort=endDate,desc"
                 ,{
                  headers: {
                    'X-LOCATION-TIME':`${API.getTodaysDate()} ${API.getFormattedTime(currentUnixTimeStamp)}`
                  }}
                //  ,{
                //   headers: {
                //     'X-LOCATION-TIME':'2018-10-02 09:55:00+0400' 
                //   }}
            )
            .then(res => {
              //console.log(res);
              let coupon = res.data.data;
              //console.log(res.data);
              localStorage.setItem("b", JSON.stringify(coupon));
            //  self.setState({ coupons: coupon });
              self.setState({
                coupons: res.data.data.content,
                pageNumber: res.data.data.pageable.pageNumber,
                last: res.data.data.last
              });
       
            })
            .catch(error => {
              let couponsdata = localStorage.getItem("b");
              self.setState({ coupons: JSON.parse(couponsdata) });
              console.log("catching Error");
              //console.log(error.response)
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
    // console.log("redering: "+this.state.id);

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
