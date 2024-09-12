import axios from "axios";
import localStorageService from "./localStorageService";
import ConstantList from "../appConfig";
import UserService from "./UserService";
import history from "history.js";
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization':'Basic Y29yZV9jbGllbnQ6c2VjcmV0'
  }
}
class MenuService {
  async getListMenuItem (){
    let url = ConstantList.API_ENPOINT + "/api/menuitem/getallroot";
    return await axios.get(url);
  };

  async getAllMenuItemByRoleList (){
    var url = ConstantList.API_ENPOINT + "/api/menuitem/getmenubyuser";
    return axios.get(url);
  };
}

export default new MenuService();
