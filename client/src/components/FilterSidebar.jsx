import { useState } from 'react'
import './FilterSidebar.css'

export default function FilterSidebar({ onApplyFilters, API_URL }) {
  const [cookTime, setCookTime] = useState(null)
  const [budget, setBudget] = useState(20)

  const cookTimeOptions = [
    { label: 'Any', value: null },
    { label: '≤ 20 min', value: 20 },
    { label: '≤ 30 min', value: 30 }
  ]

  const handleApplyFilters = async () => {
    const params = new URLSearchParams()
    if (cookTime) params.append('cooking_time', cookTime)
    if (budget) params.append('budget', budget)
    
    try {
      const res = await fetch(`${API_URL}/api/dishs/filter?${params}`)
      const data = await res.json()
      onApplyFilters(data)
    } catch (err) {
      console.error(err)
    }
  }


  const handleClear = () => {
    setCookTime(null)
    setBudget(20)
    window.location.href = '/'
  }


  return (
    <div className="sidebar">
      <p className="sidebar-title">Filters</p>

      <div className="filter-group">
        <div className="filter-label">
          <i className="ti ti-clock" style={{ fontSize: '14px' }} aria-hidden="true"></i>
          Cook time
        </div>
        <div className="chip-row">
          {cookTimeOptions.map(option => (
            <div
              key={option.value}
              className={`chip ${cookTime === option.value ? 'active' : ''}`}
              onClick={() => setCookTime(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <div className="filter-label">
          <i className="ti ti-coin" style={{ fontSize: '14px' }} aria-hidden="true"></i>
          Budget
        </div>
        <div className="budget-val">Max ${budget.toFixed(2)}</div>
        <input
          type="range"
          min="2"
          max="20"
          value={budget}
          step="1"
          onChange={(e) => setBudget(Number(e.target.value))}
          style={{ width: '100%' }}
        />
        <div className="slider-labels">
          <span>$2</span>
          <span>$20</span>
        </div>
      </div>

      <button className="apply-btn" onClick={handleApplyFilters}>
        Apply filters
      </button>
      <button className="clear-btn" onClick={handleClear}>
        Clear all
      </button>
    </div>
  )
}
