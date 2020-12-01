import axios from 'axios';

const baseUrl = 'https://api.spaceXdata.com/v3/launches?limit=10';
const makeUrlQuery = filters => {
  let queryString = '';
  Object.keys(filters).forEach(key => {
    if (filters[key]) {
      queryString += `&${key}=${filters[key]}`;
    }
  });
  return queryString;
};

const getLaunchData = (launch_year, launch_success, land_success) =>
  axios
    .get(
      `${baseUrl}${makeUrlQuery({
        launch_success,
        launch_year,
        land_success
      })}`
    )
    .then(res => {
      return res.data;
    });

export default {
  getLaunchData
};
