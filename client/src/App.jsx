import { useState, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import Header from './components/Header.jsx'
import ViewDishes from './pages/viewDishes.jsx'
import DishDetail from './pages/dishDetail.jsx'
import EditDish from './pages/editDish.jsx'
import CreateDish from './pages/createDish.jsx'
import FoodIngredientSearch from './pages/FoodIngredientSearch.jsx'
import './App.css'

const App = () => {
  const [dishes, setDishes] = useState([]);
  const [foods, setFoods] = useState([]);
  // const API_URL = 'http://localhost:3001'
  // const API_URL_PRODUCTION = 'https://lazyeatserver.onrender.com'
  
  const API_URL = import.meta.env.PROD ? 'https://lazyeatserver.onrender.com' : 'http://localhost:3001'
  useEffect(() => {
    const fetchDishes = async () => {
      const response = await fetch(`${API_URL}/api/dishs`)
      const data = await response.json()
      setDishes(data)
    }

    const fetchFoods = async () => {
      const response = await fetch(`${API_URL}/api/foods`)
      const data = await response.json()
      setFoods(data)
    }

    fetchDishes()
    fetchFoods()

  }, []);

  let element = useRoutes([
    {
      path: '/',
      element: <ViewDishes title='Lazy Eats | Dishes' data={dishes} API_URL={API_URL} />
    },
    {
      path: '/dishes/new',
      element: <CreateDish title='Lazy Eats | New Dish' API_URL={API_URL} />
    },
    {
      path: '/dishes/:id',
      element: <DishDetail title='Lazy Eats | Dish' data={dishes} API_URL={API_URL} />
    },
    {
      path: '/dishes/:id/edit',
      element: <EditDish title='Lazy Eats | Edit Dish' data={dishes} API_URL={API_URL} />
    },
    {
      path:'/foods-nutrients',
      element: <FoodIngredientSearch data={foods} API_URL={API_URL}/>
    }

  ])

  return (
    <div className='app'>

      <Header />

      { element }

    </div>
  )
}

export default App
