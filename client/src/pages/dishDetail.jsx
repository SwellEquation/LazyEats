import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import './dishDetail.css'

const DishDetail = ({ title, API_URL }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [dish, setDish] = useState(null)
  const [nutrients, setNutrients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [dishRes, nutrientRes] = await Promise.all([
          fetch(`${API_URL}/api/dishs/${id}`),
          fetch(`${API_URL}/api/dish-nutrients/dish/${id}`)
        ])
        const dishData = await dishRes.json()
        const nutrientData = await nutrientRes.json()
        setDish(dishData.error ? null : dishData)
        setNutrients(Array.isArray(nutrientData) ? nutrientData : [])
      } catch (err) {
        console.error('Fetch failed:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [id, API_URL])

  const handleDelete = async () => {
    await fetch(`${API_URL}/api/dishs/${id}`, { method: 'DELETE' })
    window.location.href = '/'
  }

  if (loading) return <div className='loading'>Loading...</div>
  if (!dish) return <div className='loading'>Dish not found</div>

  return (
    <div className='card recipe-detail'>
      <div className='card-top'>
        <h3>{dish.name}</h3>
      </div>

      <div className='card-bottom'>
        {dish.img_url && (
          <img src={dish.img_url} alt={dish.name} className='dish-image' />
        )}
        <p>Cooking time: {dish.cooking_time} mins</p>
        <p>Cost: ${dish.cost}</p>

        {dish.ingredients && (
          <div className='dish-section'>
            <h4>Ingredients</h4>
            <div className='dish-ing-list'>
              {dish.ingredients.split('\n').filter(Boolean).map((line, i) => (
                <span key={i} className='dish-ing-tag'>{line}</span>
              ))}
            </div>
          </div>
        )}

        {dish.instructions && (
          <div className='dish-section'>
            <h4>Instructions</h4>
            <p className='dish-instructions-text'>{dish.instructions}</p>
          </div>
        )}
      </div>

      {nutrients.length > 0 && (
        <div className='nutrients-container'>
          <div className='nutrients-list'>
            {nutrients.map((nutrient, index) => (
              <div key={index} className='nutrient-row'>
                <span className='nutrient-name'>{nutrient.name}</span>
                <span className='nutrient-value'>{nutrient.amount} {nutrient.unit}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className='card-actions'>
        <Link to={`/dishes/${id}/edit`} className='btn btn-update'>Update</Link>
        <button className='btn btn-delete' onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default DishDetail