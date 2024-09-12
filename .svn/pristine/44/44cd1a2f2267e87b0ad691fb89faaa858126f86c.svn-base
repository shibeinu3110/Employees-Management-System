import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import PhoneIcon from '@material-ui/icons/Phone'
import FavoriteIcon from '@material-ui/icons/Favorite'
import PersonPinIcon from '@material-ui/icons/PersonPin'
import HelpIcon from '@material-ui/icons/Help'
import ShoppingBasket from '@material-ui/icons/ShoppingBasket'
import ThumbDown from '@material-ui/icons/ThumbDown'
import ThumbUp from '@material-ui/icons/ThumbUp'
import moment from 'moment';
import {
  Typography,
  Tabs,
  Box,
  Tab,
  AppBar,
  Checkbox,
  FormLabel,
  Button,
  Grid,
  FormControlLabel,
  IconButton,
  Icon,
  FormControl,
  RadioGroup,
  Radio,
  TablePagination
} from '@material-ui/core';
import QRCode from 'qrcode.react'
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import MaterialTable, { MTableToolbar, Chip, MTableBody, MTableHeader } from 'material-table';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import NumberFormat from 'react-number-format';


const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11
    // position: "absolute",
    // top: '-15px',
    // left: '-30px',
    // width: '80px'
  }
}))(Tooltip);


function MaterialButton(props) {
  const { t, i18n } = props;
  return (
    <span>
      <LightTooltip title={t('Asset.reload_code')} placement="top" enterDelay={300} leaveDelay={200}>
        <IconButton onClick={() => props.refreshCode()}>
          <Icon color="primary">refresh</Icon>
        </IconButton>
      </LightTooltip>
    </span>
  )
}

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        props.onChange({
          target: {
            name: props.name,
            value: values.value,

          },
        });
      }}
      name={props.name}
      value={props.value}
      thousandSeparator
      isNumericString
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <React.Fragment>
      <div role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )
        }
      </div >
    </React.Fragment>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}))

