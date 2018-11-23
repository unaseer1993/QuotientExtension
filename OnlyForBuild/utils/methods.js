/*global browser*/
/*global chrome*/
import {REDIRECT_URL} from './urls'
var browser = window.browser || window.chrome;


export function  print(data){
    console.log(data);
}



export function activateCashBackCoupon(mId , cId,domain){
    print(mId);
    print(cId);
    print(domain);
    setCookies(mId, cId);
    addActivated(mId, domain);
    browser.tabs.create({"url": REDIRECT_URL});
    window.close();
}

export function setCookies(mId , cId){
  
    browser.runtime.sendMessage({
      target: "cookies",
      mId : mId,
      cId : cId
    });

  }

 export function addActivated(id,domain){
    var browser = window.browser || window.chrome;
    browser.runtime.sendMessage({
      target: "activated",
      id   :  id,
      name : domain
    });
  }

  export  function getHostName(url)
  {
      var a = document.createElement('a');
      a.href = url;
      var lArray=a.hostname;
      return lArray.toString();
  }

