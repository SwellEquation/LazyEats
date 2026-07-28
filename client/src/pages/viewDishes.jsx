import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card.jsx'
import './viewRecipes.css'
import './recipeDetail.css'
import FilterSidebar from '../components/FilterSidebar.jsx'

const ViewDishes = ({ title, data, API_URL }) => {
  const [dishes, setDishes] = useState([])

  useEffect(() => {
    document.title = title
    setDishes(data)
  }, [title, data])

  // 回调函数 callback
  const handleApplyFilters = async (filteredDishes) => {
    setDishes(filteredDishes)
  }

  return (
    <div className='view-recipes'>
      <div className='filter-sidebar'>
        <FilterSidebar onApplyFilters={handleApplyFilters} />
      </div>

      <div className='content-area'>
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
        </div>
        <Link to='/dishes/new' className='btn btn-update create-link'>+ Create Dish</Link>
      </div>
    </div>
  )
}

export default ViewDishes
