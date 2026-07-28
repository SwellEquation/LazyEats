import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getRecipeById, deleteRecipe } from '../services/recipesApi.jsx'
import './recipeDetail.css'

const RecipeDetail = ({ title }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState()
  
  useEffect(() => {
    document.title = title
    getRecipeById(id).then(setRecipe)
  }, [title, id])

  const handleDelete = async () => {
    await deleteRecipe(id)
    navigate('/')
  }

  if (!recipe) return null

  return (
    <div className='card recipe-detail'>
      <div className='card-top'>
        <h3>{recipe.title}</h3>
      </div>

      <div className='card-bottom'>
        <p>Cook time: {recipe.cook_time_mins} mins</p>
        <p>Estimated cost: ${recipe.est_cost}</p>
        <ul>
          {recipe.ingredients?.map(ingredient => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>

        <div className='card-actions'>
          <Link to={`/recipes/${id}/edit`} className='btn btn-update'>Update</Link>
          <button className='btn btn-delete' onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail
