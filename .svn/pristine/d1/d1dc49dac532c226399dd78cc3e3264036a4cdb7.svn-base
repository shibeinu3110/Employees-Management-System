import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const EgretCalendar = EgretLoadable({
  loader: () => import("./EgretCalendar")
});

const calendarRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"calendar",
    exact: true,
    component: EgretCalendar
  }
];

export default calendarRoutes;
