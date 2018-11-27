/*global safari*/
import React from 'react';
import ConsumerService from "../services/consumerService" 
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
        
//userId
          ConsumerService.fetchCashbackDetailsbyId(1214)
         .then(res => {
        var couponcashbackbalance = res.data.data.consumerCashbackBalance;
        if (couponcashbackbalance !== undefined) { 
          this.setState({ consumerCashbackBalance : Number(couponcashbackbalance).toFixed(2) });
        }
        else {
          this.setState({ consumerCashbackBalance : 0.00 });
        }

        
          });
//userId
          ConsumerService.fetchCashbackProcessingById(1214)
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
      var newURL = userProfile;
      var targetWin = safari.application.activeBrowserWindow;
      targetWin.openTab().url = newURL;
    }

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
