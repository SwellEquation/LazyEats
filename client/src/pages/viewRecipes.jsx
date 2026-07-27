import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllRecipes } from '../services/recipesApi.jsx'
import Card from '../components/Card.jsx'
import './viewRecipes.css'
import './recipeDetail.css'
import FilterSidebar from '../components/FilterSidebar.jsx'

const ViewRecipes = ({ title }) => {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    document.title = title
    getAllRecipes().then(setRecipes)
  }, [title])

  const handleApplyFilters = async (filteredRecipes) => {
    setRecipes(filteredRecipes)
  }
  
  return (
    <div className='view-recipes'>
      <FilterSidebar onApplyFilters={handleApplyFilters} />
      <div className='card-list'>
        {recipes.map(recipe => (
          <Card
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            cook_time_mins={recipe.cook_time_mins}
            est_cost={recipe.est_cost}
          />
        ))}
      </div>
      <Link to='/recipes/new' className='btn btn-update create-link'>+ Create Recipe</Link>
    </div>
  )
}

export default ViewRecipes
