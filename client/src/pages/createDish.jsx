import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './dishDetail.css'
import './editDish.css'

const CreateDish = ({ title, API_URL }) => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    cooking_time: '',
    cost: '',
    img_url: ''
  })

  useEffect(() => {
    document.title = title
  }, [title])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`${API_URL}/api/dishs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        cooking_time: Number(form.cooking_time),
        cost: Number(form.cost),
        img_url: form.img_url
      })
    })
    const dish = await response.json()
    window.location.href = '/'
  }

  return (
    <form className='card recipe-detail edit-recipe' onSubmit={handleSubmit}>
      <div className='card-top'>
        <h3>Create Dish</h3>
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
          <button type='submit' className='btn btn-update'>Create</button>
        </div>
      </div>
    </form>
  )
}

export default CreateDish
