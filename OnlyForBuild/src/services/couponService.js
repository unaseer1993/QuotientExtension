import api from './api';
import getToken from './token';

const service='couponapi';

export default {
    fetchCashbackCoupons(page){
        return api.get(service+'/coupons/max_cashback_coupons/pages/plugin?page='+page+'&size=10');
    },
    fetchRedirectURl(id,consumerId){
        if(consumerId === 0 ) 
        {
            return api.put(service +"/coupons/redirectUrl/plugin?couponId="+id+"&consumerId=")
        }
        else {
        return api.put(service +"/coupons/redirectUrl/plugin?couponId="+id+"&consumerId="+consumerId)
       }
    },
    fetchMaxCashBackCouponByMercahat(id){
        return api.get(service+'/coupons/max_cashback_coupon/plugin/'+id);
    },
    fetchCouponsByMerchants(page,id){
        return api.get(service+'/coupons/search/pages/merchant/plugin?title=&merchant='+id+'&page='+page+'&size=10&sort=isCashback,desc&sort=endDate,desc');
 
    },
    fetchCashbackCouponByMerchant(domain){
        return api.get(service+'/coupons/max_cashback_coupon/domain_url/plugin?domainUrl='+domain);
    },
    fetchMerchnatCashbackCouponStartingWith(name){
        return api.get(service+'/coupons/max_cashback_coupon/search/plugin?name='+name);
    },
    fetchIsUSA(){
                return api.get(service+'/coupons/isUsUser/plugin/');       
    }


};