import axios from "axios";

const instance = axios.create({
  baseURL: `https://ga-mobile-api.loklok.tv/cms/app`,
  withCredentials: false,
  headers: {
    lang: "en",
    versioncode: "11",
    clienttype: "ios_jike_default",
  },
});

export default instance;
