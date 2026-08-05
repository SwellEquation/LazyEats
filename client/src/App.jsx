import { useState, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import Header from './components/Header.jsx'
import ViewDishes from './pages/viewDishes.jsx'
import DishDetail from './pages/dishDetail.jsx'
import EditDish from './pages/editDish.jsx'
import CreateDish from './pages/createDish.jsx'
import FoodIngredientSearch from './pages/FoodIngredientSearch.jsx'
import './App.css'
import Login from './pages/Login.jsx'
import Tracker from './pages/tracker.jsx'
import Profile from './pages/profile.jsx'

const App = () => {
  const [dishes, setDishes] = useState([]);
  const [foods, setFoods] = useState([]);
  const [weights, setWeights] = useState([]);
  const [weightUnit, setWeightUnit] = useState(() => localStorage.getItem('weightUnit') || 'kg');
  // const API_URL = 'http://localhost:3001'
  // const API_URL_PRODUCTION = 'https://lazyeatserver.onrender.com'
  const [user, setUser] = useState()

  const API_URL = import.meta.env.PROD ? 'https://lazyeatserver.onrender.com' : 'http://localhost:3001'
  // useEffect(() => {
  //   const fetchDishes = async () => {
  //     const response = await fetch(`${API_URL}/api/dishs`)
  //     const data = await response.json()
  //     setDishes(data)
  //   }

  //   const fetchFoods = async () => {
  //     const response = await fetch(`${API_URL}/api/foods`)
  //     const data = await response.json()
  //     setFoods(data)
  //   }

  //   const getUser = async () => {
  //       const response = await fetch(`${API_URL}/auth/login/success`, { credentials: 'include' } )
  //       const json = await response.json()
  //       setUser(json.user)
  //   }

  //   getUser()
  //   fetchDishes()
  //   fetchFoods()

  // }, []);

  // use promise.all, making fetch faster
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dishRes, foodRes, userRes] = await Promise.all([
          fetch(`${API_URL}/api/dishs`),
          fetch(`${API_URL}/api/foods`),
          fetch(`${API_URL}/auth/login/success`, { credentials: 'include' })
        ])
        
        const dishes = await dishRes.json()
        const foods = await foodRes.json()
        const user = await userRes.json()
        
        setDishes(dishes)
        setFoods(foods)
        setUser(user.user)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  // weights need userId — fetch after user known
  useEffect(() => {
    if (!user || !user.id) return
    const fetchWeights = async () => {
      try {
        const res = await fetch(`${API_URL}/api/weights/${user.id}`, { credentials: 'include' })
        const data = await res.json()
        setWeights(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error(err)
      }
    }
    fetchWeights()
  }, [user])

  useEffect(() => {
    localStorage.setItem('weightUnit', weightUnit)
  }, [weightUnit])

  let element = useRoutes([
    {
      path: '/',
      element: user && user.id ?
        <ViewDishes title='Lazy Eats | Dishes' data={dishes} API_URL={API_URL} /> : <Login API_URL={API_URL} />
    },
    {
      path: '/dishes/new',
      element: user && user.id ?
        <CreateDish title='Lazy Eats | New Dish' API_URL={API_URL} /> : <Login API_URL={API_URL} />
    },
    {
      path: '/dishes/:id',
      element: user && user.id ?
        <DishDetail title='Lazy Eats | Dish' API_URL={API_URL} /> : <Login API_URL={API_URL} />
    },
    {
      path: '/dishes/:id/edit',
      element: user && user.id ?
        <EditDish title='Lazy Eats | Edit Dish' API_URL={API_URL} /> : <Login API_URL={API_URL} />
    },
    {
      path: '/foods-nutrients',
      element: user && user.id ?
        <FoodIngredientSearch data={foods} API_URL={API_URL} /> : <Login API_URL={API_URL} />
    },
    {
      path: '/tracker',
      element: <Tracker API_URL={API_URL} user={user} weights={weights} setWeights={setWeights} weightUnit={weightUnit} />

    },
    {
      path: '/profile',
      element: <Profile API_URL={API_URL} user={user} weights={weights} weightUnit={weightUnit} setWeightUnit={setWeightUnit} />
    }
  ])

  return (
    <div className='app'>

      <Header isLoggedIn={Boolean(user && user.id)} user={user} />

      { element }

    </div>
  )
}

export default App
