import api from './api';

const service='consumerapi';

export default {
    fetchCashbackProcessingById(id){   
            return api.get(service+'/commission/processingCommission/plugin/'+id);  
    }
};