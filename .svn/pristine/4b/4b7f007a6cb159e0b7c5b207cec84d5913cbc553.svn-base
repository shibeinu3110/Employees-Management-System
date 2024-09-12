import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/public";
const API_PATH_EQARound = API_PATH + "/EQARound";
const API_PATH_HealthOrgType = API_PATH + "/HealthOrgType";

export const getAllEQARound = () => {
  let searchObject = {};
  searchObject.pageIndex = 1;
  searchObject.pageSize = 1000;
  var url = API_PATH_EQARound + "/search";
  return axios.post(url, searchObject);
};

export const getAllHealthOrgType = () => {
  let searchObject = {};
  searchObject.pageIndex = 1;
  searchObject.pageSize = 1000;
  var url = API_PATH_HealthOrgType + "/search";
  return axios.post(url, searchObject);
};

export const signUpAndCreateHealthOrg = item => {
  var url = API_PATH + "/signUpAndCreateHealthOrg";
  return axios.post(url, item);
};

export const checkUsername = item => {
  var url = API_PATH + "/checkUsername";
  return axios.post(url, item);
};

export const checkEmail = item => {
  var url = API_PATH + "/checkEmail";
  return axios.post(url, item);
};
