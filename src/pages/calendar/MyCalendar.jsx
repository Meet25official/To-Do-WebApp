import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.scss";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import {format, parse, startOfWeek, getDay, addDays} from "date-fns";
import enUS from "date-fns/locale/en-US";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MyCalendar = () => {
    const [events, setEvents] = useState([
        {
            title: "Design Meeting",
            start: new Date(),
            end: addDays (new Date(), 1),
            allDay: true,
        },
        {
            title: "Design Presentation",
            start: addDays (new Date(), 2),
            end: addDays(new Date(), 2),
            allDay: true,
        },
    ]);
    const [date, setDate] = useState(new Date());
    const [currentView, setCurrentView] = useState(Views.MONTH)
  
    const handleSelectSlot = ({ start }) => {
        const title = prompt("Enter a title for your event");
        if (!title || title.trim() === "") return;
        
        const newEvent = {
        title,
        start,
        end: addDays(start),
        allDay: true,
        };
        setEvents((prev) => [...prev, newEvent]);
    };

    const handleSelectEvent = (event) => {
        alert(`Event: ${event.title}`);
    };

    return (
    <div className="calendar">
      <Sidebar />
      <div className="mycalendar" style={{ padding: "20px" }}>
        <h1>Calendar</h1>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          style={{ height: 500 }}
          views={["month", "week", "day", "agenda"]}
          view={currentView}
          onView={setCurrentView}
          onNavigate={setDate}
          date={date}
        />
      </div>
    </div>
  );
};

export default MyCalendar;
