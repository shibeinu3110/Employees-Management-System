import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/department";
const API_PATH_ASSET = ConstantList.API_ENPOINT + "/api/assetDepartment";

export const checkCode = (id, code) => {
  // var API_PATH = ConstantList.API_ENPOINT + "/api/department";
  const config = { params: { id: id, code: code } };
  var url = API_PATH_ASSET + "/checkCode";
  return axios.get(url, config);
};

export const searchByPageDeparment = (searchObject) => {
  var url = API_PATH_ASSET + "/searchByPageDeparment";
  return axios.post(url, searchObject);
};

export const searchByPage = (searchObject) => {
  var url = API_PATH_ASSET + "/searchByPage";
  return axios.post(url, searchObject);
};

export const searchParentByPage = (searchObject) => {
  var url = API_PATH_ASSET + "/searchParentByPage";
  return axios.post(url, searchObject);
};

export const getAll = () => {
  var url = API_PATH + "/all";
  return axios.get(url);
};

export const getTreeView = () => {
  var url = API_PATH + "/tree/1/10000000";
  return axios.get(url);
};

export const getByPage = (page, pageSize) => {
  var API_PATH = ConstantList.API_ENPOINT + "/api/department/";
  var pageIndex = page + 1;
  var params = pageIndex + "/" + pageSize;
  var url = API_PATH + params;
  return axios.get(url);
};

export const getItemById = id => {
  var url = API_PATH_ASSET + "/findDepartmentById/" + id;
  return axios.get(url);
};
export const deleteItem = id => {
  var API_PATH = API_PATH_ASSET + "/delete";
  var url = API_PATH + "/" + id;
  return axios.delete(url);
};
export const saveItem = item => {
  return axios.post(API_PATH_ASSET, item);
};
export const checkParent = (dto) => {
  var url = API_PATH_ASSET + "/checkParent";
  return axios.post(url, dto);
};


