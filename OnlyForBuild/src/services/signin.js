import api from './api';


const service='clipapi';

export default {
    sigin(email,password){
        return api.post(service+'/rest/users/plugin/sign-in',
        {email,
        password}
        );
    }

};