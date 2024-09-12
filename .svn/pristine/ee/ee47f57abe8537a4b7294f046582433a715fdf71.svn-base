import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const BasicForm = EgretLoadable({
  loader: () => import("./BasicForm")
});

const EditorForm = EgretLoadable({
  loader: () => import("./EditorForm")
});

const WizardForm = EgretLoadable({
  loader: () => import("./WizardForm")
});

const UploadForm = EgretLoadable({
  loader: () => import("./UploadForm")
});

const formsRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"forms/basic",
    component: BasicForm
  },
  {
    path:  ConstantList.ROOT_PATH+"forms/editor",
    component: EditorForm
  },
  {
    path:  ConstantList.ROOT_PATH+"forms/upload",
    component: UploadForm
  },
  {
    path:  ConstantList.ROOT_PATH+"forms/wizard",
    component: WizardForm
  }
];

export default formsRoutes;
