import axios from 'axios';
import baseUrl from '../../utils/constants';

// // Vuex store
// import { store } from '~/store'

// export default () => axios.create({
//   baseURL: baseUrl
//   ,headers: {
//         'X-LOCATION-TIME': `${getTodaysDate()} ${getFormattedTime(currentUnixTimeStamp)}`
//       }
//   // headers: {'authorization': store.getters.getToken ? store.getters.getToken : 'None'}
// });


const currentUnixTimeStamp = Math.round((new Date()).getTime() / 1000);
// export default () => axios.create({
//   baseURL: baseUrl,
//   headers: {
//     'X-LOCATION-TIME': `${getTodaysDate()} ${getFormattedTime(currentUnixTimeStamp)}`
//   }
// });

export default
{
 getTodaysDate() {
    
  
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; // January is 0!
  const yyyy = today.getFullYear();

  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }
  today = `${yyyy}-${mm}-${dd}`;

  return today;
} ,

  

  getFormattedTime (unixTimestamp) {
 
   const date = new Date(unixTimestamp * 1000);
  // Hours part from the timestamp
  const hours = getDoubleDigitNumber(date.getHours());
  // Minutes part from the timestamp
  const minutes = getDoubleDigitNumber(date.getMinutes());
  // Seconds part from the timestamp
  const seconds = getDoubleDigitNumber(date.getSeconds());

  // Will display time in 10:30:23 format
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return formattedTime;
}
}

function getDoubleDigitNumber (number) {
  return number < 10 ? `${parseInt(`${0}`, 10)}${number}` : number;
} 

