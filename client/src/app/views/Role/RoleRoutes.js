import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const Role = EgretLoadable({
  loader: () => import("./Role")
});
const ViewComponent = withTranslation()(Role);

const RoleRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"user_manager/role",
    exact: true,
    component: ViewComponent
  }
];

export default RoleRoutes;
