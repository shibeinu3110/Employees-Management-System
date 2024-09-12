import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/oauth/hr/checkout";
// const API_PATH_2 = ConstantList.API_ENPOINT + "/api/hrEthnics";

export const getAllItem = (pageIndex, pageSize) => {
  return axios.get(API_PATH + "/" + pageIndex + "/" + pageSize);
};

export const addNewItem = item => {
  return axios.post(API_PATH , item);
};

export const deleteItem = (id) => {
  return axios.delete(API_PATH + "/" + id);
};

export const updateItem = (item) => {
  var url = API_PATH + "/" + item.id;
  return axios.put(url, item);
};

export const getItemById = (id) => {
  return axios.get(API_PATH + "/" + id);
};

export const checkCode = (data) => {
  var url = API_PATH + "/checkCode";
  return axios.post(url, data);
};

export const searchByPage = (searchObject) => {
  var url = API_PATH + "/searchByPage";
  return axios.post(url, searchObject);
};
