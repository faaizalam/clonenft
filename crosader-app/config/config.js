import axios from "axios";
import { hasCookie, getCookie } from "cookies-next";
// export const BASEURL = "https://api.crosader.com";
// export const LOCALURL = "https://api.crosader.com";
// export const DOMAIN = "https://api.crosader.com";
// export const CLIETNURL = "https://api.crosader.com";

// test
export const BASEURL = "https://stg-api.crosader.com/";
export const LOCALURL = "https://stg-api.crosader.com/";
export const DOMAIN = "https://stg-api.crosader.com/";
export const CLIETNURL = "https://stg-api.crosader.com/";

export const serverAxios = axios.create({
  baseURL: BASEURL,
});

const localAxios = axios.create({
  baseURL: LOCALURL,
});

localAxios.interceptors.request.use(function (config) {
  const cookiesOptions = {
    path: "/",
    domain: DOMAIN,
  };

  if (hasCookie("token", cookiesOptions)) {
    const token = getCookie("token", cookiesOptions);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default localAxios;
