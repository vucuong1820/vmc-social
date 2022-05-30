import { PROXY } from "./constants";
import axios from "axios";

const instance = axios.create({
  baseURL: `${PROXY}https://ga-mobile-api.loklok.tv/cms/app`,
  withCredentials: false,
  headers: {
    lang: "en",
    versioncode: "11",
    clienttype: "ios_jike_default",
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

export default instance;
