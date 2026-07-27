import express from 'express'
import cors from 'cors'
import recipeRoute from './routes/recipeRoute.js'
import dishRoute from './routes/DishRoute.js'
import nutrientRoute from './routes/nutrientRoute.js'
import dishNutrientRoute from './routes/dish-nutrients.js'

// create express app
const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">Lazy Eat</h1>')
})

app.use('/recipes', recipeRoute)
app.use('/api/dishs', dishRoute)
app.use('/api/nutrients', nutrientRoute)
app.use('/api/dish-nutrients', dishNutrientRoute)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
})