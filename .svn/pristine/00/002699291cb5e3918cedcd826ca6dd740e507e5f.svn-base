import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/public";

export const saveAngency = (Angency, UserId) => {
  var url = API_PATH + "/" + UserId;
  return axios.post(url, Angency);
};

export const checkSignUp = (KeyWord) => {
  var url = API_PATH + "/" + KeyWord;
  return axios.post(url);
};

export const createOffer = (AgencyId) => {
  var url = API_PATH + "/signup/createOffer/" + AgencyId;
  return axios.post(url);
};

export const createUser = (User) => {
  var url = API_PATH + "/signup";
  return axios({
    method: "post",
    url: url,
    data: User,
  });
};

export const checkEmail = (agency) => {
  var url = API_PATH + "/checkEmail";
  return axios.post(url, agency);
};

export const checkUsername = (agency) => {
  var url = API_PATH + "/checkUsername";
  return axios.post(url, agency);
};

// Only need email to getToken
export const forgotPassword = (user) => {
  var url = API_PATH + "/resetPassword";

  return axios.post(url, user);
};

// Email and password to save user
export const confirmForgotPassword = (token, id) => {
  var url = API_PATH + `/confirmResetPassword`;
  const params = {
    token: token,
    id: id,
  };
  return axios({ method: "get", url: url, params: params });
};

export const resetPassword = (user, token) => {
  let url = API_PATH + "/saveNewPassword"
  return axios({
    method: "post",
    url: url,
    params: {
      token: token
    },
    data: user
  })
}