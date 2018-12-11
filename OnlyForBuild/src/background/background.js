/*global browser*/
/*global safari*/
import axios from 'axios';
import {MERCHANT_EXIST} from '../../utils/urls'
import MerchantService from '../services/merchantService'

let browser = window.browser || window.safari;
localStorage.setItem('redirected', 0);
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
}

safari.application.addEventListener("popover", popoverHandler, false);
function popoverHandler(event) {
 if (event.target.identifier !== "openPopover") {
  event.target.contentWindow.location.reload();
 }
}
var activatedlinks = [];
safari.application.addEventListener("message", handleMessage, false );
function handleMessage(msg) {
  if (msg.name === "activatedlinks") {
    if (localStorage.getItem("activatedlinks") !== null) {
      activatedlinks = JSON.parse(localStorage.getItem("activatedlinks"));
    }
    if (!activatedlinks.includes(msg.message)) {
      activatedlinks.push(msg.message);
    }
    localStorage.setItem("activatedlinks", JSON.stringify(activatedlinks));
  } else if (msg.name === "chkbox") {
    if (msg.message === 1) {
      localStorage.setItem("chkbox", 1);
    } else if (msg.message === 0) {
      localStorage.setItem("chkbox", 0);
    }
  }
  /* New Code Added for RND */
  else if (msg.name === "chckActivated") {
        if (
          typeof safari.application.activeBrowserWindow.activeTab.url !==
          "undefined"
        ) {

          var chkbox = localStorage.getItem('chkbox');
          var userId = localStorage.getItem('userId');
          if(userId !== null) {
            localStorage.setItem('chk',1);
            localStorage.setItem('id', msg.message); 
            if (localStorage.getItem("activatedlinks") !== null) {
              activatedlinks = JSON.parse(localStorage.getItem("activatedlinks"));
            }
            if (!activatedlinks.includes(msg.message)) {

              var iconUri = safari.extension.baseURI + "Icons/icon-available@2x.png";
              safari.extension.toolbarItems[0].image = iconUri;
              if(chkbox !== null && chkbox == 0 ) {
              safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
                "chckActivated",
                "false"
              );
              }
            }
            else {
  
              var iconUri =
              safari.extension.baseURI + "Icons/icon-activated@2x.png";
            safari.extension.toolbarItems[0].image = iconUri;
            if(chkbox !== null && chkbox == 0 ) {
              safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
                "chckActivated",
                "true"
              );
              }
              
            }
          
        }
        }
  }
   /* New Code Added for RND */
}


safari.application.addEventListener("activate", handleChange, true);
safari.application.addEventListener("navigate", handleChange, true);
safari.application.addEventListener("beforeNavigate", handleChange, true);


function handleChange(){
  var tab = safari.application.activeBrowserWindow.activeTab.url;
  var mer=getHostName(tab);
  if(tab){
   
      callApi(mer,tab);
    
  }
  else
  {
    var iconUri = safari.extension.baseURI + "Icons/icon@2x.png";
          safari.extension.toolbarItems[0].image = iconUri;
    localStorage.setItem("chk", 2);
   localStorage.setItem("id", 0);
  }
}
function callApi(name, link){
    id='';
    if(name==null || name == undefined)
    {
       name = "";
    }
  
   MerchantService.isMerchantExist(name)
    .then(res => {
        let merchant = res.data.data;       
        if(merchant!==null && JSON.stringify(merchant) !== "{}" && merchant.id !==undefined){     
          id=merchant.id;
          localStorage.setItem('chk',1);
          localStorage.setItem('id', id);
            setRecentlyVisited(id,link);
              
             if (
          typeof safari.application.activeBrowserWindow.activeTab.url !==
          "undefined"
        ) {
          if(localStorage.getItem('userId')!== null)
          {
          var activatedlinks = [];
          if (localStorage.getItem("activatedlinks") !== null) {
            activatedlinks = JSON.parse(localStorage.getItem("activatedlinks"));
          }
          if (!activatedlinks.includes(id)) { 
            var iconUri = safari.extension.baseURI + "Icons/icon-available@2x.png";
            safari.extension.toolbarItems[0].image = iconUri;
          }
          else {
            var iconUri = safari.extension.baseURI + "Icons/icon-activated@2x.png";
            safari.extension.toolbarItems[0].image = iconUri;
          }
        }
      }

        }
        else{
          var iconUri = safari.extension.baseURI + "Icons/icon@2x.png";
      safari.extension.toolbarItems[0].image = iconUri;
          localStorage.setItem('chk',2);
localStorage.setItem('id', 0);
        }
    }).catch(error => {
      var iconUri = safari.extension.baseURI + "Icons/icon@2x.png";
      safari.extension.toolbarItems[0].image = iconUri;
  localStorage.setItem('chk', 2);
  localStorage.setItem('id',0);
    });
}

function getHostName(url)
{
    var a = document.createElement('a');
    a.href = url;
return a.hostname;
}

function setRecentlyVisited(id, link){
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

