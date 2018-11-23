/*global safari*/
import React from 'react';
import axios from 'axios';
import CouponService from "../services/couponService"
import couponService from '../services/couponService';
import ReportService from "../services/reportService";
import CommissionService from "../services/commissionService"
import {userProfile} from "../../utils/urls"

class CashbackRow extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
            coupons: [], 
            consumerCashbackBalance : 0,
            consumerCashbackPending : 0,
            isDisable : false
          }
        }
        componentDidMount() {
       
        var userId;
        if(localStorage.getItem('userId')!==null)
        {
userId = localStorage.getItem('userId');
        }
        else
        {
            userId = "1";
        }

       
couponService.fetchIsUSA()
         .then(res => {   
        this.setState({ isDisable : res.data.data });
          });
        

        ReportService.fetchCashbackDetailsbyId(userId)
       //   axios.get(`https://codesapi.coupons.com/reportapi/consumer/cashback/details?consumerId=` +userId)
       // axios.get(`https://codesapi.pdn.coupons.com/reportapi/consumer/cashback/details?consumerId=` + userId)
         .then(res => {
        var couponcashbackbalance = res.data.data.consumerCashbackBalance;
        if (couponcashbackbalance !== undefined) { 
          this.setState({ consumerCashbackBalance : Number(couponcashbackbalance).toFixed(2) });
        }
        else {
          this.setState({ consumerCashbackBalance : 0.00 });
        }

        
          });

          // axios.get("https://codesapi.coupons.com/token/")
          // .then(res => {
          //  var token = res.data.data;
          //  if(token == null || token == undefined)
          //  {
          //    token = ""
          //  }
          // axios.get(`https://codesapi.coupons.com/commissionapi/commission/processingCommission/web/` +userId
          // ,  {
          //   headers: {
          //     'Authorization':token
          //   }})
          CommissionService.fetchCashbackProcessingById(userId)
          // axios.get(`https://codesapi.pdn.coupons.com/reportapi/consumer/cashback/details?consumerId=` + userId)
            .then(res => {
              
           var couponprocesscashback = res.data.data.inProcessCashbackAmount;
        
           if (couponprocesscashback !== undefined) {
           this.setState({ consumerCashbackPending : Number(couponprocesscashback).toFixed(2) });
           }
           else {
            this.setState({ consumerCashbackPending : 0.00 });
           }
             });
          //  });
        }

    profileClicked(){
      safari.self.hide();
      // "https://codesapi.coupons.com/coupon-codes/user/cashback-rewards/1"
      var newURL = userProfile;
      var targetWin = safari.application.activeBrowserWindow;
      targetWin.openTab().url = newURL;
    }

// {this.state.consumerCashbackBalance}

// {this.state.consumerCashbackPending}
    render() {
        return (
        <div className="cashback-row cashback-row-dark-theme" >
        {this.state.isDisable==="false" &&
             <div class="account-page-country-limit page-content">
        <div class="account-page-show-country-restrict">Cash Back only available for US residents</div>
            </div> }
            <div class="cursor" onClick={this.profileClicked} >
                 <span>{this.state.consumerCashbackBalance}</span>
                <span class="light-font">Cash Back Balance</span>
                <div class="cashback-tracking-text-subtitle">
                    Transferred monthly to your <br/> PayPal account
                </div>
            </div>
            <div class="cursor" onClick={this.profileClicked}>
                 <span>{this.state.consumerCashbackPending}</span>
                <span class="light-font">Cash Back Processing </span>
                <div class="cashback-tracking-text-subtitle">
                &nbsp;
                </div>
            </div>
        </div>

        )


    }
}

export default CashbackRow;
