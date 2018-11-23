import api from './api';
import getToken from './token';

const service='couponapi';

export default {
    fetchCashbackCoupons(page){
        /* return getToken().then(res=>{
            api.defaults.headers['Authorization'] = res.data.data; */
        return api.get(service+'/coupons/max_cashback_coupons/pages/web?page='+page+'&size=10');
       // });
    },
    fetchRedirectURl(id){
        return api.put(service +"/coupons/redirectUrl/web?couponId="+id+"&consumerId=1")
    },
    fetchMaxCashBackCouponByMercahat(id){
        return api.get(service+'/coupons/max_cashback_coupon/web/'+id);
    },
    fetchCouponsByMerchants(page,id){
       // https://codesapi.pdn.coupons.com/couponapi/coupons/search/pages/merchant?title=&merchant=14621&page=0&size=10&sort=isCashback,desc
        return api.get(service+'/coupons/search/pages/merchant/web?title=&merchant='+id+'&page='+page+'&size=10&sort=isCashback,desc&sort=endDate,desc');
 
    },
    fetchCashbackCouponByMerchant(domain){
        return api.get(service+'/coupons/max_cashback_coupon/domain_url/web?domainUrl='+domain);
    },
    fetchMerchnatCashbackCouponStartingWith(name){
        return api.get(service+'/coupons/max_cashback_coupon/search/web?name='+name);
    },
    fetchIsUSA(){
        
        /* return getToken().then(res=>{
                api.defaults.headers['Authorization'] = res.data.data; */
                return api.get(service+'/coupons/isUsUser/web/');
            //});
        
    }


};