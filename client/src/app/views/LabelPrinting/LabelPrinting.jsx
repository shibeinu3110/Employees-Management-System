import React, { Component } from "react";
import {
  Grid,
  IconButton,
  Icon,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField
} from "@material-ui/core";
import { Breadcrumb, ConfirmationDialog } from "egret";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import { searchByPage as getAllEQARound } from "../EQARound/EQARoundService.js";
import {
  exportLabelsToExcel,
  getSampleSetByRoundID
} from "./LabelPrintingServices";
import { saveAs } from "file-saver";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class HealthOrgLevelTable extends Component {
  state = {
    keyword: "",
    rowsPerPage: 5,
    page: 0,
    shouldOpenConfirmationDialog: false,
    totalElements: 0,
    eqaRoundList: [],
    currentRound: null,
    sampleSetList: [],
    selectedID: null
  };

  updatePageData = () => {
    const { currentRound } = this.state;
    if (currentRound != null) {
      getSampleSetByRoundID(currentRound.id).then(res => {
        // console.log("DATA", res.data);
        this.setState({
          sampleSetList: res.data
        });
      });
    } else {
      this.setState({
        sampleSetList: []
      });
    }
  };

  componentDidMount() {
    const searchObject = { pageIndex: 0, pageSize: 1000000 };
    getAllEQARound(searchObject).then(res => {
      this.setState({ eqaRoundList: res.data.content });
    });
  }

  handleSelectEQARound = round => {
    this.setState(
      {
        currentRound: round
      },
      () => {
        this.updatePageData();
      }
    );
  };

  handleExportToExcel = sampleSetID => {
    exportLabelsToExcel(sampleSetID).then(result => {
      const url = window.URL.createObjectURL(new Blob([result.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "MaOng.xlsx");
      document.body.appendChild(link);
      link.click();
    });
  };

  render() {
    const { t, i18n } = this.props;
    const { currentRound, eqaRoundList, sampleSetList } = this.state;
    return (
      <div className="m-sm-30">
        <Helmet>
          <title>
            {t("LabelPrinting.title")} | {t("web_site")}
          </title>
        </Helmet>
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: t("LabelPrinting.title") }]} />
        </div>

        <Grid container spacing={3}>
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <Autocomplete
              size="small"
              id="combo-box"
              options={eqaRoundList}
              className="flex-end"
              getOptionLabel={option =>
                option.code != null && typeof option.code != "undefined"
                  ? option.code
                  : ""
              }
              onChange={(event, newValue) =>
                this.handleSelectEQARound(newValue)
              }
              value={currentRound}
              renderInput={params => (
                <TextField
                  {...params}
                  label={t("EQAResultReportConclusion.select_eqa_round")}
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead style ={{backgroundColor: '#358600',
                  color:'#fff',}}>
                  <TableRow style ={{color:'#fff',}}>
                  <TableCell style ={{color:'#fff', width: "90px"}}>{t("LabelPrinting.export_to_excel")}</TableCell>
                    <TableCell style ={{color:'#fff',}}>{t("LabelPrinting.sample_set_name")}</TableCell>
                    <TableCell style ={{color:'#fff',}} align="left">
                      {t("LabelPrinting.sample_set_detail_code")}
                    </TableCell>
                    {sampleSetList[0]?.details.map((data, index) => {
                      if (index != sampleSetList[0]?.details.length - 1)
                        return <TableCell> </TableCell>;
                    })}
                    {/* <TableCell>{t("LabelPrinting.export_to_excel")}</TableCell> */}
                  </TableRow>
                </TableHead>
                {sampleSetList.length > 0 && (
                  <TableBody>
                  
                    {sampleSetList.map(data => (
                      <TableRow key={data.id}>
                      <TableCell>
                          <IconButton size="small"
                            onClick={() => this.handleExportToExcel(data.id)}
                          >
                            <Icon fontSize="small"
                              title={t("LabelPrinting.export_to_excel")}
                              color="primary"
                            >
                              get_app
                            </Icon>
                          </IconButton>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {data.name}
                        </TableCell>
                        {data.details.map(childData => (
                          <TableCell key={childData.id} align="left">
                            {childData.code}
                            {/* ({childData.sample.code}) */}
                          </TableCell>
                        ))}
                        {/* <TableCell>
                          <IconButton
                            onClick={() => this.handleExportToExcel(data.id)}
                          >
                            <Icon
                              title={t("LabelPrinting.export_to_excel")}
                              color="primary"
                            >
                              get_app
                            </Icon>
                          </IconButton>
                        </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default HealthOrgLevelTable;
