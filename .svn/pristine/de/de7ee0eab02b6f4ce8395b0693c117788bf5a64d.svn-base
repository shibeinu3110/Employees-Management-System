import React from "react";
import ConstantList from "../../appConfig";
import { Card, Icon, Fab, withStyles, Grid } from "@material-ui/core";

const styles = theme => ({
  root: {
    background: `url("/assets/images/dots.png"),
    linear-gradient(90deg, ${theme.palette.primary.main} -19.83%, ${theme.palette.primary.light} 189.85%)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%"
  }
});

const numberStyle = { fontSize: "40px" };//, fontFamily: "Arial",  width: "100%"

const titleStyle = { fontSize: "20px" };// fontFamily: "Arial" 

const DashboardWelcomeHealthOrgCard = ({ classes, analytics, t, data }) => {
  return (
    <Grid container spacing={3}>
      <Grid item lg={6} md={6} sm={6} xs={12}>
      <a href = {ConstantList.ROOT_PATH+"register/health_org_register_form"} >
        <Card
          elevation={3}
          className={`p-16 py-28 text-center h-100 w-100 ${classes.root}`}
        >
        
          <div className="font-weight-300 px-80 flex flex-center">
            <div className="text-white margin-auto" style={{ width: "100%" }}>
              <div style={numberStyle}>
              </div>
              <p className="m-0" style={titleStyle}>
                <b>{t("EQAHealthOrgRoundRegister.title_unit")}</b>
              </p>
            </div>
          </div>
          
        </Card>
        </a>
      </Grid>
      <Grid item lg={6} md={6} sm={6} xs={12}>
        <a href={ConstantList.ROOT_PATH + "sample_transfer_status"} >
          <Card
            elevation={3}
            className={`p-16 py-28 text-center h-100 w-100 ${classes.root}`}
          >

            <div className="font-weight-300 px-80 flex flex-center">
              <div className="text-white margin-auto" style={{ width: "100%" }}>
                <div style={numberStyle}>
                </div>
                <p className="m-0" style={titleStyle}>
                  <b>{t("EQAHealthOrgSampleTransferStatus.title")}</b>
                </p>
              </div>
            </div>

          </Card>
        </a>
      </Grid>
      {/* <Grid item lg={8} md={8} sm={8} xs={12}>
        <div style={{color: "blue"}}>
          <p style={{ textAlign: "left", fontSize: "20px" }}>
            <b><u>TỔNG QUAN VỀ HIV - PEQAS</u></b>
          </p>
          <p style={{ textAlign: "center", fontSize: "16px"  }}>
            <b>(Pasteur Institute - External Quality Assessment Scheme)</b>
          </p>
          <p style={{ textAlign: "justify" }}>
            Quản lý chất lượng ngày càng được chú trọng trong công tác xét nghiệm, đặc biệt là trong lĩnh vực nhạy cảm như xét nghiệm huyết thanh học HIV. Bộ Y tế đã có những hướng dẫn xây dựng và đảm bảo chất lượng cho hệ thống các phòng xét nghiệm (PXN) huyết thanh học HIV bao gồm các phòng xét nghiệm sàng lọc và phòng xét nghiệm khẳng định trường hợp HIV dương tính để phục vụ cho việc phát hiện nhiễm HIV. Cùng với mục tiêu 90-90-90, các dịch vụ xét nghiệm HIV tiếp cận cộng đồng phát triển với xu hướng ngày càng tăng nên vai trò của các phòng xét nghiệm sàng lọc ngày càng được nâng cao. Việc tham gia các chương trình ngoại kiểm là một trong những hoạt động cần thiết của PXN nhằm đảm bảo chất lượng xét nghiệm.
          </p>
          <p style={{ textAlign: "justify" }}>
            Với sự hỗ trợ một phần của Trung tâm kiểm soát và phòng ngừa dịch bệnh Hoa Kỳ (USCDC) tại Việt Nam thông qua Quỹ hỗ trợ khẩn cấp của Tổng Thống Mỹ giảm nhẹ tác động của HIV/AIDS (PEPFAR), và theo phân công của Bộ Y Tế, Viện Pasteur Tp. Hồ Chí Minh đã xây dựng chương trình ngoại kiểm xét nghiệm huyết thanh học HIV (HIV-PEQAS) cho các đơn vị thực hiện xét nghiệm tại khu vực phía Nam và Tây Nguyên.
          </p>
          <p style={{ textAlign: "justify" }}>
            Sử dụng bộ mẫu chuẩn đã xác định tình trạng huyết thanh HIV được chuẩn bị từ Viện Pasteur Tp. HCM, các đơn vị tham gia chương trình bao gồm các Trung tâm phòng chống HIV/AIDS của tỉnh, bệnh viện đa khoa tỉnh, các trung tâm y tế và bệnh viện thuộc tuyến quận, huyện sẽ có điều kiện để được đánh giá độc lập từ bên ngoài về chất lượng xét nghiệm huyết thanh học HIV của đơn vị.
          </p>
          <p style={{ textAlign: "justify" }}>
            HIV-PEQAS là một chương trình tự nguyện, các kết quả xét nghiệm của từng đơn vị được giữ bí mật và thông tin sẽ được mã hóa.
          </p>
          <p style={{ textAlign: "justify" }}>Cùng với sự hợp tác của các đơn vị tham gia, chương trình ngoại kiểm huyết thanh học HIV đã, đang và sẽ có những đóng góp thiết thực hơn trong việc đảm bảo chất lượng xét nghiệm huyết thanh học HIV tại tuyến khẳng định và cả tuyến sàng lọc ở khu vực phía Nam và Tây Nguyên. </p>

        </div>

      </Grid>
      <Grid item lg={4} md={4} sm={4} xs={12}>
        <Grid>
        <div style={{color: "blue"}}>
         <p> Thông báo đăng ký chương trình ngoại kiểm HIV năm ..., theo đường dẫn ….</p>
        </div>
        </Grid>
        <Grid></Grid>
      </Grid> */}
      <Grid item lg={12} md={12} sm={12} xs={12}><h3>Kết quả xét nghiệm</h3></Grid>
      <Grid item lg={3} md={3} sm={6} xs={12}>
        <a href={ConstantList.ROOT_PATH + "result-report/elisa"} >
          <Card
            elevation={3}
            className={`py-16 text-center h-100 w-100 ${classes.root}`}
          >

            <div className="font-weight-300 flex flex-center">
              <div className="text-white margin-auto" style={{ width: "100%" }}>
                <div style={numberStyle}>
                  {/* <b>{data.numberOfHealthOrgEQARound.toLocaleString("en-US")}</b> */}
                </div>
                <p className="m-0" style={titleStyle}>
                  <b>{t("EQAResultReportElisa.title")}</b>
                </p>
              </div>
            </div>

          </Card>
        </a>
      </Grid>
      <Grid item lg={3} md={3} sm={6} xs={12}>
        <a href={ConstantList.ROOT_PATH + "result-report/eclia"}>
          <Card
            elevation={3}
            className={`py-16 text-center h-100 w-100 ${classes.root}`}
          >

            <div className="font-weight-300 flex flex-center">
              <div className="text-white margin-auto" style={{ width: "100%" }}>
                <div style={numberStyle}>
                  {/* <b>{data.numberOfEQARound.toLocaleString("en-US")}</b> */}
                </div>
                <p className="m-0" style={titleStyle}>
                  <b>{t("EQAResultReportEclia.title")}</b>
                </p>
              </div>
            </div>

          </Card>
        </a>
      </Grid>
      <Grid item lg={3} md={3} sm={6} xs={12}>
        <a href={ConstantList.ROOT_PATH + "result-report/serodia"}>
          <Card
            elevation={3}
            className={`py-16 text-center h-100 w-100 ${classes.root}`}
          >

            <div className="font-weight-300 flex flex-center">
              <div className="text-white margin-auto" style={{ width: "100%" }}>
                <div style={numberStyle}>
                </div>
                <p className="m-0" style={titleStyle}>
                  <b>{t("EQAResultReportSerodia.title")}</b>
                </p>
              </div>
            </div>

          </Card>
        </a>
      </Grid>
      <Grid item lg={3} md={3} sm={6} xs={12}>
        <a href={ConstantList.ROOT_PATH + "result-report/fast_test"}>
          <Card
            elevation={3}
            className={`py-16 text-center h-100 w-100 ${classes.root}`}
          >

            <div className="font-weight-300 flex flex-center">
              <div className="text-white margin-auto" style={{ width: "100%" }}>
                <div style={numberStyle}>
                  <b>
                    {/* {(
                    data.numberOfIncorrectSampleTube +
                    data.numberOfNotSubmittedSampleTube
                  ).toLocaleString("en-US")} */}
                  </b>
                </div>
                <p className="m-0" style={titleStyle}>
                  <b>{t("EQAResultReportFastTest.title")}</b>
                </p>
              </div>
            </div>

          </Card>
        </a>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(DashboardWelcomeHealthOrgCard);
