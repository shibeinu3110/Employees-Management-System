import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/commonobject";

export const searchByText = (text, pageIndex, pageSize) => {
  var url = API_PATH + "/searchByText/"+ pageIndex + '/' +  pageSize;
  return axios.post(url, {keyword: text});
};

export const getByPage = (page, pageSize) => {
  var API_PATH = ConstantList.API_ENPOINT + "/api/commonobject";
  var pageIndex = page + 1;
  var params = '/'+ pageIndex + "/" + pageSize;
  var url = API_PATH + params;
  return axios.get(url);
};
export const getCommonObjectByCode = (code) => {
  var API_PATH = ConstantList.API_ENPOINT + "/api/commonobject";
  var params = '/list/objecttypecode';
  var url = API_PATH + params;
  return axios.post(url, {code:code});
};

export const getItemById = id => {
  var API_PATH = ConstantList.API_ENPOINT + "/api/commonobject";
  var url = API_PATH + "/" + id;
  return axios.get(url);
};
export const deleteItem = id => {
  var API_PATH = ConstantList.API_ENPOINT + "/api/commonobject";
  var url = API_PATH + "/" + id;
  return axios.delete(url);
};
export const saveItem = item => {
  var API_PATH = ConstantList.API_ENPOINT + "/api/commonobject";
  var url = API_PATH;
  return axios.post(url, item);
};

export const checkCode = (id, code) => {
  var API_PATH = ConstantList.API_ENPOINT + "/api/commonobject";
  const config = { params: { id: id, code: code } };
  var url = API_PATH + "/checkCode";
  return axios.get(url, config);
};

export const searchByPage = (searchObject) => {
  var url = API_PATH + "/searchByPage";
  return axios.post(url, searchObject);
};

export const deleteCheckItem = id => {
  return axios.delete(API_PATH + "/delete/"+id);
};