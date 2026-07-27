import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './recipeDetail.css'
import './editRecipe.css'

const EditDish = ({ title, data, API_URL }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)

  useEffect(() => {
    document.title = title
    const foundDish = data.find(d => d.id == id)
    if (foundDish) {
      setForm({
        name: foundDish.name,
        cooking_time: foundDish.cooking_time,
        cost: foundDish.cost,
        img_url: foundDish.img_url || ''
      })
    }
  }, [title, id, data])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch(`${API_URL}/api/dishs/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        cooking_time: Number(form.cooking_time),
        cost: Number(form.cost),
        img_url: form.img_url
      })
    })
    window.location.href = '/'
  }

  if (!form) return null

  return (
    <form className='card recipe-detail edit-recipe' onSubmit={handleSubmit}>
      <div className='card-top'>
        <h3>Edit Dish</h3>
      </div>

      <div className='card-bottom'>
        <label>
          Name
          <input name='name' value={form.name} onChange={handleChange} />
        </label>

        <label>
          Cooking time (mins)
          <input name='cooking_time' type='number' value={form.cooking_time} onChange={handleChange} />
        </label>

        <label>
          Cost ($)
          <input name='cost' type='number' value={form.cost} onChange={handleChange} />
        </label>

        <label>
          Image URL
          <input name='img_url' value={form.img_url} onChange={handleChange} />
        </label>

        <div className='card-actions'>
          <button type='submit' className='btn btn-update'>Save</button>
        </div>
      </div>
    </form>
  )
}

export default EditDish
