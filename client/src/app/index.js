import {EgretLoadable} from "egret";

const Layout1 = EgretLoadable({
  loader: () => import("./Layout1/Layout1")
});
const Layout2 = EgretLoadable({
  loader: () => import("./Layout2/Layout2")
});

export const EgretLayouts = {
  layout1: Layout1,
  layout2: Layout2
}