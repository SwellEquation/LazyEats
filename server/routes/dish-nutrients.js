import express from 'express'
import {
    getDishNutrients,
    getNutrientDishes,
    addNutrientToDish,
    updateDishNutrient,
    deleteDishNutrient
} from '../controllers/dish-nutrients.js'

const router = express.Router()

router.get('/dish/:dish_id', getDishNutrients)
router.get('/nutrient/:nutrient_id', getNutrientDishes)
router.post('/', addNutrientToDish)
router.patch('/dish/:dish_id/nutrient/:nutrient_id', updateDishNutrient)
router.delete('/dish/:dish_id/nutrient/:nutrient_id', deleteDishNutrient)

export default router
