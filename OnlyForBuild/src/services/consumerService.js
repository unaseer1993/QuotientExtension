import api from './api';


const service='consumerapi';

export default {
    fetchUserIdByEmail(email){
        return api.get(service+'/email?email='+email);
    },
    fetchCashbackProcessingById(id){   
        return api.get(service+'/commission/processingCommission/web/'+id);  
    },
    fetchCashbackDetailsbyId(id){
    return api.get(service+'/consumer/cashback/profile/web?consumerId='+id);
    }


};