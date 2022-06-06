const axios = require('axios');

const HttpError = require('../models/http-error');

const API_KEY = process.env.API_KEY;

async function getCoordsForAddress(address) {
   const response = await axios.get(
      `http://api.positionstack.com/v1/forward?access_key=${API_KEY}&query=${address}`
   );
   const data = response.data;

   if (!data || data.status === 'ZERO_RESULTS') {
      const error = new HttpError(
         'Could not find location for the specified address.',
         422
      );
      throw error;
   }

   const coordinates = {
      lat: response.data.data[0].latitude,
      lng: response.data.data[0].longitude,
   };
   return coordinates;
}

module.exports = getCoordsForAddress;
