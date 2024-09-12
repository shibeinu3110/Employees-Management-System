import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const CommonObject = EgretLoadable({
  loader: () => import("./CommonObject")
});
const ViewComponent = withTranslation()(CommonObject);

const CommonObjectRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"list/commonobject",
    exact: true,
    component: ViewComponent
  }
];

export default CommonObjectRoutes;
