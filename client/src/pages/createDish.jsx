import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage.jsx'
import './dishDetail.css'
import './editDish.css'

const MEALDB_URL = 'https://www.themealdb.com/api/json/v1/1/search.php'

const formatIngredients = (meal) => {
    const lines = []
    for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`]
        const measure = meal[`strMeasure${i}`]
        if (ing && ing.trim()) {
            lines.push(measure && measure.trim() ? `${measure.trim()} ${ing.trim()}` : ing.trim())
        }
    }
    return lines.join('\n')
}

const CreateDish = ({ title, API_URL }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const prefill = location.state || {}

  const [form, setForm] = useState({
    name: prefill.name || '',
    cooking_time: '',
    cost: '',
    img_url: prefill.img_url || '',
    instructions: prefill.instructions || '',
    ingredients: prefill.ingredients || ''
  })
  const [fetching, setFetching] = useState({ img_url: false, instructions: false, ingredients: false })
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = title
  }, [title])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const fetchFromMealDB = async (field) => {
    if (!form.name.trim()) return
    setFetching(prev => ({ ...prev, [field]: true }))
    setError(null)
    try {
      const res = await fetch(`${MEALDB_URL}?s=${encodeURIComponent(form.name)}`)
      if (!res.ok) {
        throw new Error('MealDB request failed.')
      }
      const data = await res.json()
      if (data.meals && data.meals.length > 0) {
        const meal = data.meals[0]
        let value = ''
        if (field === 'instructions') value = meal.strInstructions || ''
        else if (field === 'img_url') value = meal.strMealThumb || ''
        else if (field === 'ingredients') value = formatIngredients(meal)
        setForm(prev => ({ ...prev, [field]: value }))
      } else {
        setError(`No results found on MealDB for "${form.name}"`)
      }
    } catch (err) {
      console.error('MealDB fetch failed:', err)
      setError('Could not reach MealDB, please try again.')
    }
    setFetching(prev => ({ ...prev, [field]: false }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await fetch(`${API_URL}/api/dishs`, {
        method: 'POST',
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
        throw new Error(err.error || 'Failed to create dish.')
      }
      window.location.href = '/'
    } catch (err) {
      console.error('Create dish failed:', err)
      setError('Could not create dish. Please try again.')
    }
  }

  return (
    <form className='card recipe-detail edit-recipe' onSubmit={handleSubmit}>
      <div className='card-top'>
        <h3>Create Dish</h3>
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
          <div className='input-fetch-row'>
            <input name='img_url' value={form.img_url} onChange={handleChange} />
            <button type='button' className='btn-fetch' onClick={() => fetchFromMealDB('img_url')} disabled={fetching.img_url}>
              {fetching.img_url ? '...' : 'Fetch from TheMealDB'}
            </button>
          </div>
        </label>

        <label>
          Ingredients
          <div className='input-fetch-row input-fetch-row--top'>
            <textarea name='ingredients' value={form.ingredients} onChange={handleChange} rows={6} placeholder={'1 cup Flour\n2 tbsp Sugar\n...'} />
            <button type='button' className='btn-fetch' onClick={() => fetchFromMealDB('ingredients')} disabled={fetching.ingredients}>
              {fetching.ingredients ? '...' : 'Fetch from TheMealDB'}
            </button>
          </div>
        </label>

        <label>
          Recipe Instructions
          <div className='input-fetch-row input-fetch-row--top'>
            <textarea name='instructions' value={form.instructions} onChange={handleChange} rows={8} />
            <button type='button' className='btn-fetch' onClick={() => fetchFromMealDB('instructions')} disabled={fetching.instructions}>
              {fetching.instructions ? '...' : 'Fetch from TheMealDB'}
            </button>
          </div>
        </label>

        <div className='card-actions'>
          <button type='submit' className='btn btn-update'>Create</button>
        </div>
      </div>
    </form>
  )
}

export default CreateDish
