import crypto from 'crypto';
import {API_SECRET}  from '../../utils/urls'
import queryString from 'query-string';
function sha1 (data) {
  return crypto.createHash('sha1').update(data, 'binary').digest('hex');
}

export function tokenHandler (requestConfig) {

  const method = requestConfig.method.toUpperCase();
  const timestamp = Math.round(new Date().getTime() / 1000);
  const secret = API_SECRET
  const url = requestConfig.url;
  let uri =  "/"+url
  let body = requestConfig.data;

  if (body === undefined || body === '') {
    body = '';
  } else {
    body = JSON.stringify(body)
  }

  let token = sha1(method + uri + body + timestamp + secret);
  token = Buffer.from(token).toString('base64')
  requestConfig.headers['X-SIGNATURE'] = token;
  requestConfig.headers['X-TIMESTAMP'] = timestamp;
  return requestConfig;
}
// export function tokenHandler (requestConfig) {
//   const method = requestConfig.method.toUpperCase();
//   const timestamp = Math.round(new Date().getTime() / 1000);
//   const secret = API_SECRET;
//   const baseURL = requestConfig.baseURL;
//   const url = requestConfig.url;
//   let uri = url.replace(baseURL, '');
//   let body = requestConfig.data;
//   const params = requestConfig.params;

//   // console.log(params);

//   if (params && Object.keys(params).length > 0) {
//     const paramsStringified = queryString.stringify(params, { sort: false });
//     // console.log(paramsStringified)
//     if (paramsStringified) uri = `${uri}?${paramsStringified}`;
//   }

//   if (body === undefined || body === '') {
//     body = '';
//   } else {
//     body = JSON.stringify(body);
//   }

//   // console.log(method + uri + body + timestamp + secret);
//   let token = sha1(method + uri + body + timestamp + secret);
//   token = Buffer.from(token).toString('base64');

//   // eslint-disable-next-line no-param-reassign
//   requestConfig.headers['X-SIGNATURE'] = token;
//   // eslint-disable-next-line no-param-reassign
//   requestConfig.headers['X-TIMESTAMP'] = timestamp;

//   return requestConfig;
// }

export function ajaxTokenHandler(param){
  const method = "GET"
  const timestamp = Math.round(new Date().getTime() / 1000);
  const secret = API_SECRET
  let uri =  "/couponapi/coupons/max_cashback_coupon/domain_url/web?domainUrl="+param;
  let token = sha1(method + uri + timestamp + secret);
  token = Buffer.from(token).toString('base64');
  let headers = {
    signature : token,
    timestamp : timestamp
  }
  
  return headers;
}
