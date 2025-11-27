import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

export default function CustomCalendar() {
  const calendarRef = useRef<{ getApi: () => { gotoDate: (date: Date) => void } }>(null);
  const [miniDate, setMiniDate] = useState(new Date(2025, 10, 1)); // November 2025
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 10, 10));
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const events = [
    {
      id: '1',
      title: 'Product discussion',
      start: '2025-11-03T15:00:00',
      end: '2025-11-03T16:30:00',
      backgroundColor: '#3b82f6',
      borderColor: '#3b82f6',
      extendedProps: { type: 'Zoom meeting' }
    },
    {
      id: '2',
      title: 'Product discussion',
      start: '2025-11-04T12:00:00',
      end: '2025-11-04T13:30:00',
      backgroundColor: '#ec4899',
      borderColor: '#ec4899',
      extendedProps: { type: 'Zoom meeting' }
    },
    {
      id: '3',
      title: 'Zoom meeting',
      start: '2025-11-05T12:00:00',
      end: '2025-11-05T13:30:00',
      backgroundColor: '#3b82f6',
      borderColor: '#3b82f6',
      extendedProps: { type: 'Zoom meeting' }
    },
    {
      id: '4',
      title: 'Product discussion',
      start: '2025-11-05T15:00:00',
      end: '2025-11-05T16:00:00',
      backgroundColor: '#10b981',
      borderColor: '#10b981',
      extendedProps: { type: 'Zoom meeting' }
    },
    {
      id: '5',
      title: 'Zoom meeting',
      start: '2025-11-06T12:00:00',
      end: '2025-11-06T13:30:00',
      backgroundColor: '#3b82f6',
      borderColor: '#3b82f6',
      extendedProps: { type: 'Zoom meeting' }
    },
    {
      id: '6',
      title: 'Product discussion',
      start: '2025-11-06T15:00:00',
      end: '2025-11-06T16:00:00',
      backgroundColor: '#10b981',
      borderColor: '#10b981',
      extendedProps: { type: 'Zoom meeting' }
    },
    {
      id: '7',
      title: 'Product discussion',
      start: '2025-11-07T12:00:00',
      end: '2025-11-07T13:30:00',
      backgroundColor: '#3b82f6',
      borderColor: '#3b82f6',
      extendedProps: { type: 'Zoom meeting' }
    },
    {
      id: '8',
      title: 'Zoom meeting',
      start: '2025-11-07T15:00:00',
      end: '2025-11-07T16:30:00',
      backgroundColor: '#3b82f6',
      borderColor: '#3b82f6',
      extendedProps: { type: 'Zoom meeting' }
    }
  ];

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const previousMonth = () => {
    const newDate = new Date(miniDate.getFullYear(), miniDate.getMonth() - 1);
    setMiniDate(newDate);
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(newDate);
    }
  };

  const nextMonth = () => {
    const newDate = new Date(miniDate.getFullYear(), miniDate.getMonth() + 1);
    setMiniDate(newDate);
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(newDate);
    }
  };

  const previousYear = () => {
    const newDate = new Date(miniDate.getFullYear() - 1, miniDate.getMonth());
    setMiniDate(newDate);
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(newDate);
    }
  };

  const nextYear = () => {
    const newDate = new Date(miniDate.getFullYear() + 1, miniDate.getMonth());
    setMiniDate(newDate);
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(newDate);
    }
  };

  const handleDateClick = (day: number | null) => {
    if (day) {
      const newDate = new Date(miniDate.getFullYear(), miniDate.getMonth(), day);
      setSelectedDate(newDate);
      if (calendarRef.current) {
        calendarRef.current.getApi().gotoDate(newDate);
      }
      if (isMobile) {
        setIsSidebarOpen(false);
      }
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const days = getDaysInMonth(miniDate);

  const SidebarContent = () => (
    <div className="h-full overflow-y-auto hide-scrollbar">
      {/* Mini Calendar */}
      <div className="mb-6">
        {/* Year Navigation */}
        <div className="flex items-center justify-between mb-2">
          <button onClick={previousYear} className="p-1 hover:bg-gray-100 rounded transition">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <h2 className="text-lg font-bold text-gray-800">
            {miniDate.getFullYear()}
          </h2>
          <button onClick={nextYear} className="p-1 hover:bg-gray-100 rounded transition">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-700">
            {monthNames[miniDate.getMonth()]}
          </h3>
          <div className="flex gap-1">
            <button onClick={previousMonth} className="p-1 hover:bg-gray-100 rounded transition">
              <ChevronLeft className="w-3 h-3 text-gray-600" />
            </button>
            <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded transition">
              <ChevronRight className="w-3 h-3 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-xs text-center text-gray-500 font-medium">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <div 
              key={index}
              onClick={() => handleDateClick(day)}
              className={`text-center text-sm py-1.5 rounded cursor-pointer transition ${
                day && day === selectedDate.getDate() && 
                miniDate.getMonth() === selectedDate.getMonth() && 
                miniDate.getFullYear() === selectedDate.getFullYear()
                  ? 'bg-orange-500 text-white font-semibold' : 
                day ? 'hover:bg-gray-100 text-gray-700' : 'text-gray-300'
              }`}
            >
              {day || ''}
            </div>
          ))}
        </div>
      </div>

      {/* Account Info */}
      <div className="space-y-1 mb-6 pb-6 border-b border-gray-200">
        <div className="text-sm text-gray-600">lks22334876</div>
        <div className="text-sm text-gray-500">floydmiles@gmail.com</div>
      </div>

      {/* Upcoming Meetings */}
      <div>
        <h3 className="text-xs font-semibold mb-4 text-gray-500 uppercase tracking-wider">
          Upcoming Meetings
        </h3>
        <div className="space-y-3">
          <div className="bg-orange-50 rounded-lg p-3 border-l-4 border-orange-500">
            <div className="flex items-start justify-between mb-2">
              <div className="text-sm font-semibold text-gray-800">Product discussion</div>
              <div className="text-xs text-gray-500">30 min</div>
            </div>
            <div className="text-xs text-gray-600 mb-2">12:30 - 1:00 pm</div>
            <button className="text-xs px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 w-full transition">
              Join google meet →
            </button>
          </div>

          <div className="bg-orange-50 rounded-lg p-3 border-l-4 border-orange-500">
            <div className="flex items-start justify-between mb-2">
              <div className="text-sm font-semibold text-gray-800">Product discussion</div>
              <div className="text-xs text-gray-500">30 min</div>
            </div>
            <div className="text-xs text-gray-600 mb-2">12:30 - 1:00 pm</div>
            <button className="text-xs px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 w-full transition">
              Join google meet →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Header */}
      {isMobile && (
        <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 p-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Calendar</h1>
            <div className="w-9"></div> {/* Spacer for balance */}
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        fixed lg:relative z-40 w-80 lg:w-64 h-full bg-white border-r border-gray-200
        lg:flex flex-col
      `}>
        {isMobile && (
          <div className="p-4 border-b border-gray-200 lg:hidden">
            <button 
              onClick={toggleSidebar}
              className="p-1 rounded hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="flex-1 p-4 lg:p-0 lg:pt-4">
          <SidebarContent />
        </div>
      </div>

      {/* Main Calendar Area */}
      <div className={`
        flex-1 overflow-hidden transition-all duration-300
        ${isMobile ? 'mt-16' : ''}
      `}>
        <style>{`
          .fc {
            height: 100%;
          }
          .fc-toolbar {
            padding: 1rem 1.5rem;
            background: white;
            border-bottom: 1px solid #e5e7eb;
            flex-direction: column;
            gap: 1rem;
          }
          @media (min-width: 768px) {
            .fc-toolbar {
              flex-direction: row;
            }
          }
          .fc-toolbar-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1f2937;
            order: 1;
          }
          .fc-toolbar-chunk:nth-child(1) {
            order: 2;
          }
          .fc-toolbar-chunk:nth-child(2) {
            order: 1;
          }
          .fc-toolbar-chunk:nth-child(3) {
            order: 3;
          }
          .fc-button {
            background: white !important;
            border: 1px solid #d1d5db !important;
            color: #374151 !important;
            padding: 0.5rem 1rem !important;
            font-size: 0.875rem !important;
            border-radius: 0.5rem !important;
            text-transform: none !important;
          }
          .fc-button:hover {
            background: #f9fafb !important;
            border-color: #9ca3af !important;
          }
          .fc-button-active {
            background: #f3f4f6 !important;
          }
          .fc-prev-button, .fc-next-button {
            padding: 0.25rem 0.5rem !important;
          }
          .fc-col-header {
            background: white;
            border-bottom: 1px solid #e5e7eb;
          }
          .fc-col-header-cell {
            padding: 0.5rem;
            font-size: 0.75rem;
            font-weight: 500;
            color: #6b7280;
          }
          @media (min-width: 768px) {
            .fc-col-header-cell {
              padding: 1rem 0.5rem;
              font-size: 0.875rem;
            }
          }
          .fc-timegrid-slot {
            height: 3rem;
          }
          @media (min-width: 1024px) {
            .fc-timegrid-slot {
              height: 4rem;
            }
          }
          .fc-timegrid-slot-label {
            color: #9ca3af;
            font-size: 0.75rem;
            vertical-align: top;
            padding-top: 0.5rem;
          }
          .fc-event {
            border-radius: 0.375rem;
            padding: 0.25rem;
            font-size: 0.7rem;
            border-width: 0;
            border-left-width: 3px;
          }
          @media (min-width: 768px) {
            .fc-event {
              padding: 0.5rem;
              font-size: 0.75rem;
            }
          }
          .fc-event-title {
            font-weight: 600;
          }
          .fc .fc-timegrid-slot {
            height: 120px;
          }
          @media (min-width: 1024px) {
            .fc .fc-timegrid-slot {
              height: 150px;
            }
          }
          .fc-timegrid-event-harness-inset {
            height: 120px;
          }
          @media (min-width: 1024px) {
            .fc-timegrid-event-harness-inset {
              height: 150px;
            }
          }
          .fc-button-group {
            gap: 0.5rem;
          }
          @media (min-width: 768px) {
            .fc-button-group {
              gap: 1rem;
            }
          }
          .fc-event-time {
            font-weight: 500;
          }
          .fc-daygrid-day-number {
            padding: 0.25rem;
            font-size: 0.875rem;
            font-weight: 600;
          }
          @media (min-width: 768px) {
            .fc-daygrid-day-number {
              padding: 0.5rem;
              font-size: 1.125rem;
            }
          }
          .fc-day-today .fc-daygrid-day-number {
            color: #f97316;
          }
          .fc-scrollgrid {
            border: none !important;
          }
          .fc-theme-standard td, .fc-theme-standard th {
            border-color: #e5e7eb;
          }
          .fc-timegrid-axis {
            font-size: 0.75rem;
          }
          .fc-timegrid-event-harness {
            margin-top: 0.25rem;
          }
        `}</style>
        
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          initialDate="2025-11-03"
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'timeGridWeek,timeGridDay,dayGridMonth'
          }}
          slotMinTime="12:00:00"
          slotMaxTime="19:00:00"
          allDaySlot={true}
          events={events}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          height="100%"
          eventContent={(arg) => {
            return (
              <div className="p-1">
                <div className="font-semibold text-xs sm:text-sm">{arg.timeText}</div>
                <div className="text-xs sm:text-sm">{arg.event.title}</div>
                <div className="text-xs opacity-75 mt-1 hidden sm:block">
                  {arg.event.extendedProps.type}
                </div>
              </div>
            );
          }}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}