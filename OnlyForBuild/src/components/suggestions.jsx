/*global browser*/
/*global safari*/
import React,{Fragment} from 'react';
import LoadingSpinner from './loading-spinner';
import CouponServices from "../services/couponService"


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
    
   var activatedlinks = [];   
    var actiii = false;

        if(localStorage.getItem('activatedlinks')!==null)
          {  
            activatedlinks = JSON.parse(localStorage.getItem('activatedlinks'));
               for (var i = 0; i < activatedlinks.length; i++) {
          if (activatedlinks[i] == this.state.mId)
                {
              actiii = true;
                break;
                }
                }
                if(!actiii)
            {
                activatedlinks.push(this.state.mId);
                  }    
          }
          else
          {
            activatedlinks.push(this.state.mId);
          }
                localStorage.setItem('activatedlinks',JSON.stringify(activatedlinks));    

          this.setState({
            isloading: true
            });
     
 CouponServices.fetchRedirectURl(this.state.cId)

      .then(response => {
        this.setState({
          isloading: false
        });
        safari.self.hide();
        window.location.reload();
          var newURL = response.data.data.redirectUrl;
          var targetWin = safari.application.activeBrowserWindow;
          targetWin.openTab().url = newURL;

      })
      .catch(function (response) {
        this.setState({
          isloading: false
        });
        window.location.reload();
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
