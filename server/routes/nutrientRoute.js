import express from 'express'
import {
    getAllNutrients,
    getNutrientById,
    createNutrient,
    updateNutrient,
    deleteNutrient
} from '../controllers/nutrientController.js'

const router = express.Router()

router.get('/', getAllNutrients)
router.get('/:id', getNutrientById)
router.post('/', createNutrient)
router.patch('/:id', updateNutrient)
router.delete('/:id', deleteNutrient)

export default router