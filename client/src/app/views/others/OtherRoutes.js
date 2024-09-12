import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const Pricing = EgretLoadable({
  loader: () => import("./Pricing")
});

const otherRoutes = [
  {
    path: ConstantList.ROOT_PATH+"others/pricing",
    component: Pricing
  }
];

export default otherRoutes;
