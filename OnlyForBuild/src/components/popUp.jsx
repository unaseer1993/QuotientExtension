import React, { Component, Fragment } from "react";
// import axios from 'axios';
import Search from "./search";
import Footer from "./footer";
import LogoHeader from "./logoHeader";
import Items from "./items";
import CashbackRow from "./cashbackRow";
import RecentlyVistedItem from "./recentlyVistedItem";
import Coupons from "./coupons";
import Login from "./login";
import { CDN } from "../../utils/urls";
import Error from "./error.jsx";
import LoadingSpinner from "./loading-spinner";
import InfiniteScroll from 'react-infinite-scroller';
import axios from "axios";
import API from "../services/api";
import CouponService from "../services/couponService"
/*global safari*/

class PopUp extends React.Component {
  constructor(props) {
    super(props);
    this.fetchMoreDeals = this.fetchMoreDeals.bind(this);
    this.fetchMoreMerchants = this.fetchMoreMerchants.bind(this);
    this.state = {
      coupons: [],
      isloading: true,
      last: false,
      pageNumber: 0,
      id:0,
      activated:"",
      couponId:0,
      isDisable:"false"
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      coupons: nextProps.coupons,
      isloading: false,
      last: nextProps.last,
      id:nextProps.id,
      pageNumber: nextProps.pageNumber,
      activated:nextProps.activated,
      couponId:nextProps.couponId
    });
  }
  componentDidMount() {
    this.setState({ isloading: true });
    CouponService.fetchIsUSA()
         .then(res => {   
        this.setState({ isDisable : res.data.data });
          });
  //  window.addEventListener('scroll', function () {console.log(window.scrollX, window.scrollY)})
  }

  merchantItemClicked(Merchantid,activated,couponId){
    const currentUnixTimeStamp = Math.round((new Date()).getTime() / 1000);
    var activatedlinks = [];
  
         if(activated !== "Loading..." && activated !== "Cashback Activated" && activated !== "Available Coupons" && couponId > 0)
         {
                  var actiii = false;
    if(localStorage.getItem('activatedlinks')!==null)
          {
            activatedlinks = JSON.parse(localStorage.getItem('activatedlinks'));
                  for (var i = 0; i < activatedlinks.length; i++) {
 if (activatedlinks[i] == Merchantid)
 {
     actiii = true;
     break;
 }
}
if(!actiii)
{
  activatedlinks.push(Merchantid);
} 
          
          }
          else{
            activatedlinks.push(Merchantid);
          }
     localStorage.setItem('activatedlinks',JSON.stringify(activatedlinks)); 
             
                      

let url = 'https://codesapi.coupons.com/couponapi/coupons/redirectUrl/web?couponId='+couponId+'&consumerId=1';
      const self = this;
    this.setState({
      isloading: true
    });
    const config = { headers: {'Content-Type': 'application/json'  , 
        'X-LOCATION-TIME':`${API.getTodaysDate()} ${API.getFormattedTime(currentUnixTimeStamp)}`
      } };
   // axios.put(url,'', config)
    CouponService.fetchRedirectURl(couponId)
    .then(response => {
      this.setState({
        isloading: false
      });
      safari.self.hide();
        var newURL = response.data.data.redirectUrl;
        var targetWin = safari.application.activeBrowserWindow;
        targetWin.openTab().url = newURL;

    })
    .catch(function (response) {
      this.setState({
        isloading: false
      });
    });
  }
}

  fetchMoreDeals() {
    const self = this;
    const page = this.state.pageNumber + 1;
    const currentUnixTimeStamp = Math.round((new Date()).getTime() / 1000);
    // axios.get("https://codesapi.coupons.com/token/")
    // .then(res => {
    //  var token = res.data.data;
    //  if(token == null || token == undefined)
    //  {
    //    token = ""
    //  }
    //  localStorage.setItem('token',token);
    // axios
    //   .get(
    //     `https://codesapi.coupons.com/couponapi/coupons/max_cashback_coupons/pages/web/?page=` +
    //       page +
    //       `&size=10`,  {
    //         headers: {
    //           'Authorization':token,
    //           'X-LOCATION-TIME':`${API.getTodaysDate()} ${API.getFormattedTime(currentUnixTimeStamp)}`
    //         }}
            
    //         // `https://codesapi.pdn.coupons.com/couponapi/coupons/max_cashback_coupons/pages/web/?page=` +
    //     //   page +
    //     //   `&size=10`
    //   )
      CouponService.fetchCashbackCoupons(page)
      .then(res => {
        const coupons = res.data.data.content;
        //   const pageNumber = res.data.data.pageable.pageNumber;
        //   const last = res.data.data.last;
        //console.log(res);
        localStorage.setItem("a", JSON.stringify(coupons)); //chane this into chrome.storage.local api
        self.setState({
          coupons: this.state.coupons.concat(res.data.data.content),
          pageNumber: res.data.data.pageable.pageNumber,
          last: res.data.data.last,
          isloading: false
        });
      })
      .catch(error => {
        console.log("catching Error");
        let couponsdata = localStorage.getItem("a");
        self.setState({ coupons: JSON.parse(couponsdata) });
        //console.log(error.response)
      });
    // })
    // .catch(error => {});

    // CouponService.fetchDeals(page + 1)
    //   .then((res) => {
    //     this.setState({
    //       coupons: this.state.coupons.concat(res.data.data.content),
    //       page: res.data.data.pageable.pageNumber,
    //       isLoading: false,
    //       hasMore: !res.data.data.last
    //     });
    //   });
  }

   fetchMoreMerchants() {
      const self = this;
    const page = this.state.pageNumber + 1;
    const currentUnixTimeStamp = Math.round((new Date()).getTime() / 1000);
        // axios
        //   .get(
        //    // "https://codesapi.pdn.coupons.com/couponapi/coupons/search/pages/merchant?title=&merchant=" +
        //      "https://codesapi.coupons.com/couponapi/coupons/search/pages/merchant?title=&merchant=" +
        //        this.state.id +
        //         "&page=" +page+"&size=10&sort=isCashback,desc&sort=endDate,desc"
        //         ,{
        //           headers: {
        //             'X-LOCATION-TIME':`${API.getTodaysDate()} ${API.getFormattedTime(currentUnixTimeStamp)}`
        //           }}
        //   )
        if (this.state.id !== undefined) {
          CouponService.fetchCouponsByMerchants(page,this.state.id)
          .then(res => {
            const coupons = res.data.data.content;
           
            localStorage.setItem("a", JSON.stringify(coupons)); 
            this.setState({
              coupons: this.state.coupons.concat(res.data.data.content),
              pageNumber: res.data.data.pageable.pageNumber,
              last: res.data.data.last,
              loader:false,
              isloading:false
            });
          })
          .catch(error => {
            console.log("catching Error");
            let couponsdata = localStorage.getItem("a");
            this.setState({ coupons: JSON.parse(couponsdata) });
            //console.log(error.response)
          });
        }
    
      }

  render() {
    const isLoading = this.state.isloading;
    const coupons = this.state.coupons;
    const chk = this.props.chk;
    const id = this.state.id;
    const last = this.state.last;
var activated = this.state.activated;
const couponId = this.state.couponId;
    // const activated= this.props.activated;
    // const type=this.props.type;
    if(this.state.isDisable === "true") {
        if(activated !== 0)
          {
              activated = "Activate " +activated +"% Cashback";
          }
        else if (activated == 0)  
          {
              activated = "Available Coupons"
          }
        else
          {
              activated = "Loading...";
          }
    }
    else {
      activated = "Available Coupons"
    }

    if (chk === 1) {
      if (!coupons) {
        return [<Fragment>{!coupons && <Error />}</Fragment>];
      } else {
   
        if (
          typeof safari.application.activeBrowserWindow.activeTab.url !==
          "undefined"
        ) {
          
          var activatedlinks = [];
          if (localStorage.getItem("activatedlinks") !== null) {
            activatedlinks = JSON.parse(localStorage.getItem("activatedlinks"));
            var actiii = false;
            for (var i = 0; i < activatedlinks.length; i++) {
              if (activatedlinks[i] == id) {
             activated = "Cashback Activated";
                var iconUri =
                  safari.extension.baseURI + "Icons/icon-activated@2x.png";
                safari.extension.toolbarItems[0].image = iconUri;
                safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
                  "activated",
                  id
                );
                actiii = true;
                break;
              }
            }
            if (!actiii) {
              //activated = "Available Coupons";
              var iconUri =
                safari.extension.baseURI + "Icons/icon-available@2x.png";
              safari.extension.toolbarItems[0].image = iconUri;
           
              safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
                "normal",
                id
              );
            }
          } else {
          //  activated = "Available Coupons";
            var iconUri =
              safari.extension.baseURI + "Icons/icon-available@2x.png";
            safari.extension.toolbarItems[0].image = iconUri;
         
            safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
              "normal",
              id
            );
          }
        }

        return [
          <Fragment>
          <LogoHeader src="images/logo.png"/>
<div className="hidden-flow">
              <div className="cashback-row-activated">
              <div className="top-logo">
                <img
                  src={CDN + id + "_large.png"}
                  alt={id}
                  onError={e => {
                    e.target.src = "index.png";
                  }}
                />
              </div>
              <div onClick={()=>{this.merchantItemClicked(id,activated,couponId)}} class="cashback-row-activated-inner-btn">{activated}</div>
            </div></div>
          <div className="main-content best-deals-container zero-padding">
           {isLoading && <LoadingSpinner />}
            <div className="inner-container">
                         
                         
                         <InfiniteScroll
        pageStart={0}
        loadMore={this.fetchMoreMerchants}
        hasMore={!last}
         loader={!isLoading && <div className="loader" key={0}>Loading ...</div>}
        useWindow={false} >
            <Coupons coupons={coupons}  />

             </InfiniteScroll>
       
            </div>
          </div>
          <Footer />
          </Fragment>
        ];
      }
    } else if (chk === 2) {
      if (!coupons) {
        return [!coupons && <Error />];
      } else {
        return [
          <LogoHeader src="images/logo.png"/>,
<div><CashbackRow/>
          <div className="main-content all-container" id="overlay">
            {isLoading && <LoadingSpinner />}
            <div className="search-box">
              <Search />
            </div>
            <RecentlyVistedItem />
            <div>
              <h2 class="recent-store-heading before-after">
                <span>Best Deals </span>
              </h2>
            </div>
              <InfiniteScroll
        pageStart={0}
        loadMore={this.fetchMoreDeals}
        hasMore={!last}
        loader={!isLoading && <div className="loader" key={0}>Loading ...</div>}
        useWindow={false}
    >
     
 
              <Items coupons={coupons}/>
             </InfiniteScroll>
          </div>
          </div>,
          <Footer />
        ];
      }
    } else if (chk === 3) {
      if (
        typeof safari.application.activeBrowserWindow.activeTab.url !==
        "undefined"
      ) {
        safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
          "logout",
          "logout"
        );
      }
      return [<LogoHeader src="images/logo.png"/>, <Login />, <Footer />];
    }
  }
}

export default PopUp;
