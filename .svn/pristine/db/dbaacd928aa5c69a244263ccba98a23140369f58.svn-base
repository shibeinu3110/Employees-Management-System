import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const PersonnelTable = EgretLoadable({
  loader: () => import("./Personnel")
});
const ViewComponent = withTranslation()(PersonnelTable);

const PersonnelRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"dashboard/personnel",
    exact: true,
    component: ViewComponent
  }
];

export default PersonnelRoutes;
