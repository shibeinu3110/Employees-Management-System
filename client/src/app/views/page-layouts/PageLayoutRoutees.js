import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';

const LeftSidebarLayout = EgretLoadable({
  loader: () => import("./LeftSidebarCard")
});

const UserProfile = EgretLoadable({
  loader: () => import("./UserProfile")
});
const ViewComponent = withTranslation()(UserProfile);

const pageLayoutRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"page-layouts/Left-sidebar-card",
    component: LeftSidebarLayout
  },
  {
    path:  ConstantList.ROOT_PATH+"page-layouts/user-profile",
    component: ViewComponent
  }
];

export default pageLayoutRoutes;
