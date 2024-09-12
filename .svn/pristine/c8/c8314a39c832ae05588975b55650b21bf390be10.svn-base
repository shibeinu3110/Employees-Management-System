import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/menuitem";
const API_PATH_ROLE = ConstantList.API_ENPOINT + "/api/roles/";

export const getAllRoles = () => {
  var url = API_PATH_ROLE + 'all';
  return axios.get(url);
};

export const searchByPage = (searchObject) => {
  var url = API_PATH + "/searchByPage";
  return axios.post(url, searchObject);
};
export const getAllItem = () => {
  var url = ConstantList.API_ENPOINT + "/api/menuitem/getall";
  return axios.get(url);
};

export const getFlatRootChild = () => {
  var url = ConstantList.API_ENPOINT + "/api/menuitem/getflatrootchild";
  return axios.get(url);
};

export const getAllMenuItemByRoleList = () => {
  var url = ConstantList.API_ENPOINT + "/api/menuitem/getmenubyuser";
  return axios.get(url);
};

export const getAllByRoot = () => {
  var url = ConstantList.API_ENPOINT + "/api/menuitem/getallroot";
  return axios.get(url);
};

export const getItemById = id => {
  var API_PATH = ConstantList.API_ENPOINT + "/api/menuitem";
  var url = API_PATH + "/" + id;
  return axios.get(url);
};
export const deleteItem = id => {
  var API_PATH = ConstantList.API_ENPOINT + "/api/menuitem";
  var url = API_PATH + "/" + id;
  return axios.delete(url);
};
export const saveItem = item => {
  //console.log(item);
  //alert(item.name);
  var API_PATH = ConstantList.API_ENPOINT + "/api/menuitem";
  var url = API_PATH;
  return axios.post(url, item);
};

