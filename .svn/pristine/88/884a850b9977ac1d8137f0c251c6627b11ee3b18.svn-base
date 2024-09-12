import React from 'react'

//import * as dates from 'date-arithmetic'

import events from './events'
import { Calendar, Views, Navigate } from 'react-big-calendar'
import TimeGrid from 'react-big-calendar/lib/TimeGrid'
import { inRange } from 'react-big-calendar/lib/utils/eventLevels'
import { isSelected } from 'react-big-calendar/lib/utils/selection'
import * as dates from 'react-big-calendar/lib/utils/dates'
import addClass from 'dom-helpers/addClass'
import removeClass from 'dom-helpers/removeClass'
import getWidth from 'dom-helpers/width'
import scrollbarSize from 'dom-helpers/scrollbarSize'
import { saveAs } from 'file-saver';
import { getAllAdministrativeUnits, deleteAdministrativeUnit } from "../AdministrativeUnit/AdministrativeUnitService";
import AdministrativeUnitEditorDialog from "../AdministrativeUnit/AdministrativeUnitEditorDialog";
import {getListEventByWeek,deleteEvent} from './CalendarService';
import { Breadcrumb, ConfirmationDialog } from "egret";
import shortid from "shortid";
import moment from "moment";
import Paper from '@material-ui/core/Paper';
import {
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Icon,
  TablePagination,
  TableContainer,
  Button,
  Card,
  Checkbox 
} from "@material-ui/core";

class EventTable extends React.Component {
  constructor(props) {
    super(props)
    this.headerRef = React.createRef()
    this.dateColRef = React.createRef()
    this.timeColRef = React.createRef()
    this.contentRef = React.createRef()
    this.tbodyRef = React.createRef()
  }
  state = {
    rowsPerPage: 10,
    page: 0,
    events:[],
    item:{},
    shouldOpenEditorDialog: false,
    shouldOpenConfirmationDialog: false,
    eventDateList:[],
    date:{},
    selectAllItem:false
  };  
  componentDidMount() {
    let { t, i18n,date,events,eventDateList } = this.props;
    this.setState({events:events,eventDateList:eventDateList});
  }

