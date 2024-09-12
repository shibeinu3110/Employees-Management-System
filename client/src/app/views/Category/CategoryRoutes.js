import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const Agency = EgretLoadable({
  loader: () => import("./Category")
});
const ViewComponent = withTranslation()(Agency);
const CategoryRoutesRoutes = [
  {
    path: ConstantList.ROOT_PATH + "directory/category",
    exact: true,
    component: ViewComponent
  }
];

export default CategoryRoutesRoutes;