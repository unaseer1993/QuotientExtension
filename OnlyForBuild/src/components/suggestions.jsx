/*global browser*/
/*global safari*/
import React,{Fragment} from 'react';
import LoadingSpinner from './loading-spinner';
import CouponServices from "../services/couponService"
import {activateLink} from "../../utils/methods"

class Suggestion extends React.Component{
    constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
        this.state = ({
        mId : 0,
        cId : 0,
        isloading: false
  
        });

    }
componentDidMount(){
        this.setState({mId: this.props.merchant.merchantId});
        this.setState({cId: this.props.merchant.id});
}

    onSelect(){
      const self = this;
      this.setState({
        isloading: true
      });  
      CouponServices.fetchIsUSA()
      .then(response => {
        if (response.data.data === "true") {
          if(localStorage.getItem('userId') !== null) {
            this.setState ({cbId :localStorage.getItem('userId') });
          }
          activateLink(this.state.mId)
          }
          CouponServices.fetchRedirectURl(this.state.cId,this.state.cbId)
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
    }


    render() {
    const merchant = this.props.merchant;
    const isLoading = this.state.isloading;
    console.log(this.props.merchantLength);
    return (
      <Fragment>
        {this.props.focus &&
      <div className={this.props.isHighlighted && this.props.checkHover===0 ? "search-result-flex-box search-result-flex-box-selected" : "search-result-flex-box"} >
      { isLoading &&
        <LoadingSpinner />
      }
      <a className="search-find"  onClick={this.onSelect}   rel="noreferrer noopener">
        <div className="search-result-title">
          <span>{merchant.merchantName} </span>
        </div>
        <div className="search-result-offer">{merchant.cashbackPercentage}% </div>
        <div className="search-result-hidden-text-hover"> Activate {merchant.cashbackPercentage}% Cash Back</div>
      </a>
    </div>}
    </Fragment>
)}
  }

  export default Suggestion;