  componentDidUpdate() {
    const { t, i18n,date,events } = this.props;
    var strDate = moment(date).format('YYYY-MM-DD');
  }
  renderEventAction(event){
    let {onSelectEvent,handleDelete} = this.props;
    return <React.Fragment>
      <IconButton onClick={() =>onSelectEvent(event)}>
          <Icon color="primary">edit</Icon>
      </IconButton>
      <IconButton onClick={() => handleDelete(event.id)}>
        <Icon color="error">delete</Icon>
    </IconButton>
    </React.Fragment>;
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  renderCells(item, isRenderAction, isAdminView){
    let {onSelectEvent,handleDelete,handleClick} = this.props;
    if(item==null){
      item={};
    }
    let titleCell = <TableCell className="px-0" align="left">
                        {item.title}
                      </TableCell>
    let chairmanCell=
    <TableCell className="px-0" align="left">
        {item.chairman}
    </TableCell>;
    let actionCell=
    <TableCell className="px-0" align="left">
      <TableCell className="px-0 border-none">
        {isRenderAction?this.renderEventAction(item):<React.Fragment></React.Fragment>}        
      </TableCell>
    </TableCell>
    let checkBoxCell=
    <TableCell padding="checkbox">
        {isRenderAction?
            <Checkbox onClick={(event) => handleClick(event, item)} checked={item.checked!=null?item.checked:false}/>:<React.Fragment></React.Fragment>
        }        
    </TableCell>
    return (
      <React.Fragment>
        {titleCell}
        {chairmanCell}
        {isAdminView && actionCell}
        {isAdminView && checkBoxCell}
      </React.Fragment>
      )
  }
  renderEvent (item, isRenderAction,isAdminView){
    // let {onSelectEvent,handleDelete,handleClick} = this.props;
    // if(item==null){
    //   item={};
    // }
    // let titleCell = <TableCell className="px-0" align="left">
    //                     {item.title}
    //                   </TableCell>
    // let chairmanCell=
    // <TableCell className="px-0" align="left">
    //     {item.chairman}
    // </TableCell>;
    // let actionCell=
    // <TableCell className="px-0" align="left">
    //   <TableCell className="px-0 border-none">
    //       {this.renderEventAction(item)}        
    //   </TableCell>
    // </TableCell>
    // let checkBoxCell=
    // <TableCell padding="checkbox">
    //     <Checkbox onClick={(event) => handleClick(event, item)} checked={item.checked!=null?item.checked:false}/>
    // </TableCell>    
    return (
      <React.Fragment>
        <TableRow>
          {/* {titleCell}
          {chairmanCell}
          {actionCell}
          {checkBoxCell} */}
          {this.renderCells(item,isRenderAction,isAdminView)}
        </TableRow>
      </React.Fragment>
      )
     }
  renderDateEvent (eventDate,isAdminView){
    let {onSelectEvent,handleDelete,handleClick, onAddNewClick} = this.props;
    var events = [];
    var firstEvent = {};
    var isRenderAction=false;
    if(eventDate.events.length>0){
      firstEvent =eventDate.events[0];
      isRenderAction=true;
    }
    for(var i=1;i<eventDate.events.length;i++){
      events.push(eventDate.events[i]);
    }
    return(
      <React.Fragment>
      <TableRow key={shortid.generate()}>
          <TableCell className="px-0"  rowSpan={eventDate.events.length>1?eventDate.events.length:1}>
            {eventDate.name}
            <br/>
            {moment(eventDate.date).format('YYYY-MM-DD')}
            <br/>
            {isAdminView&&<IconButton color="primary" onClick={()=>onAddNewClick(eventDate.date)}>
              <Icon>add_circle</Icon>
            </IconButton>          
            }
          </TableCell>
          {this.renderCells(firstEvent,isRenderAction,isAdminView)}
      </TableRow>   
      {events.map((event, index) =>this.renderEvent(event,true,isAdminView))}
      </React.Fragment>       
    )
  }
  handleClick = (event, item) => {
    let eventDateList =  this.props.eventDateList;
    if(item.checked==null){
      item.checked=true;
    }else {
      item.checked=!item.checked;
    }
    var selectAllItem=true;
    for(var i=0;i<eventDateList.length;i++){
      var events=eventDateList[i].events;
      for(var j=0;j<events.length;j++){
        if(events[j].checked==null || events[j].checked==false){
          selectAllItem=false;
        }
        if(events[j].id==item.id){
          events[j]=item;
        }
      }
    }
    this.setState({selectAllItem:selectAllItem, eventDateList:eventDateList});
  };

  handleSelectAllClick = (event) => {
    let eventDateList =  this.props.eventDateList;
    for(var i=0;i<eventDateList.length;i++){
      var events=eventDateList[i].events;
      for(var j=0;j<events.length;j++){
        events[j].checked=!this.state.selectAllItem;
      }
    }
    this.setState({selectAllItem:!this.state.selectAllItem, eventDateList:eventDateList});
  };   
  render() {
    const { t, i18n,date,eventDateList,handleOKClose,events,handleClick,selectAllItem,handleSelectAllClick,isAdminView } = this.props;
    //alert(events.length);
    var unixTimestamp = moment(date).unix();
    var strDate = moment(date).format('YYYY-MM-DD');
    let {
      rowsPerPage,
      page,
      administrativeList,
      shouldOpenConfirmationDialog,
      shouldOpenEditorDialog
    } = this.state;
    
    return (
      <div>
        <Paper>
        <TableContainer style={{maxHeight: 1000}}>
        <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Ngày/Tháng</TableCell>
                <TableCell>Nội dung</TableCell>
                <TableCell style={{width:"40%"}}>Chủ trì</TableCell>
                {isAdminView&&<TableCell>Thao tác</TableCell>}
                {isAdminView&&<TableCell padding="checkbox">
                  <Checkbox
                      checked={selectAllItem}
                      onChange={handleSelectAllClick}
                      inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                eventDateList.map((eventDate, index) =>this.renderDateEvent(eventDate,isAdminView))
              }
            </TableBody>
            </Table>
          {shouldOpenConfirmationDialog && (
            <ConfirmationDialog
              open={shouldOpenConfirmationDialog}
              onConfirmDialogClose={this.handleDialogClose}
              onYesClick={this.handleConfirmationResponse}
              text="Are you sure to delete?"
            />
          )}
        </TableContainer>
        </Paper>
      </div>
    )   
    }
  }

EventTable.range = (date, { localizer }) => {
    let firstOfWeek = localizer.startOfWeek();
    
    let start = dates.startOf(date, 'week', firstOfWeek)
    let end = dates.endOf(date, 'week', firstOfWeek)
    return dates.range(start, end)
  }
  

EventTable.navigate = (date, action) => {
  switch (action) {
    case Navigate.PREVIOUS:
      {        
        return dates.add(date, -1, 'week')
      }
    case Navigate.NEXT:
      return dates.add(date, 1, 'week')

    default:
      return date
  }
}

EventTable.title = (date, { localizer }) => {
  let [start, ...rest] = EventTable.range(date, { localizer })
  return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat')
}
export default EventTable;
