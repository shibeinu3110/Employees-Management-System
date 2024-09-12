import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const Agency = EgretLoadable({
  loader: () => import("./TimeSheet")
});
const ViewComponent = withTranslation()(Agency);
const CategoryRoutesRoutes = [
  {
    path: ConstantList.ROOT_PATH + "directory/timesheet",
    exact: true,
    component: ViewComponent
  }
];

export default CategoryRoutesRoutes;