import {pool} from '../config/database.js'

const getAllFoods = async(req,res)=>{
    try{
        const result = await pool.query('SELECT * FROM foods ORDER BY id')
        res.status(200).json(result.rows)
    } catch(err){
        res.status(500).json({err: err.message})
    }
}

const getFoodById = async(req,res)=>{
    try{
        const {id} = req.params
        const result = await pool.query('SELECT * FROM foods WHERE id = $1',[id])
        if (result.rows.length===0){
            return res.status(404).json({error: 'Food not found'})
        }
        res.status(200).json(result.rows[0])
    }catch(err){
        res.status(500).json({err: err.message})
    }
}


const createFood = async(req,res)=>{
    try{
        const { name, brand, img_url } = req.body
        const result = await pool.query(
            `INSERT INTO foods (name, brand, img_url)
            VALUES ($1, $2, $3) RETURNING *`,
            [name, brand, img_url]
        )
        res.status(201).json(result.rows[0])
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

const updateFood = async(req,res)=>{
    try{
        const {id} = req.params
        const { name, brand, img_url } = req.body
        const result = await pool.query(
            `UPDATE foods
            SET name = $1, brand = $2, img_url = $3
            WHERE id = $4 RETURNING *`,
            [name, brand, img_url, id]
        )
        if(result.rows.length === 0){
            return res.status(404).json({error: 'Food not found'})
        }
        res.status(200).json(result.rows[0])
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

const deleteFood = async(req,res)=>{
    try{
        const {id} = req.params
        const result = await pool.query('DELETE FROM foods WHERE id = $1 RETURNING *',[id])
        if(result.rows.length === 0){
            return res.status(404).json({error: 'Food not found'})
        }
        res.status(204).send()
    }catch(err){
        res.status(500).json({error: err.message})
    }
}


export {
    getAllFoods,
    getFoodById,
    createFood,
    updateFood,
    deleteFood
}
