import React,{Fragment} from 'react';
import MerchantItem from './merchantItem';
import LoadingSpinner from './loading-spinner';

class Items extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            coupons: [],
            isloading: true
          };
      }

      componentWillReceiveProps(nextProps) {
        this.setState({
          coupons: nextProps.coupons,
          isloading: false
        });
      } 

    render() {
              const isloading = this.state.isloading;
        const coupons = this.state.coupons;
 
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

export default Items;
