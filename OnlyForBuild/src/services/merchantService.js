import api from './api';
import {tokenHandler} from './auth'

const service='merchantapi';

export default {
    isMerchantExist(domain){
        return api.get(service+"/domain_url/exists?domainUrl="+domain);
    }
}