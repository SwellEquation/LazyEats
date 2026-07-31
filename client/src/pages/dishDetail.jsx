import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import './dishDetail.css'

const DishDetail = ({ title, data, API_URL }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [dish, setDish] = useState(null)
  const [nutrients, setNutrients] = useState([])
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {
    document.title = title
    const foundDish = data.find(d => d.id == id)
    setDish(foundDish)
  }, [title, id, data])


  // Get the nutrients
  useEffect(() => {
    document.title = title

    const fetchNutrients = async()=>{
      try{
        const response = await fetch(`${API_URL}/api/dish-nutrients/dish/${id}`)
        const data = await response.json()
        setNutrients(data)
        console.log(data)
      }catch(err){
         console.error('Nutrients fetch failed:', err)
      }finally{
        setLoading(false)
      }
    }
    
    fetchNutrients()
    
    
  }, [title, id, API_URL])


  const handleDelete = async () => {
    await fetch(`${API_URL}/api/dishs/${id}`, {
      method: 'DELETE'
    })
    window.location.href = '/'
  }

  if (!dish || loading) return <div className='loading'>Loading...</div>

  return (
    <div className='card recipe-detail'>
      <div className='card-top'>
        <h3>{dish.name}</h3>
      </div>

      <div className='card-bottom'>
        <p>Cooking time: {dish.cooking_time} mins</p>
        <p>Cost: ${dish.cost}</p>
        {dish.img_url && <p>Image: {dish.img_url}</p>}


      </div>

      <div className='nutrients-container'>
        {nutrients && nutrients.length > 0 ? (
          <div className='nutrients-list'>
            {nutrients.map((nutrient, index) => (
              <div key={index} className='nutrient-row'>
                <span className='nutrient-name'>{nutrient.name}</span>
                <span className='nutrient-value'>{nutrient.amount} {nutrient.unit}</span>
              </div>
            ))}
          </div>
        ) : (
          <h3>No nutrients</h3>
        )}
      </div>
      
      
      <div className='card-actions'>
          <Link to={`/dishes/${id}/edit`} className='btn btn-update'>Update</Link>
          <button className='btn btn-delete' onClick={handleDelete}>Delete</button>
      </div>


    </div>
  )
}

export default DishDetail