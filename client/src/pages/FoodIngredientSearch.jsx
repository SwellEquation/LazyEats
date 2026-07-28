import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card.jsx'

const FoodItem = ({ food, API_URL }) => {
    const [ingredients, setIngredients] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchIngredients = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${API_URL}/api/food-ingredients/food/${food.id}`)
                const data = await response.json()
                console.log('Ingredients for food', food.id, ':', data)
                setIngredients(data)
            } catch (error) {
                console.error('Error fetching ingredients:', error)
                setIngredients([])
            }
            setLoading(false)
        }
        fetchIngredients()
    }, [food.id, API_URL])

    return (
        <div className="food-item">
            <h3>{food.name}</h3>
            <p>{food.brand}</p>
            <img src={food.img_url} alt={food.name} />
            <div className="ingredients">
                <h4>Ingredients:</h4>
                {loading ? (
                    <p>Loading...</p>
                ) : ingredients.length > 0 ? (
                    <ul>
                        {ingredients.map(ingredient => (
                            <li key={ingredient.ingredient_id}>{ingredient.amount} {ingredient.unit} - {ingredient.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No ingredients found</p>
                )}
            </div>
        </div>
    )
}

const FoodIngredientSearch = ({data, API_URL})=>{
    const [searchInput, setSearchInput] = useState('')

    const filteredFoods = data.filter(food =>
        food.name.toLowerCase().includes(searchInput.toLowerCase())
    )

    return (
        <div className="food-search">
            <input
                type="text"
                placeholder="Search food by name..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="search-input"
            />
            <div className="foods-list">
                {filteredFoods.length > 0 ? (
                    filteredFoods.map(food => (
                        <FoodItem key={food.id} food={food} API_URL={API_URL} />
                    ))
                ) : (
                    <p>No foods found</p>
                )}
            </div>
        </div>
    )
}

export default FoodIngredientSearch