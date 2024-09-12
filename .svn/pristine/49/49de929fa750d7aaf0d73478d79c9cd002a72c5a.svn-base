import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/users/";
const API_PATH_ROLE = ConstantList.API_ENPOINT + "/api/roles/";
const API_PATH_HEALTHORG = ConstantList.API_ENPOINT + "/api/UserInHealthOrg/";

export const searchByPage = (page, pageSize) => {
  var params = page + "/" + pageSize;
  var url = API_PATH + params;
  return axios.get(url);
};

export const findUserByUserName = (username, page, pageSize) => {
  var params = "username/" + username + "/" + page + "/" + pageSize;
  var url = API_PATH + params;
  return axios.get(url);
};

export const SearchUserByUserName = (username, page, pageSize) => {
  var params = page + "/" + pageSize +"/"+ username;
  var url = API_PATH + params;
  return axios.get(url);
};

export const getAllRoles = () => {
  var url = API_PATH_ROLE + 'all';
  return axios.get(url);
};

export const getItemById = id => {
  var url = API_PATH + id;
  return axios.get(url);
};


export const getUserByUsername = (username) => {
  const config = { params: { username: username} };
  var url = API_PATH;
  return axios.get(url, config);
};
export const getUserByEmail = (email) =>{
  // const config = { params: { email: email} };
  var url = ConstantList.API_ENPOINT + "/public/checkEmail"
  return axios.post(url, email);
}

export const saveHealthOrgByUser = (userId, healthOrgIds) => {
  
  var url = API_PATH_HEALTHORG + 'save/' +userId;
  return axios.post(url,healthOrgIds);
};

export const getListHealthOrgByUser = (userId) => {
  //const config = { params: { userId: userId} };
  var url = API_PATH_HEALTHORG + 'getListHealthOrgByUser/' + userId;
  return axios.get(url);
};

export const saveUser = user => {
  return axios.post(API_PATH, user);
};
export const searchByDto = (searchObject) => {
  var url = API_PATH_HEALTHORG + "searchByDto";
  return axios.post(url,searchObject);  
};
export const getCurrentUser = () => {
  var url = API_PATH + "getCurrentUser";
  return axios.get(url);  
};

