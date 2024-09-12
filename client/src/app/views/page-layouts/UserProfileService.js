import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/users/getCurrentUser";
const API_PATH_HEALTHORG = ConstantList.API_ENPOINT + "/api/UserInHealthOrg/";
const API_PATH_USER = ConstantList.API_ENPOINT + "/api/users/";


export const getCurrentUser = ()=> {
  var url = API_PATH;
  return axios.get(url);
};

export const saveUser = user => {
  return axios.post(API_PATH_USER, user);
};
export const getUserByUsername = (username) => {
  const config = { params: { username: username} };
  var url = API_PATH_USER;
  return axios.get(url, config);
};

export const saveOrUpdateUser = item =>{
  var url = ConstantList.API_ENPOINT + "/api/UserInHealthOrg/saveUser"
  if(item.id){
    return axios.put(url + "/" + item.id, item);
  }

  return axios.post(url, item);
}

export const getListHealthOrgByUser = (userId) => {
  var url = API_PATH_HEALTHORG + 'getListHealthOrgByUser/' + userId;
  return axios.get(url);
};

export const saveItem = item => {
  var url = ConstantList.API_ENPOINT+"/api/HealthOrg";
  if (item.id) {
    return axios.put(url+"/"+item.id, item);
  }
  return axios.post(url, item);
};
