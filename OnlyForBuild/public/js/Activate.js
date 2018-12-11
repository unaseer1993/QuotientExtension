/*global safari*/
if(window === window.top) {
var baseUrl  = "https://codesapiweb.coupons.com";
var isUsUserUrl = "/couponapi/coupons/isUsUser/plugin/"
var domainUrl = "/couponapi/coupons/max_cashback_coupon/domain_url/plugin?domainUrl=";
var couponId = 0;
var id=0;
var userId = 0;
var cashbackPercentage = 0;
var actiivated;
var normal;
var exist;

$( document ).ready(function() {

var link=getTabUrl();
exist=chkMarchent(link);
  safari.self.tab.dispatchMessage('chckActivated',id);
});
 

  $(document).on('click','#later',function(){
    normal.remove();
});



$(document).on('click','#availble-noti',function(){
  var redirectUrl = "/couponapi/coupons/redirectUrl/plugin?couponId="+couponId+"&consumerId=" +userId;
  let request =  baseUrl + redirectUrl;
   let header =  ajaxTokenHandler(redirectUrl,"","PUT");
  var rUrl = $.ajax({
    url: request,
    type: "PUT",
   async: false,
     headers: {"X-SIGNATURE": header.signature,
    "X-TIMESTAMP" : header.timestamp},
     dataType: 'json'
     }).responseJSON;
  
     if(rUrl.data!=null & rUrl.meta.code==200){
      localStorage.setItem('activated','Cashback Activated');
      safari.self.tab.dispatchMessage('activatedlinks',id);
    window.open(rUrl.data.redirectUrl);
     }
});



$(document).on('click','#close-button',function(){
  actiivated.remove();
    
});



function activate(chck) {

  var link=getTabUrl();
  exist=chkMarchent(link);
if(exist !== 0  )
{
 // newDiv = $('<div class="extension-container dark-theme-activates" > <div  class="wrapper_1 z-index main-radius " style="background: #fff;"> <div class="get-up-to-box"> <div class="left-section" style="background: #515256;"><img src="https://quotientmedia.blob.core.windows.net/quotient-web-assets/images/favicon-ext.png" class="logo_1"> </div><div class="right-section" style="margin: auto;"> <div class="static-box" id="AvailableDiv"><a id = "availble-noti" href="javascript:;"  class="cash-back-btn latter">Get Up to '+exist+'% Cash Back</a><a id= "later" href="javascript:;" class="later" > I&#39;ll get it later</a><div></div></div> <div class="extension-container hideDiv dark-theme-activates" id="ActivatedDiv"> <div class="wrapper_1 z-index main-radius "> <img id="close-button" src="https://quotientmedia.blob.core.windows.net/quotient-web-assets/images/close.svg" class="top-close-btn" /> <div class="get-up-to-box"> <div class="left-section" style="background: #515256;"> <img src="https://quotientmedia.blob.core.windows.net/quotient-web-assets/images/favicon-ext.png" class="logo_1"></div><div class="right-section activation-padding">  <div class="activated-cashback">Cash Back Activated</div></div></div></div></div>');
  actiivated = $('<div class="extension-container dark-theme-activates" id="ActivatedDiv"> <div class="wrapper_1 z-index main-radius " style="background: #fff;"> <img id="close-button" src="https://quotientmedia.blob.core.windows.net/quotient-web-assets/images/close.svg" class="top-close-btn" /> <div class="get-up-to-box"> <div class="left-section" style="background: #515256;"> <img src="https://quotientmedia.blob.core.windows.net/quotient-web-assets/images/favicon-ext.png" class="logo_1"></div><div class="right-section activation-padding">  <div class="activated-cashback">Cash Back Activated</div></div></div></div></div>')
  normal =  $('<div class="extension-container dark-theme-activates" > <div  class="wrapper_1 z-index main-radius " style="background: #fff;"> <div class="get-up-to-box"> <div class="left-section" style="background: #515256;"><img src="https://quotientmedia.blob.core.windows.net/quotient-web-assets/images/favicon-ext.png" class="logo_1"> </div><div class="right-section" style="margin: auto;"> <div class="static-box" id="AvailableDiv"><a id = "availble-noti" href="#"  class="cash-back-btn latter">Get Up to '+exist+'% Cash Back</a><a id= "later" href="#" class="later" > I&#39;ll get it later</a><div></div></div>')

var html= $("html");

if(chck === "true")
{
   if(window.top === window)
  {
  html.append(actiivated);
  // $( "#ActivatedDiv" ).addClass( "showDiv" )
  // $( "#AvailableDiv" ).addClass( "hideDiv" )
  }
}
else if (chck === "false")
{
  if(window.top === window)
  {
  html.append(normal);
    // $( "#ActivatedDiv" ).addClass( "hideDiv" )
  }
}
}



}



function getLocation(url)
{
    var a = document.createElement('a');
    a.href = url;
    return a.hostname;
}

function getTabUrl(){
  var url = getLocation(window.location.href);
  return url;
}

function chkMarchent(name){
   ;
  let request =  baseUrl +isUsUserUrl;
   let header =  ajaxTokenHandler(isUsUserUrl,"","GET");
  var isus = $.ajax({
    url: request,
   async: false,
     headers: {"X-SIGNATURE": header.signature,
    "X-TIMESTAMP" : header.timestamp},
     dataType: 'json'
     }).responseJSON;
  
     if(isus.data!=null & isus.meta.code==200){
    isUsUser = isus.data
     }
     else
     {
       isUsUser = "true"
     }
    if (isUsUser == "true") {
      
      let request =  baseUrl +domainUrl+name;
      let header =  ajaxTokenHandler(domainUrl,name,"GET");
      var d = $.ajax({
        url: request,
        headers: {"X-SIGNATURE": header.signature,
                 "X-TIMESTAMP" : header.timestamp},
                 async: false,
      dataType: 'json'
      }).responseJSON;
      //alert(JSON.stringify(d.data));
      if(d.data!=null & d.meta.code==200){
        if (d.data[0].cashbackPercentage !== null) {
      cashbackPercentage=d.data[0].cashbackPercentage;
      id = d.data[0].merchantId;
    couponId = d.data[0].id;
    }
      }
      else
      {
    cashbackPercentage = 0;
      }
    }
    else {
      cashbackPercentage = 0;
    }


  return cashbackPercentage;
  }

  function ajaxTokenHandler(url,param,method){
    var method = method;
    var API_SECRET="ZnUzcDFtc1RWOHR5aUNON0Z3QjJtV2dyblVwSzRkNlhoekh2Y1JhdUVzRzNaZURYZEs1WWIyUlo="
    var uri =  url+param;
    var ts = Math.round(new Date().getTime() / 1000);
    
    
    var concat = method+uri+ts+API_SECRET;
    let token = btoa(CryptoJS.SHA1(concat));
  
    let headers = {
      signature : token,
      timestamp : ts
    } 
    return headers;
  }

  safari.self.addEventListener('message', handleMessage, false);
  function handleMessage(msgEvent) {
  if (msgEvent.name === 'chckActivated'){
    activate(msgEvent.message);

  }
  }

}
