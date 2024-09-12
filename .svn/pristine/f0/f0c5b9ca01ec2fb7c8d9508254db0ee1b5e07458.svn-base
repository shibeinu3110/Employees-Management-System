import {EgretLoadable} from "egret";
import ConstantList from "../../appConfig";
const Color = EgretLoadable({
  loader: () => import("./Color")
});
const Spacing = EgretLoadable({
  loader: () => import("./Spacing")
});
const Typography = EgretLoadable({
  loader: () => import("./Typography")
});
const Display = EgretLoadable({
  loader: () => import("./Display")
});

const utilitiesRoutes = [
  {
    path: '/utilities/color',
    component: Color
  },
  {
    path:  ConstantList.ROOT_PATH+"utilities/spacing",
    component: Spacing
  },
  {
    path:  ConstantList.ROOT_PATH+"utilities/typography",
    component: Typography
  },
  {
    path:  ConstantList.ROOT_PATH+"utilities/display",
    component: Display
  },
]

export default utilitiesRoutes;