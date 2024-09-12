import axios from "axios";
import ConstantList from "../../appConfig";
import history from "history.js";
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization':'Basic Y29yZV9jbGllbnQ6c2VjcmV0'
  }
}
class MenuItemService {
  getMenuItem(menu){
    var item ={};
    item.data = menu;
    if(menu.children){
      item.children = [];
      menu.children.forEach(child=>{
        var value = this.getMenuItem(child);
        item.children.push(value);
      });
    }
    return item;
  }
  async getListMenuItem (){
    let url = ConstantList.API_ENPOINT + "/api/menuitem/getallroot";
    var treeValues = [];
    var res = await axios.get(url).then(res=>{
       var data = res.data;
        data.forEach(item=>{
          var treeItem = this.getMenuItem(item);
          treeValues.push(treeItem);
        })
    })
    console.log(treeValues);
    return treeValues;
    //alert(treeValues);
    //alert(treeValues.length);
  };

  async getAllMenuItemByRoleList (){
    var url = ConstantList.API_ENPOINT + "/api/menuitem/getmenubyuser";
    return axios.get(url);
  };

  async getAllByRoot (){
    var url = ConstantList.API_ENPOINT + "/api/menuitem/getallroot";
    return axios.get(url);
  };
}

export default new MenuItemService();
