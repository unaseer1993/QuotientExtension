/*global safari*/

var baseUrl  = "https://codesapiweb.coupons.com";
var id=0;
var cashbackPercentage = 0;


  setTimeout(function(){
var link=getTabUrl();


var newDiv;
var exist=chkMarchent(link);


//var cb = getCashBack(); 
if(exist !== 0  )
{
//var newDiv = $('<div class="extension-container"> <div  class="wrapper_1 z-index"> <div class="get-up-to-box"> <div class="left-section"><img src="https://quotientmedia.blob.core.windows.net/quotient-web-assets/images/favicon.png" class="logo_1"> </div><div class="right-section"><div class="static-box"><a id = "availble-noti" href="javascript:;" class="cash-back-btn">Get up to 6% Cash Back</a><a id= "later" href="javascript:;" class="later"> I&#39;ll get it later</a></div></div></div></div>');
  newDiv = $('<div class="extension-container dark-theme-activates" > <div  class="wrapper_1 z-index main-radius " style="background: #fff;"> <div class="get-up-to-box"> <div class="left-section" style="background: #515256;"><img src="https://quotientmedia.blob.core.windows.net/quotient-web-assets/images/favicon.png" class="logo_1"> </div><div class="right-section" style="margin: auto;"> <div class="static-box" id="AvailableDiv"><a id = "availble-noti" href="javascript:;"  class="cash-back-btn latter">Get Up to '+exist+'% Cash Back</a><a id= "later" href="javascript:;" class="later" > I&#39;ll get it later</a><div></div></div> <div class="extension-container hideDiv dark-theme-activates" id="ActivatedDiv"> <div class="wrapper_1 z-index main-radius "> <img id="close-button" src="https://quotientmedia.blob.core.windows.net/quotient-web-assets/images/close.svg" class="top-close-btn" /> <div class="get-up-to-box"> <div class="left-section" style="background: #515256;"> <img src="https://quotientmedia.blob.core.windows.net/quotient-web-assets/images/favicon.png" class="logo_1"></div><div class="right-section activation-padding">  <div class="activated-cashback">Cash Back Activated</div></div></div></div></div>');

  // newDiv = $('<div class="extension-container"> <div class="wrapper_1 z-index "> <div onclick="myFunction()" ><img src="https://quotientmedia.blob.core.windows.net/quotient-web-assets/images/close.svg" class="top-close-btn" /></div> <div class="get-up-to-box"> <div class="left-section"> <img src="https://quotientmedia.blob.core.windows.net/quotient-web-assets/images/favicon.png" class="logo_1"></div><div class="right-section activation-padding">  <div class="activated-cashback">Cash Back Is Activated</div></div></div></div></div>');

// var activatted=$('<div class="extension-container"> <div class="wrapper_1 z-index "> <img id="close-button" onclick="closePop()" src="https://quotientmedia.blob.core.windows.net/quotient-web-assets/images/close.svg" onclick="parentNode.remove()" class="top-close-btn" /> <div class="get-up-to-box"> <div class="left-section"> <img src="https://quotientmedia.blob.core.windows.net/quotient-web-assets/images/favicon.png" class="logo_1"></div><div class="right-section activation-padding">  <div class="activated-cashback">Cash Back Is Activated</div></div></div></div></div>');

var html= $("html");

//if(exist){

var divExist = localStorage.getItem('chkBox');
var login = localStorage.getItem('userid');
 var activated = localStorage.getItem('activated');

if(login!==null)
{
if(divExist!== null)
{
  //var urlLinks = localStorage.getItem('urlitems');

  if(divExist == 1)
  {
  }
  else if(divExist == 0) {
    
if(activated=='Cashback Activated')
{
  // html.append(activatted);
   if(window.top === window)
  {
  html.append(newDiv);
  $( "#ActivatedDiv" ).addClass( "showDiv" )
  $( "#AvailableDiv" ).addClass( "hideDiv" )
 // newDiv.delay( 2000 ).fadeOut( 1000 );
  }
}
else if (activated == 'Available Coupons')
{
  if(window.top === window)
  {
  html.append(newDiv);
    $( "#ActivatedDiv" ).addClass( "hideDiv" )
  }
}

}
}
}
//}




$("#availble-noti").click(function(){
  //  safari.self.tab.dispatchMessage('message');
localStorage.setItem('activated','Cashback Activated');

safari.self.tab.dispatchMessage('activatedlinks',id);
$( "#ActivatedDiv" ).addClass( "showDiv" );
 $( "#AvailableDiv" ).addClass( "hideDiv" );
  newDiv.delay( 2000 ).fadeOut( 1000 );
  //html.delay( 1100 ).append(activatted);
  
  //activatted.delay( 5000 ).fadeOut( 1000 )
});



$("#close-button").click(function(){
  newDiv.delay( 000 ).fadeOut( 000 );
    
});

$("#later").click(function(){
  console.log("clicked");
  newDiv.remove();
});
}
 },500);



