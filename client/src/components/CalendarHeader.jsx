import { useMemo, useState } from 'react'
import './CalendarHeader.css'

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
}

function getMonthGrid(date) {
  const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
  const lastOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  const startDay = firstOfMonth.getDay()
  const totalDays = lastOfMonth.getDate()

  const days = []
  const leadingEmpty = startDay

  for (let i = 0; i < leadingEmpty; i += 1) {
    days.push(null)
  }

  for (let day = 1; day <= totalDays; day += 1) {
    const current = new Date(date.getFullYear(), date.getMonth(), day)
    days.push(current)
  }

  while (days.length % 7 !== 0) {
    days.push(null)
  }

  return days
}

function formatMonthLabel(date) {
  return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
}

function toDateKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function recordKey(recordedDate) {
  return String(recordedDate).slice(0, 10)
}

function kgToLb(kg) {
  return Number(kg) * 2.20462
}

export default function CalendarHeader({ selectedDate, onSelectDate, weights = [], weightUnit = 'kg' }) {
  const [viewDate, setViewDate] = useState(selectedDate || new Date())
  const today = new Date()
  const monthDays = useMemo(() => getMonthGrid(viewDate), [viewDate])
  const weightsByDate = useMemo(() => {
    const map = new Map()
    weights.forEach((w) => {
      map.set(recordKey(w.recorded_date), w.weight)
    })
    return map
  }, [weights])

  const goToPrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))
  }

  return (
    <div className="calendar-header">
      <div className="calendar-topbar">
        <button className="calendar-arrow" onClick={goToPrevMonth} aria-label="Previous month">
          &#8249;
        </button>

        <div className="calendar-month-label">{formatMonthLabel(viewDate)}</div>

        <button className="calendar-arrow" onClick={goToNextMonth} aria-label="Next month">
          &#8250;
        </button>
      </div>

      <div className="calendar-weekdays">
        {DAY_LABELS.map((label) => (
          <div key={label} className="calendar-weekday">{label}</div>
        ))}
      </div>

      <div className="calendar-days-grid">
        {monthDays.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="calendar-day empty" />
          }

          const isSelected = selectedDate && isSameDay(day, selectedDate)
          const isToday = isSameDay(day, today)
          const weightForDay = weightsByDate.get(toDateKey(day))

          return (
            <button
              key={day.toISOString()}
              type="button"
              className={`calendar-day ${isSelected ? 'active' : ''} ${isToday ? 'today' : ''}`}
              onClick={() => onSelectDate && onSelectDate(day)}
            >
              <span className="calendar-day-num">{day.getDate()}</span>
              {weightForDay !== undefined && (
                <span className="calendar-day-weight">
                  {weightUnit === 'lb' ? kgToLb(weightForDay).toFixed(1) : weightForDay} {weightUnit}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
