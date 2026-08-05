import { pool } from '../config/database.js'

const getAllDishes = async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM dishes ORDER BY id')
        res.status(200).json(result.rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const getDishById = async(req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query('SELECT * FROM dishes WHERE id = $1', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Dish not found' })
        }
        res.status(200).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const filterDishes = async(req, res) => {
    try {
        const { cooking_time, budget } = req.query
        let query = 'SELECT * FROM dishes'
        const params = []
        const conditions = []

        if (cooking_time) {
            conditions.push(`cooking_time < $${params.length + 1}`)
            params.push(cooking_time)
        }
        if (budget) {
            conditions.push(`cost < $${params.length + 1}`)
            params.push(budget)
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ')
        }
        query += ' ORDER BY id'

        const result = await pool.query(query, params)
        res.status(200).json(result.rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const createDish = async(req, res) => {
    try {
        const { name, img_url, cooking_time, cost, instructions, ingredients } = req.body
        const result = await pool.query(
            `INSERT INTO dishes (name, img_url, cooking_time, cost, instructions, ingredients)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, img_url, cooking_time, cost, instructions || null, ingredients || null]
        )
        res.status(201).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const updateDish = async(req, res) => {
    try {
        const { id } = req.params
        const { name, img_url, cooking_time, cost, instructions, ingredients } = req.body
        const result = await pool.query(
            `UPDATE dishes
             SET name = $1, img_url = $2, cooking_time = $3, cost = $4, instructions = $5, ingredients = $6
             WHERE id = $7 RETURNING *`,
            [name, img_url, cooking_time, cost, instructions || null, ingredients || null, id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Dish not found' })
        }
        res.status(200).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const deleteDish = async(req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query('DELETE FROM dishes WHERE id = $1 RETURNING *', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Dish not found' })
        }
        res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export {
    getAllDishes,
    getDishById,
    createDish,
    updateDish,
    deleteDish,
    filterDishes
}
