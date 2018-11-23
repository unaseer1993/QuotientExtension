import React,{Fragment} from 'react';
import MerchantItem from './merchantItem';
import LoadingSpinner from './loading-spinner';
import axios from "axios";

class Items extends React.Component {

    constructor(props) {
        super(props);
        // this.fetchMoreDeals = this.fetchMoreDeals.bind(this);
        this.state = {
            coupons: [],
            isloading: true
            // last: false,
            // pageNumber: 0,
            // loader:false
          };
      }

      componentWillReceiveProps(nextProps) {
        this.setState({
          coupons: nextProps.coupons,
          isloading: false
          // last: nextProps.last,
          // pageNumber: nextProps.page
        });
      } 

    render() {
              const isloading = this.state.isloading;
        const coupons = this.state.coupons;
        // const pageNumber = this.state.pageNumber;
        // const last = this.state.last;
  
        
            function truncate(str, no_words) {
                if(str.length >25)
                {
                    return str.split(" ").splice(0,no_words).join(" ");
                }
                else{
                    return str;
                }
            
        }
        return (
             <Fragment>
            {
                isloading && 
                <LoadingSpinner />
            }
               {
            !isloading &&
            coupons.map(coupon =>
                <MerchantItem title={coupon.title.length > 25 ? `${truncate(coupon.title,6)}` : coupon.title} percantage={coupon.cashbackPercentage} merchantId={coupon.merchantId} url={coupon.url}  couponId={coupon.id}  couponType={coupon.couponType}/>)
                }
               
               
                 </Fragment>  );
    }

}

//  {!isloading && !last  && <a onClick={()=>{this.fetchMoreDeals(pageNumber)}} class="load-more">Load more</a>}
//                 { 
//                 this.state.loader && 
//                 <LoadingSpinner nocss={true} />
//             }

export default Items;
