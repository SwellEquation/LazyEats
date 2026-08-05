import express from 'express'
import {
    getFoodIngredients,
    getIngredientFoods,
    addIngredientToDish,
    updateFoodIngredient,
    deleteFoodIngredient
} from '../controllers/food-ingredients.js'

const router = express.Router()

router.get('/food/:food_id', getFoodIngredients)
router.get('/ingredient/:ingredient_id/foods', getIngredientFoods)
router.post('/', addIngredientToDish)
router.patch('/food/:food_id/ingredient/:ingredient_id', updateFoodIngredient)
router.delete('/food/:food_id/ingredient/:ingredient_id', deleteFoodIngredient)

export default router
