import {pool} from './database.js'
import './dotenv.js'
import { data } from '../data/data.js'
const { dishes, nutrients, foods, ingredients, dish_nutrients, food_ingredients, weight_records = [] } = data

//const { dishes, nutrients, foods, ingredients } = rawData
const dropAllTables = async () => {
  const dropTablesQuery = `
    DROP TABLE IF EXISTS diet_records;
    DROP TABLE IF EXISTS weight_records;
    DROP TABLE IF EXISTS dish_nutrients;
    DROP TABLE IF EXISTS food_ingredients;
    DROP TABLE IF EXISTS dishes;
    DROP TABLE IF EXISTS foods;
    DROP TABLE IF EXISTS nutrients;
    DROP TABLE IF EXISTS ingredients;
    DROP TABLE IF EXISTS users;
    `

  try {
    const res = await pool.query(dropTablesQuery)
    console.log('🧹 all tables dropped successfully')
  }

  catch (err) {
    console.error('⚠️ error dropping tables', err)
  }
}


const createIngredientsTable = async() =>{
    const createIngredientsTableQuery = `
        CREATE TABLE IF NOT EXISTS ingredients (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            type VARCHAR(50),
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `

    try {
        await pool.query(createIngredientsTableQuery)
        console.log('✅ Ingredients table created successfully')
    }
    catch(err){
        console.error("⚠️ Error creating ingredients table", err)
    }
}

const seedIngredientsTable = async()=>{
    await createIngredientsTable()

    const insertQuery = 'INSERT INTO ingredients (name, type, description) VALUES ($1, $2, $3)'

    for (const ingredient of ingredients){
        const values = [ingredient.name, ingredient.type, ingredient.description]
        try {
            await pool.query(insertQuery, values)
            console.log(`✅ ${ingredient.name} added successfully`)
        } catch (err) {
            console.error('⚠️ error inserting ingredients', err)
        }
    }
}

const createNutrients = async() =>{
    const createNutrientsQuery = `
        CREATE TABLE IF NOT EXISTS nutrients (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            type VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `

    try {
        await pool.query(createNutrientsQuery)
        console.log('✅ Nutrients table created successfully')
    }
    catch(err){
        console.error("⚠️ Error creating nutrients table", err)
    }
}

const seedNutrients = async()=>{
    await createNutrients()

    const insertQuery = 'INSERT INTO nutrients (name, type) VALUES ($1, $2)'

    for (const nutrient of nutrients){
        const values = [nutrient.name, nutrient.type]
        try {
            await pool.query(insertQuery, values)
            console.log(`✅ ${nutrient.name} added successfully`)
        } catch (err) {
            console.error('⚠️ error inserting nutrients', err)
        }
    }
}

const createFoodsTable = async() =>{
    const createFoodsQuery = `
        CREATE TABLE IF NOT EXISTS foods (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            brand VARCHAR(255),
            img_url TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `

    try {
        await pool.query(createFoodsQuery)
        console.log('✅ Foods table created successfully')
    }
    catch(err){
        console.error("⚠️ Error creating foods table", err)
    }
}

const seedFoodsTable = async()=>{
    await createFoodsTable()

    const insertQuery = 'INSERT INTO foods (name, brand, img_url) VALUES ($1, $2, $3)'

    for (const food of foods){
        const values = [food.name, food.brand, food.img_url]
        try {
            await pool.query(insertQuery, values)
            console.log(`✅ ${food.name} added successfully`)
        } catch (err) {
            console.error('⚠️ error inserting foods', err)
        }
    }
}

const createDishesTable = async() =>{
    const createDishesQuery = `
        CREATE TABLE IF NOT EXISTS dishes (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            img_url TEXT,
            cooking_time INTEGER,
            cost NUMERIC(10, 2),
            instructions TEXT,
            ingredients TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `

    try {
        await pool.query(createDishesQuery)
        console.log('✅ Dishes table created successfully')
    }
    catch(err){
        console.error("⚠️ Error creating dishes table", err)
    }
}

const seedDishesTable = async()=>{
    await createDishesTable()

    const insertQuery = 'INSERT INTO dishes (name, img_url, cooking_time, cost) VALUES ($1, $2, $3, $4)'

    for (const dish of dishes){
        const values = [dish.name, dish.img_url, dish.cooking_time, dish.cost]
        try {
            await pool.query(insertQuery, values)
            console.log(`✅ ${dish.name} added successfully`)
        } catch (err) {
            console.error('⚠️ error inserting dishes', err)
        }
    }
}

