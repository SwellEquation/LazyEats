import express from 'express'
import {
    getWeightsByUser,
    createWeightRecord,
    updateWeightRecord,
    deleteWeightRecord
} from '../controllers/users-weights.js'

const router = express.Router()

router.get('/:userId', getWeightsByUser)
router.post('/', createWeightRecord)
router.patch('/:id', updateWeightRecord)
router.delete('/:id', deleteWeightRecord)

export default router

