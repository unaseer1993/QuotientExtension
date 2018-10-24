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
    // fetchMoreDeals(page) {
    //   this.setState({loader:true});
    
    //     axios
    //       .get(
    //         // `https://api.pdn.netpace.net/couponapi/coupons/max_cashback_coupons/pages/?page=` +
    //         //   page +
    //         //   `&size=10`
    //           `https://codesapi.pdn.coupons.com/couponapi/coupons/max_cashback_coupons/pages/?page=` +
    //           page +
    //           `&size=10`
    //       )
    //       .then(res => {
    //         const coupons = res.data.data.content;
           
    //         localStorage.setItem("a", JSON.stringify(coupons)); //chane this into chrome.storage.local api
    //         this.setState({
    //           coupons: this.state.coupons.concat(res.data.data.content),
    //           pageNumber: res.data.data.pageable.pageNumber,
    //           last: res.data.data.last,
    //           loader:false
    //         });
    //       })
    //       .catch(error => {
    //         console.log("catching Error");
    //         let couponsdata = localStorage.getItem("a");
    //         this.setState({ coupons: JSON.parse(couponsdata) });
    //         //console.log(error.response)
    //       });
    
    //   }

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
