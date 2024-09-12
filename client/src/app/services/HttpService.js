import axios from "axios";
import UserService from "./UserService";

const HttpMethods = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
};

const _axios = axios.create();

const configure = () => {
  _axios.interceptors.request.use((config) => {
    // debugger;
    console.log(config);
    const cb = () => {
      //config.header("Access-Control-Allow-Origin", "http://localhost:3000");
      //config.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      //config.headers['Access-Control-Allow-Origin']= "http://localhost:3000";
      //config.headers['Access-Control-Allow-Methods'] ="Origin, X-Requested-With, Content-Type, Accept";      
      config.headers.Authorization = `Bearer ${UserService.getToken()}`;
      return Promise.resolve(config);
    };
    return UserService.updateToken(cb);
  });
};

const onError = ()=>{
  _axios.interceptors.response.use(
    res => {
      console.log(res);
      return res;
    },
    err => {
      console.log(err.response.status);
      if (err.response.status === 404) {
        throw new Error(`${err.config.url} not found`);
      }
      throw err;
      // console.log(err.response.status);
      // return err;
    }
  );
} 

const getAxiosClient = () => _axios;

export default {
  HttpMethods,
  configure,
  getAxiosClient,
  onError,
}
