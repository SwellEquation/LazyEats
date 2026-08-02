import express from 'express'
import cors from 'cors'

import dishRoute from './routes/DishRoute.js'
import nutrientRoute from './routes/nutrientRoute.js'
import dishNutrientRoute from './routes/dish-nutrients.js'
import foodRoute from './routes/foodRoute.js'
import foodIngredientRoute from './routes/food-ingredients.js'
import authRoute from './routes/auth.js'

import passport from 'passport'
import session from 'express-session'
import { GitHub } from './config/auth.js'

// create express app
const app = express()
app.use(session({
    secret: 'codepath',
    resave: false,
    saveUninitialized: true
}))
app.use(express.json())
app.use(cors({
    origin: 'https://lazyeatclient.onrender.com',
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(GitHub)
passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
    try {
        const { pool } = await import('./config/database.js')
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id])
        const user = result.rows[0]
        done(null, user)
    } catch (err) {
        done(err)
    }
})


app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">Lazy Eat</h1>')
})


app.use('/api/dishs', dishRoute)
app.use('/api/nutrients', nutrientRoute)
app.use('/api/dish-nutrients', dishNutrientRoute)
app.use('/api/foods',  foodRoute)
app.use('/api/food-ingredients',foodIngredientRoute)
app.use('/auth',authRoute)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
})