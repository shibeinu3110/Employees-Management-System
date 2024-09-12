import Cookies from 'universal-cookie';
//import { useCookies } from 'react-cookie';
const cookies = new Cookies();   
class localStorageService {
  ls = window.localStorage;
  sessionStorage = window.sessionStorage;
  setItem(key, value) {
    cookies.set(key,value, { path: '/' });
    return true
  }

  getItem(key) {
    let value = cookies.get(key);
    return value;
  }

  removeItem(key) {
    cookies.remove(key, { path: '/' });
  }
  getLoginUser(){
    return this.getItem('auth_user');
  }
  setSessionItem(key, value){
    value = JSON.stringify(value)
    this.sessionStorage.setItem(key,value);
  }

  getSessionItem(key){
    let value = this.sessionStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch (e) {
      return null
    }
  }
  removeSessionItem(key){
    this.sessionStorage.removeItem(key)
  }

  setLocalStorageItem(key, value){
    value = JSON.stringify(value)
    this.ls.setItem(key,value);
  }

  getLocalStorageItem(key){
    let value = this.ls.getItem(key)
    try {
      return JSON.parse(value)
    } catch (e) {
      return null
    }
  }
  removeLocalStorageItem(key){
    this.ls.removeItem(key)
  }
}

export default new localStorageService();