import React,{Fragment} from 'react';
import CouponsItem from './couponsItem';
import moment from 'moment';
import LoadingSpinner from './loading-spinner';
import axios from 'axios';

class Coupons extends React.Component {

    constructor(props) {
        super(props);
       // this.fetchMoreDeals = this.fetchMoreDeals.bind(this);
        this.state = {
            coupons: [],
            last: false,
            pageNumber: 0,
            id:0
          };
      }

      componentWillReceiveProps(nextProps) {
        this.setState({
          coupons: nextProps.coupons
        });
      } 
   

    render() {
    
        let isloading = true;
        const coupons = this.state.coupons;

        if(coupons && coupons.length!==0)
        {
            isloading = false;
        }
   
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
                <div class="loading-overlay">Nothing to show</div>
            }
               {
            !isloading &&
            coupons.map(coupon =>
           
                <CouponsItem title={coupon.title.length > 20  ? `${truncate(coupon.title,6)} ...` : coupon.title} percentage={coupon.cashbackPercentage} url={coupon.redirectUrl}  id={this.couponId(coupon.id)} type={coupon.couponType.title} code={coupon.code} date={this.convertDate(coupon.endDate)}
                exclusive={this.isExclusive(coupon.exclusiveOffer)} CouponType={coupon.isCashbackCoupon} Merchantid={coupon.merchant.id} hideExpirationDate={coupon.hideExpirationDate}/>) }
        
            
             </Fragment>   );
    }

    convertDate(date){
        moment.locale();
        const dt = date;
        const updatedDate = moment.unix(dt / 1000).format('MM/DD/YYYY');
        return updatedDate;
    }

    isExclusive(exclusive){
        let string="";
        if(exclusive){
            string="Exclusive";
        }
        return string;
    }
    couponId(id){
        return id;
    }


}

export default Coupons;
