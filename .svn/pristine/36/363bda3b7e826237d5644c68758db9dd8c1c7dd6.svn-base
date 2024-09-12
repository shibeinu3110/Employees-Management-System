import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from "react-i18next";
const LabelPrinting = EgretLoadable({
  loader: () => import("./LabelPrinting")
});
const ViewComponent = withTranslation()(LabelPrinting);

const labelPrintingRoutes = [
  {
    path: ConstantList.ROOT_PATH + "label-printing",
    exact: true,
    component: ViewComponent
  }
];

export default labelPrintingRoutes;
