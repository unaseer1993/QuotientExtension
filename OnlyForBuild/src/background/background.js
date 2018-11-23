/*global browser*/
/*global safari*/
// import React from 'react';
import axios from 'axios';
import {MERCHANT_EXIST} from '../../utils/urls'
import MerchantService from '../services/merchantService'

let browser = window.browser || window.safari;
localStorage.setItem('redirected', 0);
// localStorage.setItem('chk', 3);
let id;

let stack = [];
let inRecent=[];

if( localStorage.getItem('stack') !== null)
{
let selectedDomains = localStorage.getItem('stack');
stack = selectedDomains;
 stack = JSON.parse(stack);
for(var i=0; i < stack.length;i++)
{
inRecent.push(stack[i].id);
}
// alert(JSON.stringify(inRecent));

}

/* var filter = {
  url:
  [
    {hostContains: "westus.cloudapp.azure.com"},

  ]
} */


/* browser.webNavigation.onCompleted.addListener(function (result){
  if(result.url.indexOf("http://pubapp.westus.cloudapp.azure.com/coupon-codes/redirect-to-merchant/")>=0){
  //console.log("on comleted"+result.url);
  window.close();
  browser.storage.local.set({'redirected':1});
}
},filter); */



safari.application.addEventListener("activate", handleChange, true);
safari.application.addEventListener("navigate", handleChange, true);
safari.application.addEventListener("beforeNavigate", handleChange, true);



// safari.application.addEventListener("message",getCookies,false);
var cookies = document.cookie;
// alert(cookies);
// alert("wassay");
// safari.self.tab.dispatchMessage("setCookies",cookies);
// var cookies = null;
//
//   function getCookies(incMsg) {
//     cookies = incMsg.message;
//     alert('I received them :) \n\n'+cookies);
//     localStorage.setItem('cookies', cookies);
//   }




function handleChange(){


    var tab = safari.application.activeBrowserWindow.activeTab.url;

  var mer=getHostName(tab);
  if(tab){

  callApi(mer,tab);
}
  else
  {
    localStorage.setItem("chk", 2);
   localStorage.setItem("id", 0);
    window.location.reload();
  }
  // else{
  //    localStorage.setItem("chk", 2);
  //  localStorage.setItem("id", 0);
  // }

}
function callApi(name, link){
  id='';
  //console.log("Name :"+name);

    //localStorage.setItem('chk', 2);

  
if(name==null || name == undefined)
 {
   name = "";
 }


   // axios.get('https://api.pdn.netpace.net/merchantapi/domain_url/exists?domainUrl='+name)
   MerchantService.isMerchantExist(name)
  //axios.get('https://codesapi.coupons.com/merchantapi/domain_url/exists?domainUrl='+name)
    .then(res => {
        let merchant = res.data.data;
        //console.log("Merchent: "+merchant.id+" "+merchant.name);
        window.location.reload()
// alert(merchant.id)
// alert(JSON.stringify(res.data));
        if(merchant!==null && JSON.stringify(merchant) !== "{}" && merchant.id !==undefined){
          id=merchant.id;
          localStorage.setItem('chk',1);
          localStorage.setItem('id', id);
            setRecentlyVisited(id,link);
            
            
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
                safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
                  "activated",
                  id
                );
                actiii = true;
                break;
              }
            }
            if (!actiii) {
              safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
                "normal",
                id
              );
            }
          } else {
            safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
              "normal",
              id
            );
          }
        }

        }
        else{
          localStorage.setItem('chk',2);
localStorage.setItem('id', 0);
        }
    }).catch(error => {
      //alert("error")
  //alert('ye chlayga error wala');
  localStorage.setItem('chk', 2);
  localStorage.setItem('id',0);

    });




}

function getHostName(url)
{
    var a = document.createElement('a');
    a.href = url;
//   var lArray=a.hostname.split(".");
return a.hostname;
   // return lArray[1];
}

function setRecentlyVisited(id, link){
  //console.log("recently visited");
  let merchant = {
    id : 0,
    link : ""
  }
  merchant.id=id;
  merchant.link=link;


  // if(stack.length<=3){
  if(stack == null )
{
  stack.push(merchant);
}
else if( stack.length<=3){
    if(!inRecent.includes(id)){
    stack.push(merchant);
  }

  }
  else if(stack.length>=4){
    let temp = [];
    if(!inRecent.includes(id)){
    //inRecent.push(id);
    temp.push(merchant);
    temp.push(stack.pop());
    temp.push(stack.pop());
    temp.push(stack.pop());
    stack.pop();
    stack=temp.reverse();
    }

  }
localStorage.setItem("stack", JSON.stringify(stack));
}

//browser.runtime.setUninstallURL("https://www.coupons.com/");
