import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage.jsx'
import './dishDetail.css'
import './editDish.css'

const EditDish = ({ title, API_URL }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = title
    const fetchDish = async () => {
      try {
        const res = await fetch(`${API_URL}/api/dishs/${id}`)
        if (!res.ok) {
          throw new Error('Failed to load dish.')
        }
        const dish = await res.json()
        setForm({
          name: dish.name,
          cooking_time: dish.cooking_time,
          cost: dish.cost,
          img_url: dish.img_url || '',
          instructions: dish.instructions || '',
          ingredients: dish.ingredients || ''
        })
      } catch (err) {
        console.error('Failed to load dish:', err)
        setError('Could not load this dish. Please try again.')
      }
    }
    fetchDish()
  }, [title, id, API_URL])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const res =await fetch(`${API_URL}/api/dishs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          cooking_time: Number(form.cooking_time),
          cost: Number(form.cost),
          img_url: form.img_url,
          instructions: form.instructions,
          ingredients: form.ingredients
        })
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Failed to update dish.')
      }
      window.location.href = '/'
    } catch (err) {
      console.error('Update dish failed:', err)
      setError('Could not save changes. Please try again.')
    }
  }
  if (error && !form) return <div className='loading'><ErrorMessage message={error} /></div>
  if (!form) return null

  return (
    <form className='card recipe-detail edit-recipe' onSubmit={handleSubmit}>
      <div className='card-top'>
        <h3>Edit Dish</h3>
      </div>

      <div className='card-bottom'>
        <ErrorMessage message={error} onDismiss={() => setError(null)} />
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

        <label>
          Recipe Instructions
          <textarea name='instructions' value={form.instructions} onChange={handleChange} rows={8} />
        </label>

        <label>
          Ingredients
          <textarea name='ingredients' value={form.ingredients} onChange={handleChange} rows={6} />
        </label>

        <div className='card-actions'>
          <button type='submit' className='btn btn-update'>Save</button>
        </div>
      </div>
    </form>
  )
}

export default EditDish
