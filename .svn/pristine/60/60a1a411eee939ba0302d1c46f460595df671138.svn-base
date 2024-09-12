import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'; 
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import {getCurrentUser} from "../page-layouts/UserProfileService";
import { Breadcrumb, ConfirmationDialog } from "egret";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 3
});
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TabsHealthOrgRegisterForm(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { t, i18n } = useTranslation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // useEffect( () => {
  //   getCurrentUser().then(({data}) => {
  //     data.roles.forEach((role) => {
  //         if (role.name === "ROLE_ADMIN" || role.name === "ROLE_SUPER_ADMIN") {
  //           // window.location.assign("http://localhost:3000/dashboard/analytics");
  //           props.history.push("/dashboard/analytics");
  //         }
  //     })
  // })
  // }, []);
  return (
    <div className="">

      {/* <div className="mb-sm-30">
        <Breadcrumb routeSegments={[{ name: t("HealthOrgRegisterForm.title") }]} />
      </div> */}
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label={t('Intro.title')} {...a11yProps(0)} />
            {/* <Tab label={t('HealthOrgRegisterForm.tab1')} {...a11yProps(1)} /> */}
            <Tab label={t('user.healthOrg')} {...a11yProps(1)} />
            <Tab label={t('Technician.title')} {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}> 
        </TabPanel>
        {/* <TabPanel value={value} index={2}>
          <Technician t={t} i18n={i18n} homepage={true} />
      </TabPanel> */}
      </div>
    </div>
  );
}
