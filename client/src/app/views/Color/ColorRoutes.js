import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const Color = EgretLoadable({
  loader: () => import("./Color")
});
const ViewComponent = withTranslation()(Color);
const ColorRoutes = [
  {
    path: ConstantList.ROOT_PATH + "directory/color",
    exact: true,
    component: ViewComponent
  }
];

export default ColorRoutes;