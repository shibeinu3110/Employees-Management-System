import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const LearningManagement = EgretLoadable({
  loader: () => import("./LearningManagement")
});
const Analytics = EgretLoadable({
  loader: () => import("./Analytics")
});
const Sales = EgretLoadable({
  loader: () => import("./Sales")
});
const Dashboard1 = EgretLoadable({
  loader: () => import("./Dashboard1")
});
const ViewAnalytics = withTranslation()(Analytics);
const dashboardRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"dashboard/analytics",
    component: ViewAnalytics,
    auth: authRoles.admin
  },
  {
    path:  ConstantList.ROOT_PATH+"dashboard/sales",
    component: Sales,
    auth: authRoles.admin
  },
  // {
  //   path:  ConstantList.ROOT_PATH+"dashboard/dashboard1",
  //   component: Dashboard1
  // },
  {
    path:  ConstantList.ROOT_PATH+"dashboard/learning-management",
    component: LearningManagement,
    auth: authRoles.admin
  }
];

export default dashboardRoutes;