// }




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
   var apiUrl = "/couponapi/coupons/isUsUser/web/";
  let request =  baseUrl +apiUrl;
   let header =  ajaxTokenHandler(apiUrl,"");
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
      var apiUrl = "/couponapi/coupons/max_cashback_coupon/domain_url/web?domainUrl=";
      let request =  baseUrl +apiUrl+name;
      let header =  ajaxTokenHandler(apiUrl,name);
      var d = $.ajax({
        url: request,
        headers: {"X-SIGNATURE": header.signature,
                 "X-TIMESTAMP" : header.timestamp},
                 async: false,
      dataType: 'json'
      }).responseJSON;
      //alert(JSON.stringify(d.data));
      if(d.data!=null & d.meta.code==200){
      cashbackPercentage=d.data[0].cashbackPercentage;
      id = d.data[0].merchantId
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

//   function getCashBack()
//   {
//     var token;
//     var isUsUser;
//   const currentUnixTimeStamp = Math.round((new Date()).getTime() / 1000);
//  var t=  $.ajax({
//   url: "https://codesapi.coupons.com/token/",
//   async: false,
//   dataType: 'json'
//  }).responseJSON;

//  if(t.data!=null & t.meta.code == 200)
//  {
// token = t.data;
//  }
//  else
//  {
// token = "";
//  }
//  var isus = $.ajax({

//   url: "https://codesapi.coupons.com/couponapi/coupons/isUsUser/web",
//   async: false,
//          beforeSend: function(request) {
//         request.setRequestHeader("Authorization",token)
//       },
//   dataType: 'json'
//   }).responseJSON;

//   if(isus.data!=null & isus.meta.code==200){
//   isUsUser = isus.data
//   }
//   else
//   {
//     isUsUser = "true"
//   }
// if(isUsUser == "true")
// {
//     var d = $.ajax({

//       url: api+"/couponapi/coupons/max_cashback_coupon/web/"+id,
//       async: false,
//          beforeSend: function(request) {
//         request.setRequestHeader("Authorization",token,
//         "X-LOCATION-TIME", `${getTodaysDate()} ${getFormattedTime(currentUnixTimeStamp)}`);
//       },
//       dataType: 'json'
//       }).responseJSON;

//       if(d.data!=null & d.meta.code==200){
//       var cB=d.data.cashbackPercentage;
//       }
//       else
//       {
//         cB = 0;
//       }
//     }
//     else
//     {
//       cB = 0;
//     }


//       return cB;

//   }

  function getTodaysDate() {
    
  
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; // January is 0!
    const yyyy = today.getFullYear();
  
    if (dd < 10) {
      dd = `0${dd}`;
    }
  
    if (mm < 10) {
      mm = `0${mm}`;
    }
    today = `${yyyy}-${mm}-${dd}`;
  
    return today;
  } 
    
  
  function  getFormattedTime (unixTimestamp) {
   
     const date = new Date(unixTimestamp * 1000);
    // Hours part from the timestamp
    const hours = getDoubleDigitNumber(date.getHours());
    // Minutes part from the timestamp
    const minutes = getDoubleDigitNumber(date.getMinutes());
    // Seconds part from the timestamp
    const seconds = getDoubleDigitNumber(date.getSeconds());
  
    // Will display time in 10:30:23 format
    const formattedTime = `${hours}:${minutes}:${seconds}`;
  
    return formattedTime;
  }
  
  
  function getDoubleDigitNumber (number) {
    return number < 10 ? `${parseInt(`${0}`, 10)}${number}` : number;
  } 


  function ajaxTokenHandler(url,param){
    var method = "GET";
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
  
    if(msgEvent.name === 'message')
  {

    if(msgEvent.message == 1){
localStorage.setItem('chkBox',1);
}
  else if(msgEvent.message == 0) {
    localStorage.setItem('chkBox',0);

  }
}
else if(msgEvent.name === 'logout')
{
  localStorage.removeItem('userid');
  localStorage.removeItem('activated');
}
else if(msgEvent.name === 'userid')
{
 
  if(msgEvent.message !==null)
  {
  localStorage.setItem('userid',msgEvent.message);
  }
}
else if(msgEvent.name === 'activated')
{ 
 localStorage.setItem('activated','Cashback Activated');
//call();
}
else if(msgEvent.name === 'normal')
{ 
  localStorage.setItem('activated','Available Coupons');
  //call();
  //html.append(newDiv);
  //$( "#ActivatedDiv" ).addClass( "showDiv" )
}

}