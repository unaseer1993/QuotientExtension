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


safari.application.addEventListener("activate", handleChange, true);
safari.application.addEventListener("navigate", handleChange, true);
safari.application.addEventListener("beforeNavigate", handleChange, true);

var cookies = document.cookie;

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
        window.location.reload()
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

