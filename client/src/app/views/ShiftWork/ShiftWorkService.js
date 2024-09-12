import axios from 'axios';

import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/shiftwork/"
export const addItem = (data)=>{
    return axios.post(API_PATH, data)
}

export const pageItem = (page,rowPerPAge)=>{
    return axios.get(API_PATH+`${page}/${rowPerPAge}`);
}

export const deleteItem = (id) =>{
    return axios.delete(API_PATH + `${id}`, id)
}

export const getItemById = (id) => {
    return axios.get(API_PATH + `${id}`, null)
}

export const updateItem = (data)=>{
    return axios.post(API_PATH, data)
}
export const searchItem = (param)=>{
    return axios.post(API_PATH+"searchByPage",param)
}
export const searchByPage = dto => {
    return axios.post(API_PATH + "searchByPage", dto);
  };
  
