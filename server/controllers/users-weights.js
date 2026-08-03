import { pool } from '../config/database.js'

const getWeightsByUser = async(req, res) => {
    try {
        const { userId } = req.params
        const result = await pool.query(
            'SELECT * FROM weight_records WHERE user_id = $1 ORDER BY recorded_date',
            [userId]
        )
        res.status(200).json(result.rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const createWeightRecord = async(req, res) => {
    try {
        const { user_id, weight, recorded_date } = req.body
        const result = await pool.query(
            `INSERT INTO weight_records (user_id, weight, recorded_date)
             VALUES ($1, $2, COALESCE($3, CURRENT_DATE))
             ON CONFLICT (user_id, recorded_date)
             DO UPDATE SET weight = EXCLUDED.weight
             RETURNING *`,
            [user_id, weight, recorded_date]
        )
        res.status(201).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const updateWeightRecord = async(req, res) => {
    try {
        const { id } = req.params
        const { weight, recorded_date } = req.body
        const result = await pool.query(
            `UPDATE weight_records
             SET weight = $1, recorded_date = $2
             WHERE id = $3 RETURNING *`,
            [weight, recorded_date, id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Weight record not found' })
        }
        res.status(200).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const deleteWeightRecord = async(req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query('DELETE FROM weight_records WHERE id = $1 RETURNING *', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Weight record not found' })
        }
        res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export {
    getWeightsByUser,
    createWeightRecord,
    updateWeightRecord,
    deleteWeightRecord
}
