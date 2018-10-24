import api from './api';


const service='couponapi';

export default {
    fetchCashbackCoupons(page){
        return api().get(service+'/coupons/max_cashback_coupons/pages/?page='+page+'&size=10');
    },
    fetchMaxCashBackCouponByMercahat(id){
        return api().get(service+'/coupons/max_cashback_coupon/'+id);
    },
    fetchCouponsByMerchants(page,id){
        return api().get(service+'/coupons/search/pages/merchant?title=&merchant='+id+'&page='+page+'&size=10');
 
    },
   
     isMerchantExist(domain){
        return api().get("https://codesapi.coupons.com/couponapi/coupons/max_cashback_coupon/domain_url?domainUrl="+domain);
    }

};