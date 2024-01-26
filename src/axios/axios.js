import axios from "axios";

//Creating and exporting new instance of axios along with baseURL for back end database based on actor Id
const axios = axios.create({
  baseURL: `https://api.themoviedb.org/3/person/${actorId}?api_key=${key}&language=en-US`,
});

export default axios;
