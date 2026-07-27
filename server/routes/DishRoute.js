import express from 'express'
import {
    getAllDishes,
    getDishById,
    createDish,
    updateDish,
    deleteDish,
    filterDishes
} from '../controllers/dishController.js'

const router = express.Router()

router.get('/', getAllDishes)
router.get('/filter', filterDishes) 
router.get('/:id', getDishById)
router.post('/', createDish)
router.patch('/:id', updateDish)
router.delete('/:id', deleteDish)

export default router