import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH_ROLE = ConstantList.API_ENPOINT + "/api/roles/";

export const searchByPage = (page, pageSize) => {
  var params = page + "/" + pageSize;
  var url = API_PATH_ROLE + params;
  return axios.get(url);
};
