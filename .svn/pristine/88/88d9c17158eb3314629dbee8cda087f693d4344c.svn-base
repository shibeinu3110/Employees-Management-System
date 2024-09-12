import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH_USER = ConstantList.API_ENPOINT + "/api/users/getCurrentUser";

export const getCurrentUser = () => {
  var url = API_PATH_USER;
  return axios.get(url);
};

export const countNumberOfCorrectSampleTube = () => {
  const url =
    ConstantList.API_ENPOINT +
    "/api/EQASampleTube/countNumberOfCorrectSampleTube";
  return axios.get(url);
};

export const countNumberOfIncorrectSampleTube = () => {
  const url =
    ConstantList.API_ENPOINT +
    "/api/EQASampleTube/countNumberOfIncorrectSampleTube";
  return axios.get(url);
};

export const countNumberOfNotSubmittedSampleTube = () => {
  const url =
    ConstantList.API_ENPOINT +
    "/api/EQASampleTube/countNumberOfNotSubmittedSampleTube";
  return axios.get(url);
};

export const countNumberOfHealthOrgEQARound = () => {
  const url =
    ConstantList.API_ENPOINT +
    "/api/HealthOrgEQARound/countNumberOfHealthOrgEQARound";
  return axios.get(url);
};

export const countNumberOfEQARound = () => {
  const url = ConstantList.API_ENPOINT + "/api/EQARound/countNumberOfEQARound";
  return axios.get(url);
};

export const getEQARoundByYear = year => {
  const url =
    ConstantList.API_ENPOINT + "/api/EQARound/getEQARoundsByYear/" + year;
  return axios.get(url);
};

export const getEQARound = () => {
  const searchObject = {
    pageIndex: 1,
    pageSize: 10000000,
    keyword: ""
  };
  const url = ConstantList.API_ENPOINT + "/api/EQARound/search";
  return axios.post(url, searchObject);
};

export const countNumberOfHealthOrgEQARoundByEQARound = () => {
  const url =
    ConstantList.API_ENPOINT +
    "/api/HealthOrgEQARound/countNumberOfHealthOrgEQARoundByEQARound";
  return axios.get(url);
};

export const countSampleTubeByEQARound = roundID => {
  const url =
    ConstantList.API_ENPOINT +
    "/api/EQASampleTube/countSampleTubeByEQARound/" +
    roundID;
  return axios.get(url);
};