export default function ScrollableTabsButtonForce(props) {
  
  const t = props.t
  const i18n = props.i18n
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const [item, setItem] = React.useState({})
  const [v, setValueD] = React.useState('')
  

  const searchObject = { pageIndex: 0, pageSize: 1000000 }
  const shouldOpenPopupSelectAttribute = false;

  const handleChangeValue = (event, newValue) => {
    setValue(newValue)
  }
  // console.log(props.item.brokenMessageAndRepair)
  let allocationAsset;
  let transferAsset;
  let brokenMessageAndRepair;

  if(props.item.allocationTransfer != null){
    let allocationTransfer = props.item.allocationTransfer.content
    
    if(allocationTransfer) {
      allocationAsset = allocationTransfer.filter( item => 
        item.voucher.type === 2  
      )
      transferAsset = allocationTransfer.filter( item => 
        item.voucher.type === 3
      )      
    }   
    // console.log(allocationAsset)
        
  }
  if(props.item.brokenMessageAndRepair != null) {
    if(props.item.brokenMessageAndRepair.content) {
      brokenMessageAndRepair = props.item.brokenMessageAndRepair.content
    }    
  }
  
  let columnsAllocationAsset = [
    {
      title: t('general.stt'),
      field: 'code',
      width: '50px',
      align: 'center',
      headerStyle: {
        paddingLeft: '10px',
        paddingRight: '10px',
      },
      render: (rowData) => rowData.tableData.id + 1,
    },
    { title: t("allocation_asset.date"), field: "voucher.issueDate", align: "left", width: "250px", 
      render: rowData =>
      (rowData.voucher.issueDate) ? <span>{moment(rowData.voucher.issueDate).format('DD/MM/YYYY')}</span> : ''
    },
    { title: t("allocation_asset.assetSource"), field: "asset.assetSource.name", align: "left", width: "350px" },
    { title: t("allocation_asset.receiverDepartment"), field: "voucher.receiverDepartment.name", align: "left", width: "350px" },
    { title: t("allocation_asset.receiverPerson"), field: "voucher.receiverPerson.displayName", align: "left", width: "350px" },
    { title: t("allocation_asset.usePerson"), field: "asset.usePerson.displayName", align: "left", width: "350px" },
    
  ];

  let columnsAssetTransfer = [
    {
      title: t('general.stt'),
      field: 'code',
      width: '50px',
      align: 'center',
      headerStyle: {
        paddingLeft: '10px',
        paddingRight: '10px',
      },
      render: (rowData) => rowData.tableData.id + 1,
    },
    { title: t("AssetTransfer.issueDate"), field: "voucher.issueDate", align: "left", width: "250px", 
    render: rowData =>
    (rowData.voucher.issueDate) ? <span>{moment(rowData.voucher.issueDate).format('DD/MM/YYYY')}</span> : '' },
    { title: t("AssetTransfer.handoverDepartment"), field: "voucher.handoverDepartment.name", align: "left", width: "350px" },
    { title: t("AssetTransfer.handoverPerson"), field: "voucher.handoverPerson.displayName", align: "left", width: "350px" },

    { title: t("AssetTransfer.receiverDepartment"), field: "voucher.receiverDepartment.name", align: "left", width: "350px" },
    { title: t("AssetTransfer.receiverPerson"), field: "voucher.receiverPerson.displayName", align: "left", width: "350px" },
    { title: t("AssetTransfer.usePerson"), field: "asset.usePerson.displayName", align: "left", width: "350px" },
    // {
    //   title: t("general.action"),
    //   field: "valueText",
    //   width: "150px",
    //   render: rowData =>
    //     <LightTooltip title={t('general.delete')} placement="top" enterDelay={300} leaveDelay={200}>
    //       <IconButton onClick={() => props.handleRowDataCellDelete(rowData)}>
    //         <Icon color="error">delete</Icon>
    //       </IconButton>
    //     </LightTooltip>
    // },
  ];

  let columnsMaintainRequest = [
    {
      title: t('general.stt'),
      field: 'code',
      width: '50px',
      align: 'center',
      headerStyle: {
        paddingLeft: '10px',
        paddingRight: '10px',
      },
      render: (rowData) => rowData.tableData.id + 1,
    },
    { title: t("maintainRequest.date"), field: "maintainRequest.date", align: "left", width: "250px" , 
      render: rowData =>
      (rowData.dateRequest) ? <span>{moment(rowData.dateRequest).format('DD/MM/YYYY')}</span> : ''
    },
    { title: t("maintainRequest.depRequest"), field: "depRequest.name", align: "left", width: "350px" },
    { title: t("maintainRequest.maintainDepOwner"), field: "maintainDepOwner.name", align: "left", width: "350px" },
    { title: t("maintainRequest.maintainOwner"), field: "maintainOwner.displayName", align: "left", width: "350px" },
  
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChangeValue}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label={t('allocation_asset.allocation_asset_histoty')} />
          <Tab label={t('AssetTransfer.asset_transfer_history')} />
          <Tab label={t('maintainRequest.maintain_request_history')} />
          {/* <Tab label="Item Three" /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} style={{height:'450px'}}>
        <Grid>
        <MaterialTable
          title={t('general.list')}
          data={allocationAsset}
          columns={columnsAllocationAsset}
          //parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
          options={{
            selection: false,
            actionsColumnIndex: -1,
            paging: false,
            search: false
          }}
          components={{
            Toolbar: props => (
              <MTableToolbar {...props} />
            ),
          }}
          localization={{
            body: {
              emptyDataSourceMessage: `${t('general.emptyDataMessageTable')}`
            }
          }}
          onSelectionChange={(rows) => {
            this.data = rows;
            // this.setState({selectedItems:rows});
          }}
        />
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1} style={{height:'450px'}}>
      <Grid>
        <MaterialTable
          title={t('general.list')}
          data={transferAsset}
          columns={columnsAssetTransfer}
          //parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
          options={{
            selection: false,
            actionsColumnIndex: -1,
            paging: false,
            search: false
          }}
          components={{
            Toolbar: props => (
              <MTableToolbar {...props} />
            ),
          }}
          localization={{
            body: {
              emptyDataSourceMessage: `${t('general.emptyDataMessageTable')}`
            }
          }}
          onSelectionChange={(rows) => {
            this.data = rows;
            // this.setState({selectedItems:rows});
          }}
          
        />
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2} style={{height:'450px'}}>
      <Grid>
        <MaterialTable
          title={t('general.list')}
          data={brokenMessageAndRepair}
          columns={columnsMaintainRequest}
          //parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
          options={{
            selection: false,
            actionsColumnIndex: -1,
            paging: false,
            search: false
          }}
          components={{
            Toolbar: props => (
              <MTableToolbar {...props} />
            ),
          }}
          localization={{
            body: {
              emptyDataSourceMessage: `${t('general.emptyDataMessageTable')}`
            }
          }}
          onSelectionChange={(rows) => {
            this.data = rows;
            // this.setState({selectedItems:rows});
          }}
        />
        </Grid>
        {/* <TablePagination
          align="left"
          className="px-16"
          rowsPerPageOptions={[1, 2, 3, 5, 10, 25]}
          component="div"
          count={props.item.brokenMessageAndRepair.totalElements}
          rowsPerPage={props.item.rowsPerPage}
          page={props.item.page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={props.handleChangePage}
          onChangeRowsPerPage={props.setRowsPerPage}
        /> */}
      </TabPanel>
    </div>
  )
}
