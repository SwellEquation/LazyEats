import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card.jsx'
import './FoodIngredientSearch.css'
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
        <div className="food-item-container">
            <h3>{food.name} ({food.brand})</h3>
            {/* <p>{food.brand}</p> */}
            {/* <img src={food.img_url} alt={food.name} /> */}
            <div className="ingredients">
                
                <h4>All Ingredients:</h4>
                {loading ? (
                    <p>Loading...</p>
                ) : ingredients.length > 0 ? (
                    
                    <div className="ingredients-list">
                            {ingredients.map(ingredient => {
                                const tagClass = ingredient.type === 'safe' ? 'ing-ok' : ingredient.type === 'risk' ? 'ing-bad' : 'ing-warn'
                                return (
                                    <div key={ingredient.id} className={`ing-tag ${tagClass}`}>
                                        {ingredient.name}
                                    </div>
                                )
                            })}
                    </div>
                ) : (
                    <p>No ingredients found</p>
                )}
                <div className='divider'></div>
                
                <div><h4>What to watch out for:</h4></div>
                {ingredients.length > 0 ? (
                    
                    <div className="warnings-list">
                            {ingredients.filter(ingredient => ['risk', 'caution'].includes(ingredient.type)).map(ingredient => {
                                const tagClass = ingredient.type === 'safe' ? 'ing-ok' : ingredient.type === 'risk' ? 'ing-bad' : 'ing-warn'
                                return (
                                    <div className={`flag-text ${tagClass}`}>
                                        <strong>{ingredient.name}</strong> — {ingredient.description}
                                    </div>
                                )
                            })}
                    </div>
                ) : (<p></p>)}
            </div>
        </div>
    )
}

const FoodIngredientSearch = ({data, API_URL})=>{
    const [searchInput, setSearchInput] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredFoods = searchQuery
        ? data.filter(food =>
            food.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : []

    const handleSearch = () => {
        setSearchQuery(searchInput)
    }

    return (
        <div className="food-search-container">
            <div>Ingredient Search</div>
            
            <div className='search-part-container'>
                <input
                    type="text"
                    placeholder="e.g. Instant noodles, Potato Chips ..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="search-input"
                />
                <button className='search-btn' onClick={handleSearch}>Search</button>
                
            </div>

            
            <div className="foods-list">
                {searchQuery ? (
                    filteredFoods.length > 0 ? (

                        
                        filteredFoods.map(food => (


                            
                            <FoodItem key={food.id} food={food} API_URL={API_URL} />
                        ))
                    ) : (
                        <p>No foods found</p>
                    )
                ) : (
                    <p></p>
                )}
            </div>
            
        </div>
    )
}

export default FoodIngredientSearch