import { pool } from '../config/database.js'

const getDishNutrients = async(req, res) => {
    try {
        const { dish_id } = req.params
        const result = await pool.query(
            `SELECT dn.*, n.name, n.type
             FROM dish_nutrients dn
             JOIN nutrients n ON dn.nutrient_id = n.id
             WHERE dn.dish_id = $1
             ORDER BY dn.nutrient_id`,
            [dish_id]
        )
        res.status(200).json(result.rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const getNutrientDishes = async(req, res) => {
    try {
        const { nutrient_id } = req.params
        const result = await pool.query(
            `SELECT dn.*, d.name, d.img_url
             FROM dish_nutrients dn
             JOIN dishes d ON dn.dish_id = d.id
             WHERE dn.nutrient_id = $1
             ORDER BY dn.dish_id`,
            [nutrient_id]
        )
        res.status(200).json(result.rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const addNutrientToDish = async(req, res) => {
    try {
        const { dish_id, nutrient_id, amount, unit } = req.body
        const result = await pool.query(
            `INSERT INTO dish_nutrients (dish_id, nutrient_id, amount, unit)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [dish_id, nutrient_id, amount, unit]
        )
        res.status(201).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const updateDishNutrient = async(req, res) => {
    try {
        const { dish_id, nutrient_id } = req.params
        const { amount, unit } = req.body
        const result = await pool.query(
            `UPDATE dish_nutrients
             SET amount = $1, unit = $2
             WHERE dish_id = $3 AND nutrient_id = $4
             RETURNING *`,
            [amount, unit, dish_id, nutrient_id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Dish nutrient not found' })
        }
        res.status(200).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const deleteDishNutrient = async(req, res) => {
    try {
        const { dish_id, nutrient_id } = req.params
        const result = await pool.query(
            `DELETE FROM dish_nutrients
             WHERE dish_id = $1 AND nutrient_id = $2
             RETURNING *`,
            [dish_id, nutrient_id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Dish nutrient not found' })
        }
        res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export {
    getDishNutrients,
    getNutrientDishes,
    addNutrientToDish,
    updateDishNutrient,
    deleteDishNutrient
}
