import "../fake-db";
import "../styles/_app.scss";
import React from "react";
import { Provider } from "react-redux";
import { Router,useHistory } from "react-router-dom";
import EgretTheme from "./EgretLayout/EgretTheme/EgretTheme";
import AppContext from "./appContext";
import history from "history.js";

import "../styles/nprogress.css";
import { loadProgressBar } from "axios-progress-bar";

import routes from "./RootRoutes";
import { Store } from "./redux/Store";
import Auth from "./auth/Auth";
import EgretLayout from "./EgretLayout/EgretLayout";
import AuthGuard from "./auth/AuthGuard";
import axios from "axios";
import { toast } from "react-toastify";
import ConstantList from "../app/appConfig";


// import UserService from "./services/UserService";
// import httpService from "./services/HttpService";

loadProgressBar();
toast.configure();

// axios.interceptors.response.use(
//   res => {
//     // console.log(res);
//     return res;
//   },
//   err => {
//     if (err.response.status === 401) {
//       // debugger;
//       toast.error("Phiên làm việc đã hết hạn");
//       // let history = useHistory();
//       // return (<Redirect to={ConstantList.ROOT_PATH + "session/signin"} />)
//       // console.log(Router);
//       // history.push(`/session/signin`);
//       window.location = 'session/signin';
//     }
//     if (err.response.status === 404) {
//       debugger;
//       toast.error("Hàm không tồn tại");
//     }
//     throw err;
//   }
// );

const App = () => {
  return (
    <AppContext.Provider value={{ routes }}>
      <Provider store={Store}>
        <EgretTheme>
          <Auth>
            <Router history={history}>
              <AuthGuard>
                <EgretLayout />
              </AuthGuard>
            </Router>
          </Auth>
        </EgretTheme>
      </Provider>
    </AppContext.Provider>
  );
};

export default App;
