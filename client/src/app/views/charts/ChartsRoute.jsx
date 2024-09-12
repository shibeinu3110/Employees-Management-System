import {EgretLoadable} from "egret";
import ConstantList from "../../appConfig";
const AppEchart = EgretLoadable({
  loader: () => import("./echarts/AppEchart")
});

const AppRechart = EgretLoadable({
  loader: () => import("./recharts/AppRechart")
});

const AppVictoryChart = EgretLoadable({
  loader: () => import("./victory-charts/AppVictoryChart")
});

const AppReactVis = EgretLoadable({
  loader: () => import("./react-vis/AppReactVis")
});

const chartsRoute = [
  {
    path:  ConstantList.ROOT_PATH+"charts/echarts",
    component: AppEchart
  },
  {
    path:  ConstantList.ROOT_PATH+"charts/recharts",
    component: AppRechart
  },
  {
    path:  ConstantList.ROOT_PATH+"charts/victory-charts",
    component: AppVictoryChart
  },
  {
    path:  ConstantList.ROOT_PATH+"charts/react-vis",
    component: AppReactVis
  }
];

export default chartsRoute;
