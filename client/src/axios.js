import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
});
// Add a request interceptor
// Sửa lại dữ liệu trc khi mình gửi API (sửa trên request).
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // Được chạy khi: API đc gửi qua server
    let localStorageData = window.localStorage.getItem("persist:shop/user");
    if (localStorageData && typeof localStorageData === "string") {
      localStorageData = JSON.parse(localStorageData);
      const accessToken = JSON.parse(localStorageData?.token);
      config.headers = { authorization: `Bearer ${accessToken}` };
      return config;
    } else return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
// Data đc trả về server: trc khi trả về client, chạy qua đoạn code (1) dưới để thực thi
// VD: refresh-token
instance.interceptors.response.use(
  function (response) {
    // (1)
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.response.data;
  }
);
export default instance;
