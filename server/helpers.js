const axios = require('axios');
const Promise = require('promise');
const { GOOGLE_NL_API_KEY } = require('./config');
const webshot = require('webshot');
const gCal = require('google-calendar');

const parseMeaningWithGoogleAPI = content => (
  axios.post(
    `https://language.googleapis.com/v1/documents:analyzeEntities?key=${GOOGLE_NL_API_KEY}`,
    { document: {
      type: 'PLAIN_TEXT',
      content,
    } } // eslint-disable-line
  )
    .then(({ data: { entities } }) => (
      entities.slice(0, 5).reduce((tv, cv) => tv.concat(' ', cv.name), '')
    ))
);


const defaultOptions = {
  streamType: 'pdf',
  windowSize: {
    width: 1024,
    height: 786,
  },
  shotSize: {
    width: 'all',
    height: 'all',
  },
};

const makePDF = (url, fileName, callback, options = {}) => {
  // const finalOptions = {
  //   // ...defaultOptions,
  //   // ...options,
  // };

  const finalOptions = Object.assign(defaultOptions, options);
  const filePath = `PDFs/${fileName}.pdf`;
  webshot(url, filePath, finalOptions, (err) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, err);
    }
  });
};

const getCalendarList = accessToken => new Promise((resolve, reject) => {
  console.log('access token:', accessToken);
  const googleCalendar = new gCal.GoogleCalendar(accessToken);
  googleCalendar.calendarList.list((err, calendarList) => {
    if (err) reject(err);
    else resolve(calendarList);
  });
});

// const getCalendarFreeBusy = (timeMin, timeMax, calList, accessToken) => {
//   console.log('CallList:', calList);
//   const googleCalendar = new gCal.GoogleCalendar(accessToken);
//   googleCalendar.freebusy.query({
//     timeMin,
//     timeMax,
//     items: calList,
//   }, { resource: {
//       items: calList,
//       timeZone: 'Asia/Colombo',
//     }
//     // groupExpansionMax: 4,
//     // calendarExpansionMax: 4,
//   }, (err, freeBusyList) => {
//     if (err) console.log('FreeBusy Err:', err);
//     else console.log('FreeBusyList:', freeBusyList);
//   });

  // return axios({
  //   url: 'https://www.googleapis.com/calendar/v3/freeBusy',
  //   method: 'post',
  //   params: { access_token: accessToken },
  //   data: {
  //     timeMin,
  //     timeMax,
  //   },
  // });
};

module.exports = {
  parseMeaningWithGoogleAPI,
  makePDF,
  getCalendarList,
  getCalendarFreeBusy,
};
