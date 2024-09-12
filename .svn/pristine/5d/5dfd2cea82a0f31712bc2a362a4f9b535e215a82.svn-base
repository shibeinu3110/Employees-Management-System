import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const AdministrativeUnitTable = EgretLoadable({
  loader: () => import("./AdministrativeUnitTable")
});
const React15TabulatorSample = EgretLoadable({
	  loader: () => import("./React15TabulatorSample")
	});
const ViewComponent = withTranslation()(AdministrativeUnitTable);
const ViewTabuComponent = withTranslation()(React15TabulatorSample);

const administrativeUnitRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"dashboard/AdministrativeUnits",
    exact: true,
    component: ViewComponent
  },
  {
	    path:  ConstantList.ROOT_PATH+"dashboard/TabuAdministrativeUnits",
	    exact: true,
	    component: ViewTabuComponent
  }  
];

export default administrativeUnitRoutes;
