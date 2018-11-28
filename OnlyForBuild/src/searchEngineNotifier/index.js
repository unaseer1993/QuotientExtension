/*global browser*/
/*global chrome*/

import React from 'react';
import ReactDOM from 'react-dom';
import Notifire from './notifier';
import  decodeUriComponent from 'decode-uri-component';
import couponsService from '../services/couponService';

// browser.storage.local.get(['s'], (items)=> {
//     if(!items.s){
    render();
// }});

function render (){
   
    const app = '<div class="notifire"></div>';
    let element = getSlector();
    if (element){
        console.log(element);
        for(let i=0;i<element.length;i++){
            let hostname = element[i].hostname;
            element[i].insertAdjacentHTML('afterBegin', app );
            if(hostname==='r.search.yahoo.com'){
                hostname=filterYahooUrl(element[i].href);
            }
            couponsService.fetchCashbackCouponByMerchant(hostname).then((res)=>{
                if(res.data.data[0] && res.data.data[0].merchantId){
                    const id= res.data.data[0].merchantId;                   
                            const cb = res.data.data[0].cashbackPercentage;
                            ReactDOM.render(<Notifire cB ={cb} />, document.getElementsByClassName('notifire')[i] );
            
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
function filterYahooUrl(url){
    let filter = decodeUriComponent(url);
    //var myRe = new RegExp('RU=(.*)Rk');
    var href = filter.substring(filter.indexOf("RU=")+3, filter.indexOf("RK"));;
    let a = getLocation(href);
    console.log(a.hostname);
    return a.hostname;
}
function getTabUrl(){
var url = getLocation(window.location.href);
return url.hostname;
}

function getSlector(){
const tabURl= getTabUrl();

console.log(tabURl);
if (tabURl.indexOf("www.google.com")>=0){
return document.querySelectorAll(".rc .r a");
}
else if(tabURl.indexOf("yahoo.com")>=0){
    return document.querySelectorAll("#web h3.title a");
}
else{
  return null;
}
}
