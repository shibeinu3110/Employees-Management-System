import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';

const Landing1 = EgretLoadable({
  loader: () => import("./Landing1")
});
const Landing2 = EgretLoadable({
  loader: () => import("./Landing2")
});
const Landing3 = EgretLoadable({
  loader: () => import("./Landing3")
});
const ViewComponentLanding3 = withTranslation()(Landing3);

const homeLayoutSettings = {
  layout1Settings: {
    mode: "full",
    leftSidebar: { show: false, mode: "closed" },
    topbar: { show: false },
  },
  layout2Settings: {
    mode: "full",
    topbar: { show: false },
    navbar: { show: false },
  },
  perfectScrollbar: false,
  footer: { show: false }
}

const homeRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"landing1",
    component: Landing1,
    settings: homeLayoutSettings
  },
  {
    path:  ConstantList.ROOT_PATH+"landing2",
    component: Landing2,
    settings: homeLayoutSettings
  },
  {
    path:  ConstantList.ROOT_PATH+"landing3",
    component: ViewComponentLanding3,
    settings: homeLayoutSettings
  }
];

export default homeRoutes;