const createUsersTable = async () => {
  const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
          id serial PRIMARY KEY,
          githubid integer NOT NULL,
          username varchar(100) NOT NULL,
          avatarurl varchar(500) NOT NULL,
          accesstoken varchar(500) NOT NULL
      );
  `
    try {
        const res = await pool.query(createUsersTableQuery)
        console.log('🎉 users table created successfully')
    }
    catch (error) {
        console.error('⚠️ error creating users table', err)
    }
}

const createWeightRecordsTable = async () => {
  const createWeightRecordsTableQuery = `
      CREATE TABLE IF NOT EXISTS weight_records (
          id SERIAL PRIMARY KEY,
          user_id INT NOT NULL,
          weight NUMERIC(5,2) NOT NULL,
          recorded_date DATE NOT NULL DEFAULT CURRENT_DATE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
          UNIQUE (user_id, recorded_date)
      )
  `
    try {
        const res = await pool.query(createWeightRecordsTableQuery)
        console.log('✅ weight_records table created successfully')
    }
    catch (error) {
        console.error('⚠️ error creating weight_records table', error)
    }
}

const seedWeightRecordsTable = async () => {
    await createWeightRecordsTable()

    const insertQuery = 'INSERT INTO weight_records (user_id, weight, recorded_date) VALUES ($1, $2, $3)'

    for (const wr of weight_records) {
        const values = [wr.user_id, wr.weight, wr.recorded_date]
        try {
            await pool.query(insertQuery, values)
            console.log(`✅ weight_record for user ${wr.user_id} added successfully`)
        } catch (err) {
            console.error('⚠️ error inserting weight_records', err)
        }
    }
}

const createFoodIngredientsTable = async () => {
  const createFoodIngredientsTableQuery = `
      CREATE TABLE IF NOT EXISTS food_ingredients (
          food_id int NOT NULL,
          ingredient_id int NOT NULL,
          amount decimal,
          unit varchar,
          created_at timestamp DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (food_id, ingredient_id),
          FOREIGN KEY (food_id) REFERENCES foods(id) ON UPDATE CASCADE ON DELETE CASCADE,
          FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON UPDATE CASCADE ON DELETE CASCADE
      )
  `
    try {
        const res = await pool.query(createFoodIngredientsTableQuery)
        console.log('✅ food_ingredients table created successfully')
    }
    catch (error) {
        console.error('⚠️ error creating food_ingredients table', error)
    }
}

const createDishNutrientsTable = async () => {
  const createDishNutrientsTableQuery = `
      CREATE TABLE IF NOT EXISTS dish_nutrients (
          dish_id int NOT NULL,
          nutrient_id int NOT NULL,
          amount decimal NOT NULL,
          unit varchar NOT NULL,
          created_at timestamp DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (dish_id, nutrient_id),
          FOREIGN KEY (dish_id) REFERENCES dishes(id) ON UPDATE CASCADE ON DELETE CASCADE,
          FOREIGN KEY (nutrient_id) REFERENCES nutrients(id) ON UPDATE CASCADE ON DELETE CASCADE
      )
  `
    try {
        const res = await pool.query(createDishNutrientsTableQuery)
        console.log('✅ dish_nutrients table created successfully')
    }
    catch (error) {
        console.error('⚠️ error creating dish_nutrients table', error)
    }
}

const seedDishNutrients = async() => {
    await createDishNutrientsTable()

    const insertQuery = 'INSERT INTO dish_nutrients (dish_id, nutrient_id, amount, unit) VALUES ($1, $2, $3, $4)'

    for (const dn of dish_nutrients) {
        const values = [dn.dish_id, dn.nutrient_id, dn.amount, dn.unit]
        try {
            await pool.query(insertQuery, values)
            console.log(`✅ Dish ${dn.dish_id} - Nutrient ${dn.nutrient_id} added successfully`)
        } catch (err) {
            console.error('⚠️ error inserting dish_nutrients', err)
        }
    }
}

const seedFoodIngredients = async() => {
    await createFoodIngredientsTable()

    const insertQuery = 'INSERT INTO food_ingredients (food_id, ingredient_id, amount, unit) VALUES ($1, $2, $3, $4)'

    for (const fi of food_ingredients) {
        const values = [fi.food_id, fi.ingredient_id, fi.amount, fi.unit]
        try {
            await pool.query(insertQuery, values)
            console.log(`✅ Food ${fi.food_id} - Ingredient ${fi.ingredient_id} added successfully`)
        } catch (err) {
            console.error('⚠️ error inserting food_ingredients', err)
        }
    }
}




// 按你现在的设计，一条 diet_record 记录只能关联一个 dish 或一个 food（因为字段里只有一个 dish_id 和一个 food_id）。

// 如果一条记录要关联多个菜品或多个食物，那就需要改设计了

const resetDatabase = async () => {
//   await dropAllTables()

  await seedIngredientsTable()
  await seedNutrients()
  await seedFoodsTable()
  await seedDishesTable()

  await createUsersTable()
  await seedWeightRecordsTable()

  await seedDishNutrients()
  await seedFoodIngredients()
  console.log('🎉 Database reset and seeded successfully')
  process.exit(0)
}

resetDatabase()