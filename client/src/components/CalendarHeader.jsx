import { useState } from 'react'
import './CalendarHeader.css'

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function getWeekStart(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - d.getDay())
  return d
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
}

export default function CalendarHeader({ selectedDate, onSelectDate }) {
  const [weekStart, setWeekStart] = useState(getWeekStart(selectedDate || new Date()))

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + i)
    return d
  })

  const goToPrevWeek = () => {
    const prev = new Date(weekStart)
    prev.setDate(prev.getDate() - 7)
    setWeekStart(prev)
  }

  const goToNextWeek = () => {
    const next = new Date(weekStart)
    next.setDate(next.getDate() + 7)
    setWeekStart(next)
  }

  const today = new Date()

  return (
    <div className="calendar-header">
      <button className="calendar-arrow" onClick={goToPrevWeek} aria-label="Previous week">
        <i className="ti ti-chevron-left"></i>
      </button>

      <div className="calendar-days">
        {weekDays.map((day) => (
          <div
            key={day.toISOString()}
            className={`calendar-day ${selectedDate && isSameDay(day, selectedDate) ? 'active' : ''} ${isSameDay(day, today) ? 'today' : ''}`}
            onClick={() => onSelectDate && onSelectDate(day)}
          >
            <span className="calendar-day-label">{DAY_LABELS[day.getDay()]}</span>
            <span className="calendar-day-num">{day.getDate()}</span>
          </div>
        ))}
      </div>

      <button className="calendar-arrow" onClick={goToNextWeek} aria-label="Next week">
        <i className="ti ti-chevron-right"></i>
      </button>
    </div>
  )
}
