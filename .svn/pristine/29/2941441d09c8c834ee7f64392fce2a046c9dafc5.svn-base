import axios from 'axios';
import ConstantList from "../../appConfig";
export const getAllEvents = () => {
    return axios.get(ConstantList.ROOT_PATH+"api/calendar/events/all");
}

export const addNewEvent = (event) => {
    return axios.post(ConstantList.ROOT_PATH+"api/calendar/events/add",event);
}

export const updateEvent = (event) => {
    return axios.post(ConstantList.ROOT_PATH+"api/calendar/events/update",event);
}

export const deleteEvent = (event) => {
    return axios.post(ConstantList.ROOT_PATH+"api/calendar/events/delete",event);
}