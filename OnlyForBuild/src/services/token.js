import api from './api';

export default function getToken () {
  return api.get('token/');
}
