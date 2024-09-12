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

class MyWeek extends React.Component {
  constructor(props) {
    super(props)
    this.headerRef = React.createRef()
    this.dateColRef = React.createRef()
    this.timeColRef = React.createRef()
    this.contentRef = React.createRef()
    this.tbodyRef = React.createRef()
  }
  componentDidMount() {
    this._adjustHeader()
  }

  componentDidUpdate() {
    this._adjustHeader()
  }
  _adjustHeader = () => {
    if (!this.tbodyRef.current) return

    let header = this.headerRef.current
    let firstRow = this.tbodyRef.current.firstChild

    if (!firstRow) return

    let isOverflowing =
      this.contentRef.current.scrollHeight >
      this.contentRef.current.clientHeight
    let widths = this._widths || []

    this._widths = [
      getWidth(firstRow.children[0]),
      getWidth(firstRow.children[1]),
    ]

    if (widths[0] !== this._widths[0] || widths[1] !== this._widths[1]) {
      this.dateColRef.current.style.width = this._widths[0] + 'px'
      this.timeColRef.current.style.width = this._widths[1] + 'px'
    }

    if (isOverflowing) {
      addClass(header, 'rbc-header-overflowing')
      header.style.marginRight = scrollbarSize() + 'px'
    } else {
      removeClass(header, 'rbc-header-overflowing')
    }
  }
  timeRangeLabel = (day, event) => {
    let { accessors, localizer, components } = this.props

    let labelClass = '',
      TimeComponent = components.time,
      label = localizer.messages.allDay

    let end = accessors.end(event)
    let start = accessors.start(event)

    if (!accessors.allDay(event)) {
      if (dates.eq(start, end)) {
        label = localizer.format(start, 'agendaTimeFormat')
      } else if (dates.eq(start, end, 'day')) {
        label = localizer.format({ start, end }, 'agendaTimeRangeFormat')
      } else if (dates.eq(day, start, 'day')) {
        label = localizer.format(start, 'agendaTimeFormat')
      } else if (dates.eq(day, end, 'day')) {
        label = localizer.format(end, 'agendaTimeFormat')
      }
    }

    if (dates.gt(day, start, 'day')) labelClass = 'rbc-continues-prior'
    if (dates.lt(day, end, 'day')) labelClass += ' rbc-continues-after'

    return (
      <span className={labelClass.trim()}>
        {TimeComponent ? (
          <TimeComponent event={event} day={day} label={label} />
        ) : (
          label
        )}
      </span>
    )
  }

  renderDay = (day, events, dayKey) => {
    let {
      selected,
      getters,
      accessors,
      localizer,
      components: { event: Event, date: WeekAgendaDate },
    } = this.props

    events = events.filter(e =>
      inRange(e, dates.startOf(day, 'day'), dates.endOf(day, 'day'), accessors)
    )

    return events.map((event, idx) => {
      let title = accessors.title(event)
      let end = accessors.end(event)
      let start = accessors.start(event)

      const userProps = getters.eventProp(
        event,
        start,
        end,
        isSelected(event, selected)
      )

      let dateLabel = idx === 0 && localizer.format(day, 'agendaDateFormat')
      let first =
        idx === 0 ? (
          <td rowSpan={events.length} className="rbc-agenda-date-cell">
            {WeekAgendaDate ? (
              <WeekAgendaDate day={day} label={dateLabel} />
            ) : (
              dateLabel
            )}
          </td>
        ) : (
          false
        )

      return (
        <tr
          key={dayKey + '_' + idx}
          className={userProps.className}
          style={userProps.style}
        >
          {first}
          <td className="rbc-agenda-time-cell">
            {this.timeRangeLabel(day, event)}
          </td>
          <td className="rbc-agenda-event-cell">
            {Event ? <Event event={event} title={title} /> : title}
          </td>
          <td className="rbc-agenda-event-cell">
            {Event ? <Event event={event} title={title} /> : title}
          </td>          	  
        </tr>
      )
    }, [])
  }

  
  render() {

    let { length, date, events, accessors, localizer } = this.props
    let { messages } = localizer
    let end = dates.add(date, length, 'day')
    let range = dates.range(date, end, 'day')
    events = events.filter(event => inRange(event, date, end, accessors))
    events.sort((a, b) => +accessors.start(a) - +accessors.start(b))
    return (
      <div className="rbc-agenda-view">
          <React.Fragment>
            <table ref={this.headerRef} className="rbc-agenda-table">
              <thead>
                <tr>
                  <th className="rbc-header" ref={this.dateColRef}>
                    {messages.date}
                  </th>
                  <th className="rbc-header" ref={this.timeColRef}>
                    {messages.time}
                  </th>
                  <th className="rbc-header">{messages.event}</th>
                  	<th className="rbc-header">{messages.event}</th>
                </tr>
              </thead>
            </table>
            <div className="rbc-agenda-content" ref={this.contentRef}>
              <table className="rbc-agenda-table">
                <tbody ref={this.tbodyRef}>
                  {range.map((day, idx) => this.renderDay(day, events, idx))}
                </tbody>
              </table>
            </div>
          </React.Fragment>
      </div>
    )    
    //let { date } = this.props
    //let range = MyWeek.range(date)

    //return <TimeGrid {...this.props} range={range} eventOffset={15} />
    }
  }

MyWeek.range = date => {
  let start = date
  let end = dates.add(start, 2, 'day')

  let current = start
  let range = []

  while (dates.lte(current, end, 'day')) {
    range.push(current)
    current = dates.add(current, 1, 'day')
  }

  return range
}

MyWeek.navigate = (date, action) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return dates.add(date, -3, 'day')

    case Navigate.NEXT:
      return dates.add(date, 3, 'day')

    default:
      return date
  }
}

MyWeek.title = (start, { length = MyWeek.defaultProps.length, localizer }) => {
  let end = dates.add(start, length, 'day')
  return localizer.format({ start, end }, 'agendaHeaderFormat')
}
let CustomView = ({ localizer }) => (
  <React.Fragment>

    <Calendar
      events={events}
      localizer={localizer}
      defaultView={Views.WEEK}
      defaultDate={new Date(2015, 3, 1)}
      views={{ month: true, week: MyWeek}}
    />
  </React.Fragment>
)

export default MyWeek;
