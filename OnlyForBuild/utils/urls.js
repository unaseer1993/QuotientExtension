var q = require('./constants')
// APIs
var COUPONS_API = '/couponapi';
var REPORT_API = '/reportapi';
var MERCHANT_API = '/merchantapi';
var BASE_URL = 'https://couponswest.netpace.co/coupon-codes/';
//var BASE_URL = 'https://www.pdn.netpace.net/coupon-codes/';
//var BASE_URL = 'https://couponsqtstage.netpace.com/coupon-codes/';
var LOGO_URL = "https://couponswest.netpace.co/coupon-codes/"

var MAX_CASHBACK_COUPONS = q + COUPONS_API + '/coupons/max_cashback_coupons';
var MERCHANT_COUPONS = q + COUPONS_API + '/coupons/search/merchant?title=&merchant=';
var CASHBACK_DETAILS = q + REPORT_API + '/consumer/cashback/details?consumerId=';
//var MERCHANT_SEARCH = q + MERCHANT_API + '/name/';
var MERCHANT_SEARCH = q + COUPONS_API + '/coupons/max_cashback_coupon/search?name=';

var CASHBACK_SEARCH = q + COUPONS_API + '/coupons/max_cashback_coupon/';
var MERCHANT_EXIST 	= q + MERCHANT_API + '/domain_url/exists?domainUrl=';
var CASHBACK_SEARCH_ARRAY = q + COUPONS_API+'/coupons/max_cashback_coupon/merchants/';

var SIGNIN_URL=BASE_URL+"authentication/sign-in/";
var REDIRECT_URL = BASE_URL+'redirect-to-merchant/';
var userProfile = BASE_URL+"user/cashback-rewards/1";
var HELP_URL = BASE_URL+"user/customer-service/"
var COOKIE_URL = BASE_URL;
//var SEARCH_QUERY =  BASE_URL+"search/?ids=&queryterm=";
var SEARCH_QUERY = "https://www.coupons.com/coupon-codes/search/?queryterm="
//CDN
var CDN = 'https://quotientmedia.blob.core.windows.net/mediacontainer/';
var API_SECRET="ZnUzcDFtc1RWOHR5aUNON0Z3QjJtV2dyblVwSzRkNlhoekh2Y1JhdUVzRzNaZURYZEs1WWIyUlo="
module.exports = {
	MAX_CASHBACK_COUPONS: MAX_CASHBACK_COUPONS,
	MERCHANT_COUPONS : MERCHANT_COUPONS,
	CASHBACK_DETAILS : CASHBACK_DETAILS,
	MERCHANT_SEARCH : MERCHANT_SEARCH,
	CASHBACK_SEARCH : CASHBACK_SEARCH,
	MERCHANT_EXIST : MERCHANT_EXIST,
	REDIRECT_URL : REDIRECT_URL,
	CDN : CDN,
	SIGNIN_URL:SIGNIN_URL,
	userProfile : userProfile,
	CASHBACK_SEARCH_ARRAY : CASHBACK_SEARCH_ARRAY,
	COOKIE_URL : COOKIE_URL,
	SEARCH_QUERY : SEARCH_QUERY,
	BASE_URL : BASE_URL,
	API_SECRET : API_SECRET,
	HELP_URL : HELP_URL
}
