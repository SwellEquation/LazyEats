import { useEffect, useState } from 'react'
import Card from '../components/Card.jsx'
import './viewDishes.css'
import './dishDetail.css'
import FilterSidebar from '../components/FilterSidebar.jsx'

const ViewDishes = ({ title, data, API_URL }) => {
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    document.title = title
    setDishes(data)
    setLoading(false)
  }, [title, data])

  // 回调函数 callback
  const handleApplyFilters = async (filteredDishes) => {
    setDishes(filteredDishes)
    setLoading(false) 
  }

  return (
    <div className='view-recipes'>
      <div className='filter-sidebar'>
        <FilterSidebar onApplyFilters={handleApplyFilters} API_URL={API_URL} />
      </div>

      <div className='content-area'>
          <h1 className='home-title'>Lazy Eat</h1>
          {loading ? (
            <div>Loading...</div>  // 或 <Spinner /> component
          ) : (
        <div className='card-list'>
          {dishes.map(dish => (
            <Card
              key={dish.id}
              id={dish.id}
              title={dish.name}
              cook_time_mins={dish.cooking_time}
              est_cost={dish.cost}
            />
          ))}
        </div>)
        }

      </div>
    </div>
  )
}

export default ViewDishes
