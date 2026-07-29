import { pool } from '../config/database.js'

const getFoodIngredients = async(req,res)=>{
    try{
        const {food_id} = req.params
        const result = await pool.query(
            `SELECT fi.*, i.name, i.type, i.description
            FROM food_ingredients fi
            JOIN ingredients i ON fi.ingredient_id = i.id
            WHERE fi.food_id = $1
            ORDER BY fi.ingredient_id`,
            [food_id]
        )
        res.status(200).json(result.rows)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const getIngredientFoods = async(req,res)=>{
    try{
        const {ingredient_id} = req.params
        const result = await pool.query(
            `SELECT f.*
            FROM food_ingredients fi
            JOIN foods f ON fi.food_id = f.id     
            WHERE fi.ingredient_id = $1
            ORDER BY fi.food_id
            `, [ingredient_id] 
        )
        res.status(200).json(result.rows)
    }
    catch(err){
        res.status(500).json({ error: err.message })
    }
}


const addIngredientToDish = async(req,res)=>{
    try{
        const { food_id, ingredient_id, amount, unit } = req.body
        const result = await pool.query(
            `INSERT INTO food_ingredients (food_id, ingredient_id, amount, unit)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [food_id, ingredient_id, amount, unit]
        )
        res.status(201).json(result.rows[0])
    }
    catch(err){
        res.status(500).json({ error: err.message })
    }
}

const updateFoodIngredient = async(req, res) => {
    try {
        const { food_id, ingredient_id } = req.params
        const { amount, unit } = req.body
        const result = await pool.query(
            `UPDATE food_ingredients
             SET amount = $1, unit = $2
             WHERE food_id = $3 AND ingredient_id = $4
             RETURNING *`,
            [amount, unit, food_id, ingredient_id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Food ingredient not found' })
        }
        res.status(200).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const deleteFoodIngredient = async(req, res) => {
    try {
        const { food_id, ingredient_id } = req.params
        const result = await pool.query(
            `DELETE FROM food_ingredients
             WHERE food_id = $1 AND ingredient_id = $2
             RETURNING *`,
            [food_id, ingredient_id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Food ingredient not found' })
        }
        res.status(204).send()
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
    getFoodIngredients,
    getIngredientFoods,
    addIngredientToDish,
    updateFoodIngredient,
    deleteFoodIngredient,

}
