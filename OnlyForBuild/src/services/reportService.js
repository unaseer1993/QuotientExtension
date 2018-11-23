import api from './api';


const service='consumerapi';

export default {
    fetchCashbackDetailsbyId(id){
        return api.get(service+'/consumer/cashback/details?consumerId='+id);
    }

};