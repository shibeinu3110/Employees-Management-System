import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/public";
const API_PATH_EQARound = API_PATH + "/EQARound";
const API_PATH_HealthOrgType = API_PATH + "/HealthOrgType";

export const getCurrentEQARound = () => {
  var url = API_PATH_EQARound+"/getCurrent";
  return axios.get(url);
};
