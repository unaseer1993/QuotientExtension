/*global safari*/
/*global chrome*/

import React from 'react';
import ReactDOM from 'react-dom';
import Notifire from './notifier';
import merchantService from '../services/merchantService';
import couponsService from '../services/couponService';
import $ from 'jquery';
import axios from 'axios'
import API from "../services/api";



render();

function render (){
    const app = document.createElement('div');
    const currentUnixTimeStamp = Math.round((new Date()).getTime() / 1000);
    let element = getSlector();
    app.className = 'notifire'; 
    console.log(element);
    if (element){

    element.prepend(app);
        for(let i=0;i<element.length;i++){
            // axios
            // .get(
            //   "https://codesapi.coupons.com/couponapi/coupons/max_cashback_coupon/domain_url?domainUrl="+element[i].hostname,  {
            //       headers: {
            //         'X-LOCATION-TIME':`${API.getTodaysDate()} ${API.getFormattedTime(currentUnixTimeStamp)}`
            //       }})
            couponsService.fetchCashbackCouponByMerchant(element[i].hostname)
             .then((res)=>{
                console.log(element[i].hostname);
                console.log(res);
                if(res.data.data[0] && res.data.data[0].merchantId){
                    const id= res.data.data[0].merchantId;
                    //couponsService.fetchMaxCashBackCouponByMercahat(id).then((max)=>{
                        //console.log(max);
                        //if(max.data.data && max.data.data[0].cashbackPercentage){
                            const cb = res.data.data[0].cashbackPercentage;
                            ReactDOM.render(<Notifire cB ={cb} />, document.getElementsByClassName('notifire')[i] );
                        //}

                    //});
                }

            });
        
        }
    }

}


function getLocation(url)
{
var a = document.createElement('a');
a.href = url;
return a
}

function getTabUrl(){
var url = getLocation(window.location.href);
return url.hostname;
}

function getSlector(){
const tabURl= getTabUrl();

console.log(tabURl);
if (tabURl.indexOf("www.google.com")>=0){
return $(".rc .r a");
}
else if(tabURl.indexOf("www.bing.com")>=0)
return $(".b_algo h2 a");

else if(tabURl.indexOf("yahoo.com")>=0){
return $("#web h3.title a");

}
else{
  return null;
}
}
