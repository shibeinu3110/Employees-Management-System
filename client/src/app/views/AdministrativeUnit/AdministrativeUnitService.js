import axios from "axios";
import ConstantList from "../../appConfig";
export const getAllAdministrativeUnits = () => {
  //return axios.get("/api/user/all");
  //alert( axios.defaults.headers.common["Authorization"]);
  return axios.get(ConstantList.API_ENPOINT + "/api/administrativeunit/1/10");
  //return axios.get(ConstantList.API_ENPOINT+"/public/animal/1/10");  
};

// export const getByPage = (searchDto) => {
//   var url = ConstantList.API_ENPOINT + "/api/administrativeunit/" + searchDto.pageIndex + '/' + searchDto.pageSize;
//   return axios.get(url);
// };

export const getByPage = (searchDto) => {
  var url = ConstantList.API_ENPOINT + "/api/AdministrativeUnit/searchByDto" ;
  return axios.post(url, searchDto);
};

export const checkCode = (id, code) => {
  const config = { params: {id: id, code: code } };
  var url = ConstantList.API_ENPOINT+"/api/AdministrativeUnit/checkCode";
  return axios.get(url, config);
};

export const getByPage1 = (searchDto) => {
  var url = ConstantList.API_ENPOINT + "/api/administrativeunit" 
  return axios.get(url, searchDto);
};

export const getUserById = id => {
  var url = ConstantList.API_ENPOINT+ "/api/administrativeunit/" + id;
  return axios.get(url);
};
export const deleteAdministrativeUnit = id => {
  return axios.delete(ConstantList.API_ENPOINT + "/api/administrativeunit/" + id);
};
export const addNewAdministrativeUnit = adminUnit => {
  return axios.post(ConstantList.API_ENPOINT + "/api/administrativeunit", adminUnit);
};
export const updateAdministrativeUnit = adminUnit => {

  return axios.post(ConstantList.API_ENPOINT + "/api/administrativeunit", adminUnit);
};
