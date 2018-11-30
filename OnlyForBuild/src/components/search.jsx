/*global browser*/
/*global safari*/
import React, { Component } from 'react';
import { debounce } from 'lodash';
import disableScroll from 'disable-scroll';
import Suggestion from "./suggestions";
import { SEARCH_QUERY  } from '../../utils/urls'
import LoadingSpinner from './loading-spinner';
import CouponService from '../services/couponService'
import {activateLink} from "../../utils/methods"

let browser = window.browser || window.safari;

function getMerchantData(value) {
  return CouponService.fetchMerchnatCashbackCouponStartingWith(value)
}

function getCouponsData(merchantId) {
  return CouponService.fetchMaxCashBackCouponByMercahat(merchantId)
}


async function merchantCashback(merchantIds) {
  const res = await getCouponsData(merchantIds);
  const coupons = res.data.data;
  console.log("merchantCashback");
  console.log(coupons);
return coupons;
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.keyEnter=this.keyEnter.bind(this);
    this.handleInputChange=this.handleInputChange.bind(this);
    this.handleKeyDown=this.handleKeyDown.bind(this);
    this.onMouseOver=this.onMouseOver.bind(this);
    this.onMouseDown=this.onMouseDown.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.state = {
      query: '',
      results: [],
      mId : 0,
      cId : 0,
      highlightedMerchant : 0,
      currentIndex : -1,
      isloading: false,
      chk : 0,
      focus:true,
      cbId : 0
    }

    this.lastRequestId = null
  this.debouncedLoadSuggestions = debounce(this.getInfo,50);
  }

  searchClicked() {
      safari.self.hide();
      }


  onSelect(mId,cId){
    browser.runtime.sendMessage({
      target: "cookies",
      mId : this.state.mId,
      cId : this.state.cId
    });

  }

  async getInfo() {

      if(this.state.query.length>=3){
    const { data } = await getMerchantData(this.state.query);
let merchants = data.data;
 this.setState({
          results: merchants
        });
      }
  }



  handleInputChange () {
    this.setState({
      query: this.search.value
    }, () => {
      let patt = new RegExp("/");
      let res = patt.test(this.state.query);
if(!res)
{
      if (this.state.query && this.state.query.length > 0   ) {
        if (this.lastRequestId !== null) {
          clearTimeout(this.lastRequestId)
          console.log(this.lastRequestId)
        }
        if (this.state.query.length > 0 ) {
          this.lastRequestId = this.debouncedLoadSuggestions();
        }
      } else if (!this.state.query) {
        this.setState({
          results: [],
          highlightedMerchant : 0,
          currentIndex : -1
        });
      }
    }
    else{
      this.setState({
        results: []
      });

    }


    })
  }

  onBlur() {
    document.getElementById('overlay').classList.remove('overlay');

    setTimeout(()=>{
      this.setState({  focus: false });
    },150);
    
    disableScroll.off();
  }


  keyEnter(e)
  {
if(e.key === 'Enter'){
  const self = this;
 if(this.state.query.length>0 && this.state.query.trim().length>0)
  {
  
    this.setState({
  isloading: true
});
    safari.self.hide();
    if(this.state.results.length==0)
    {
      this.setState({
        isloading: false
      });
      var newURL = SEARCH_QUERY+this.state.query;
      var targetWin = safari.application.activeBrowserWindow;
      targetWin.openTab().url = newURL;
    }
    else
    {
      var chkquery = false;
      for(var i=0;i<this.state.results.length;i++)
      {
      if(this.state.query===this.state.results[i].merchantName && this.state.currentIndex!==-1) 
      {
        var link = this.state.results[i].merchantId;
        const self = this;
        CouponService.fetchIsUSA()
        .then(response => {
          if (response.data.data === "true") {
            if(localStorage.getItem('userId') !== null) {
              this.setState ({cbId :localStorage.getItem('userId') });
            }
            activateLink(link);
            }
            CouponService.fetchRedirectURl(this.state.results[i].id,this.state.cbId)
            .then(response => {
              self.setState({
                isloading: false
              });
              safari.self.hide();
                var newURL = response.data.data.redirectUrl;
                var targetWin = safari.application.activeBrowserWindow;
                targetWin.openTab().url = newURL;
          
            })
            .catch(function (response) {
              console.log(response);
              self.setState({
                isloading: false
              });
            });
         }); 
   

chkquery = true;
break;
      }
    }
    if(!chkquery)
    {
      this.setState({
        isloading: false
      });
      var newURL = SEARCH_QUERY+this.state.query;
      var targetWin = safari.application.activeBrowserWindow;
      targetWin.openTab().url = newURL;
    }

    }
}

  }
}



