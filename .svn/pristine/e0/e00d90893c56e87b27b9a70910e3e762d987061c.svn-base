import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const User = EgretLoadable({
  loader: () => import("./User")
});
const ViewComponent = withTranslation()(User);

const UserRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"user_manager/user",
    exact: true,
    component: ViewComponent
  }
];

export default UserRoutes;
