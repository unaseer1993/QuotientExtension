import api from './api';
import getToken from './token';

const service='consumerapi';

export default {
    fetchCashbackProcessingById(id){   
            return api.get(service+'/commission/processingCommission/web/'+id);  
    }
};