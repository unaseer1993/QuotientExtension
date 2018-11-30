/*global safari*/


if (window === window.top) {
var baseUrl  = "https://codesapiweb.coupons.com";
var isUsUserUrl = "/couponapi/coupons/isUsUser/plugin/"
var domainUrl = "/couponapi/coupons/max_cashback_coupon/domain_url/plugin?domainUrl=";
var id=0;
var cashbackPercentage = 0;


 // setTimeout(function(){


  

$( document ).ready(function() {
  
  safari.self.tab.dispatchMessage('getuserIdChckboxActivated',id);
});


function activate() {
  
  var link=getTabUrl();
  var newDiv;
  var exist=chkMarchent(link);
  
  if(exist !== 0  )
  {
    newDiv = $('<div class="extension-container dark-theme-activates" > <div  class="wrapper_1 z-index main-radius " style="background: #fff;"> <div class="get-up-to-box"> <div class="left-section" style="background: #515256;"><img src="https://quotientmedia.blob.core.windows.net/quotient-web-assets/images/favicon.png" class="logo_1"> </div><div class="right-section" style="margin: auto;"> <div class="static-box" id="AvailableDiv"><a id = "availble-noti" href="javascript:;"  class="cash-back-btn latter">Get Up to '+exist+'% Cash Back</a><a id= "later" href="javascript:;" class="later" > I&#39;ll get it later</a><div></div></div> <div class="extension-container hideDiv dark-theme-activates" id="ActivatedDiv"> <div class="wrapper_1 z-index main-radius "> <img id="close-button" src="https://quotientmedia.blob.core.windows.net/quotient-web-assets/images/close.svg" class="top-close-btn" /> <div class="get-up-to-box"> <div class="left-section" style="background: #515256;"> <img src="https://quotientmedia.blob.core.windows.net/quotient-web-assets/images/favicon.png" class="logo_1"></div><div class="right-section activation-padding">  <div class="activated-cashback">Cash Back Activated</div></div></div></div></div>');
  
  var html= $("html");
  
  var divExist = localStorage.getItem('chkBox');
  var login = localStorage.getItem('user');
  userId = localStorage.getItem('userId');
   var activated = localStorage.getItem('activated');
  
  if(login!==null)
  {
  if(divExist!== null)
  {
    if(divExist == 1)
    {
    }
    else if(divExist == 0) {
      
  if(activated=='Cashback Activated')
  {
     if(window.top === window)
    {
    
    $( "#ActivatedDiv" ).addClass( "showDiv" )
    $( "#AvailableDiv" ).addClass( "hideDiv" )
    html.append(newDiv);
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
}
}



$("#availble-noti").click(function(){
localStorage.setItem('activated','Cashback Activated');

safari.self.tab.dispatchMessage('activatedlinks',id);
$( "#ActivatedDiv" ).addClass( "showDiv" );
 $( "#AvailableDiv" ).addClass( "hideDiv" );
  newDiv.delay( 2000 ).fadeOut( 1000 );
});



$("#close-button").click(function(){
  newDiv.delay( 000 ).fadeOut( 000 );
    
});

$("#later").click(function(){
  console.log("clicked");
  newDiv.remove();
});

//},500);



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
   ;
  let request =  baseUrl +isUsUserUrl;
   let header =  ajaxTokenHandler(isUsUserUrl,"");
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
      let header =  ajaxTokenHandler(domainUrl,name);
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
      id = d.data[0].merchantId}
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
 activate();
}
else if(msgEvent.name === 'normal')
{ 
  localStorage.setItem('activated','Available Coupons');
}
else if(msgEvent.name === 'getuserIdChckboxActivated')
{ 
 activate()
}
}


 }

