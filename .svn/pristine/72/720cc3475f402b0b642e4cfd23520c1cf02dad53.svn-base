import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const CommonObjectType = EgretLoadable({
  loader: () => import("./CommonObjectType")
});
const ViewComponent = withTranslation()(CommonObjectType);

const CommonObjectTypeRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"list/commonobjecttype",
    exact: true,
    component: ViewComponent
  }
];

export default CommonObjectTypeRoutes;