onMouseOver() {
  this.setState({chk: 1});
  console.log('on hover');
}



onMouseDown() {
  this.setState({chk: 0});
  console.log('on hoverDown');
}



handleKeyDown(e)
{

  switch (e.keyCode) {

  case 8:
  if(this.state.query.length>0)
  {
     this.setState({
       highlightedMerchant:0,
       currentIndex:-1
     })
  }
  break;
 case 39:
 var ctl = document.getElementById('Javascript_example');
  var startPos = ctl.selectionStart;
  var endPos = ctl.selectionEnd;

  if(ctl.selectionStart!=this.state.query.length)
  {
    ctl.selectionStart = ctl.selectionStart + 1;
  }
break;

case 37:
var ctl = document.getElementById('Javascript_example');
  var startPos = ctl.selectionStart;
    var endPos = ctl.selectionEnd;
    if(ctl.selectionStart)
    {
      ctl.selectionEnd = ctl.selectionEnd - 1;
    }

break;
    case 40:

    if(this.state.query.length>0)
    {
    if(this.state.currentIndex==-1)
    {
if(this.state.highlightedMerchant.merchantName===undefined)
{
  this.search.value = this.state.query
}

    }

      if (this.state.currentIndex >= -1 && this.state.currentIndex < this.state.results.length -1) {
        this.setState({
          currentIndex: ++this.state.currentIndex,
          highlightedMerchant: this.state.results[this.state.currentIndex],
          query: this.state.results[this.state.currentIndex].merchantName
        }, () => {
          this.search.value = this.state.highlightedMerchant.merchantName

        })
      }
else if(this.state.currentIndex === this.state.results.length -1)
{

  this.setState({
    highlightedMerchant: this.state.results[this.state.currentIndex],
    query: this.state.results[this.state.currentIndex].merchantName,

  }, () => {
    this.search.value = this.state.highlightedMerchant.merchantName

  })
}

    }
      break;
    case 38:
      if (this.state.currentIndex > 0 && this.state.currentIndex <= this.state.results.length-1) {
        this.setState({
          currentIndex: --this.state.currentIndex ,
          highlightedMerchant: this.state.results[this.state.currentIndex],
          query: this.state.results[this.state.currentIndex].merchantName
        }, () => {
          this.search.value = this.state.highlightedMerchant.merchantName
        })
      }
      else if(this.state.currentIndex === 0)
      {
    this.setState({
        highlightedMerchant: 0,
     query: this.state.results[this.state.currentIndex--].merchantName,
   }, () => {
    this.search.value = this.state.query

  })
}
      break;

    default:
      break;
  }
}

handleClick(e) {

 document.getElementById('overlay').classList.add('overlay');
 this.setState({focus: true});
 disableScroll.on();
}

  render() {
    const isLoading = this.state.isloading;
    const results = this.state.results;
    console.log(results.length);
    return (
      <div>
      { isLoading &&
        <LoadingSpinner />
      }
        <input id="Javascript_example" type="text" placeholder="Search Store" ref={input => this.search = input} onChange={this.handleInputChange} onBlur={this.onBlur}  onClick={this.handleClick}  onKeyPress={this.keyEnter}  onKeyDown={this.handleKeyDown}  />
        {this.state.query.length>0 && this.state.query.trim().length>0 && this.state.focus &&
        <a class="search" onClick={this.searchClicked}  href={SEARCH_QUERY+this.state.query}  ><span></span></a>
        }
        {results.length > 0  && this.state.query.length>0 && this.state.query.trim().length>0 &&

        <div className="show-result-row" onMouseOver={this.onMouseOver} onMouseOut={this.onMouseDown} >
        {this.state.query.length>0 &&
            results.map(result =>
              <Suggestion
              focus = {this.state.focus}
                isHighlighted={this.state.highlightedMerchant.merchantId === result.merchantId}
                merchant={result}
                merchantLength={this.state.results.length}
                checkHover={this.state.chk}
              />
            )
        }
        </div>
        }
    </div>
    );
  }
}
export default Search;
