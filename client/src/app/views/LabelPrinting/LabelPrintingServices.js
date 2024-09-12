import axios from "axios";
import ConstantList from "../../appConfig";

export const exportLabelsToExcel = sampleSetID => {
  const url =
    ConstantList.API_ENPOINT +
    "/api/fileDownload/exportExcel_detailSampleSet/" +
    sampleSetID;
  return axios.get(url, { responseType: "arraybuffer" });
};

export const getSampleSetByRoundID = roundID => {
  const url =
    ConstantList.API_ENPOINT +
    "/api/EQASampleSet/getSampleSetByRoundID/" +
    roundID;
  return axios.get(url);
};
