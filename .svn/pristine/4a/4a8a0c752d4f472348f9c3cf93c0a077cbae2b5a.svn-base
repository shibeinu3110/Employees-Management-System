import NotFound from "./NotFound";
import { EgretLoadable } from "egret";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
//import ForgotPassword from "./ForgotPassword";
import ConstantList from "../../appConfig";

const SignIn = EgretLoadable({
  loader: () => import("./SignIn")
});
const ViewComponentSignIn = withTranslation()(SignIn);

const SignUp = EgretLoadable({
  loader: () => import("./SignUp_RegisterHealthOrg")
});
const ViewComponentSignUp = withTranslation()(SignUp);

const ForgotPassword = EgretLoadable({
  loader: () => import("./ForgotPassword")
});
const ViewForgotPassword = withTranslation()(ForgotPassword)

const settings = {
  activeLayout: "layout1",
  layout1Settings: {
    topbar: {
      show: false
    },
    leftSidebar: {
      show: false,
      mode: "close"
    }
  },
  layout2Settings: {
    mode: "full",
    topbar: {
      show: false
    },
    navbar: { show: false }
  },
  secondarySidebar: { show: false },
  footer: { show: false }
};

const sessionRoutes = [
  // {
  //   path: ConstantList.ROOT_PATH+"session/signupregisterhealthorg",
  //   component: ViewComponentSignUp,
  //   settings
  // },
  {
    path: ConstantList.ROOT_PATH+"session/signin",
    component: ViewComponentSignIn,
    settings
  },
  {
    path: ConstantList.ROOT_PATH+"session/forgot-password",
    component: ViewForgotPassword,
    settings
  },
  {
    path: ConstantList.ROOT_PATH+"session/404",
    component: NotFound,
    settings
  }
];

export default sessionRoutes;
