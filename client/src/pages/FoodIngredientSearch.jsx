import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './FoodIngredientSearch.css'

const MEALDB_URL = 'https://www.themealdb.com/api/json/v1/1/search.php'

const extractIngredients = (meal) => {
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`]
        const measure = meal[`strMeasure${i}`]
        if (ing && ing.trim()) {
            ingredients.push({ name: ing.trim(), measure: measure ? measure.trim() : '' })
        }
    }
    return ingredients
}

const MealItem = ({ meal, onAddToRecipe }) => {
    const ingredients = extractIngredients(meal)

    return (
        <div className="food-item-container">
            <div className="meal-header">
                {meal.strMealThumb && (
                    <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-thumb" />
                )}
                <div className="meal-info">
                    <h3>{meal.strMeal}</h3>
                    {meal.strCategory && (
                        <p className="meal-meta"><strong>Category:</strong> {meal.strCategory}</p>
                    )}
                    {meal.strCountry && (
                        <p className="meal-meta"><strong>Country:</strong> {meal.strCountry}</p>
                    )}
                    {meal.strTags && (
                        <p className="meal-meta"><strong>Tags:</strong> {meal.strTags}</p>
                    )}
                    <button className="btn-add-recipe" onClick={() => onAddToRecipe(meal)}>
                        + Add to Recipe
                    </button>
                </div>
            </div>
            <div className="ingredients">
                <h4>All Ingredients:</h4>
                {ingredients.length > 0 ? (
                    <div className="ingredients-list">
                        {ingredients.map((ing, idx) => (
                            <div key={idx} className="ing-tag ing-ok">
                                {ing.measure ? `${ing.measure} ${ing.name}` : ing.name}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No ingredients found</p>
                )}
            </div>
        </div>
    )
}

const FoodIngredientSearch = () => {
    const navigate = useNavigate()
    const [searchInput, setSearchInput] = useState('')
    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(false)
    const [searched, setSearched] = useState(false)

    const handleAddToRecipe = (meal) => {
        const ingredientLines = []
        for (let i = 1; i <= 20; i++) {
            const ing = meal[`strIngredient${i}`]
            const measure = meal[`strMeasure${i}`]
            if (ing && ing.trim()) {
                ingredientLines.push(measure && measure.trim() ? `${measure.trim()} ${ing.trim()}` : ing.trim())
            }
        }
        navigate('/dishes/new', {
            state: {
                name: meal.strMeal,
                img_url: meal.strMealThumb,
                instructions: meal.strInstructions,
                ingredients: ingredientLines.join('\n')
            }
        })
    }

    const handleSearch = async () => {
        if (!searchInput.trim()) return
        setLoading(true)
        setSearched(true)
        try {
            const response = await fetch(`${MEALDB_URL}?s=${encodeURIComponent(searchInput)}`)
            const data = await response.json()
            setMeals(data.meals || [])
        } catch (error) {
            console.error('Error fetching meals:', error)
            setMeals([])
        }
        setLoading(false)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch()
    }

    return (
        <div className="food-search-container">
            <div>Meal & Ingredient Search</div>

            <div className='search-part-container'>
                <input
                    type="text"
                    placeholder="e.g. Chicken, Pasta, Sushi ..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="search-input"
                />
                <button className='search-btn' onClick={handleSearch}>Search</button>
            </div>

            <div className="foods-list">
                {loading ? (
                    <p>Loading...</p>
                ) : searched ? (
                    meals.length > 0 ? (
                        meals.map(meal => (
                            <MealItem key={meal.idMeal} meal={meal} onAddToRecipe={handleAddToRecipe} />
                        ))
                    ) : (
                        <p>No meals found</p>
                    )
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    )
}

export default FoodIngredientSearch