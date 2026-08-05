import { pool } from '../config/database.js'

const getAllNutrients = async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM nutrients ORDER BY id')
        res.status(200).json(result.rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const getNutrientById = async(req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query('SELECT * FROM nutrients WHERE id = $1', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Nutrient not found' })
        }
        res.status(200).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const createNutrient = async(req, res) => {
    try {
        const { name, type } = req.body
        const result = await pool.query(
            `INSERT INTO nutrients (name, type)
             VALUES ($1, $2) RETURNING *`,
            [name, type]
        )
        res.status(201).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const updateNutrient = async(req, res) => {
    try {
        const { id } = req.params
        const { name, type } = req.body
        const result = await pool.query(
            `UPDATE nutrients
             SET name = $1, type = $2
             WHERE id = $3 RETURNING *`,
            [name, type, id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Nutrient not found' })
        }
        res.status(200).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const deleteNutrient = async(req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query('DELETE FROM nutrients WHERE id = $1 RETURNING *', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Nutrient not found' })
        }
        res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export {
    getAllNutrients,
    getNutrientById,
    createNutrient,
    updateNutrient,
    deleteNutrient
}
