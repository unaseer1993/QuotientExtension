/*global browser*/
/*global safari*/
import $ from 'jquery';
import {ajaxTokenHandler} from '../services/auth';
import baseUrl from '../../utils/constants';

if(navigator.userAgent.indexOf("Chrome") != -1 )
{browser = window.browser || window.chrome || window.safari;}

$(document).ready(function(){
// browser.storage.local.get(['s'], (items)=> {
//     if(!items.s){
    render();
// }});

});
var cashBack = 0;
function render (){
    let element = $(".b_algo h2 a");
    var promises = [];
    var apiUrl = baseUrl+"/couponapi/coupons/max_cashback_coupon/domain_url/plugin?domainUrl="
    var ele = [];
    if (element){
        console.log(element);
        for(let i=0;i<element.length;i++){
            let hostname = element[i].hostname;
            let request =  apiUrl+hostname;
            let header =  ajaxTokenHandler(hostname);
            const api=  $.ajax({
               url: request,
               headers: {"X-SIGNATURE": header.signature,
                        "X-TIMESTAMP" : header.timestamp}
              })
                .done(function( data ) {
                    if(data.data[0] && data.data[0].cashbackPercentage){
                        ele.push(i);
                        cashBack=data.data[0].cashbackPercentage;
                    }
                  
                  
                });
            promises.push(api);
        
        }
    }
    $.when.apply(null, promises).done(function(){

        const link = 'https://quotientmedia.blob.core.windows.net/quotient-web-assets/images/favicon-ext.ico';
        const icon=   '<img src='+link+' alt="icon" width="16" height="16" />'
        const newDiv = '<div class="coupons">Upto '+cashBack+'% Cash Back</div>'
        var f=element.filter(function( index ) {
        var   i=$.inArray( index, ele );
            return i>=0;});
        
          f.prepend("<br />");
          f.prepend(newDiv);
          f.prepend(icon);
     })
   

}

