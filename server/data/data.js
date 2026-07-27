const data = {
  dishes: [
    {
      id: 1,
      name: "Black Rye Bread",
      img_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
      cooking_time: 45,
      cost: 8.5
    },
    {
      id: 2,
      name: "Whole Wheat Toast",
      img_url: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400",
      cooking_time: 35,
      cost: 6.0
    },
    {
      id: 3,
      name: "Raisin Bread",
      img_url: "https://images.unsplash.com/photo-1585636160604-40f23e69e4e8?w=400",
      cooking_time: 50,
      cost: 9.5
    },
    {
      id: 4,
      name: "Almond Biscuits",
      img_url: "https://images.unsplash.com/photo-1599599810694-b5ac4dd26432?w=400",
      cooking_time: 25,
      cost: 7.0
    },
    {
      id: 5,
      name: "Honey Oatmeal Cookies",
      img_url: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400",
      cooking_time: 30,
      cost: 5.5
    }
  ],
  nutrients: [
    {
      id:1,
      name:"Protein",
      type:"Macro"
    },
    {
      id:2,
      name:"Fat",
      type:"Macro"
    },
    {
      id:3,
      name:"Carbohydrates",
      type:"Macro"
    },
    {
      id:4,
      name:"Dietary Fiber",
      type:"Macro"
    },
    {
      id:5,
      name:"Calories",
      type:"Other"
    },
    {
      id:6,
      name:"Vitamin A",
      type:"Vitamins"
    },
    {
      id:7,
      name:"Vitamin B1 (Thiamine)",
      type:"Vitamins"
    },
    {
      id:8,
      name:"Vitamin B2 (Riboflavin)",
      type:"Vitamins"
    },
    {
      id:9,
      name:"Vitamin B3 (Niacin)",
      type:"Vitamins"
    },
    {
      id:10,
      name:"Vitamin B6",
      type:"Vitamins"
    },
    {
      id:11,
      name:"Vitamin B12",
      type:"Vitamins"
    },
    {
      id:12,
      name:"Vitamin C",
      type:"Vitamins"
    },
    {
      id:13,
      name:"Vitamin D",
      type:"Vitamins"
    },
    {
      id:14,
      name:"Vitamin E",
      type:"Vitamins"
    },
    {
      id:15,
      name:"Vitamin K",
      type:"Vitamins"
    },
    {
      id:16,
      name:"Folate",
      type:"Vitamins"
    },
    {
      id:17,
      name:"Calcium",
      type:"Minerals"
    },
    {
      id:18,
      name:"Iron",
      type:"Minerals"
    },
    {
      id:19,
      name:"Magnesium",
      type:"Minerals"
    },
    {
      id:20,
      name:"Phosphorus",
      type:"Minerals"
    },
    {
      id:21,
      name:"Potassium",
      type:"Minerals"
    },
    {
      id:22,
      name:"Zinc",
      type:"Minerals"
    },
    {
      id:23,
      name:"Iodine",
      type:"Minerals"
    },
    {
      id:24,
      name:"Selenium",
      type:"Minerals"
    },
    {
      id:25,
      name:"Copper",
      type:"Minerals"
    },
    {
      id:26,
      name:"Manganese",
      type:"Minerals"
    },
    {
      id:27,
      name:"Sodium",
      type:"Other"
    },
    {
      id:28,
      name:"Cholesterol",
      type:"Other"
    }
  ],
  foods: [
    {
      id:1,
      name:"Wheat Flour",
      brand:"Golden",
      img_url:"https://images.unsplash.com/photo-1585518419759-872ce6f6b2fe?w=400"
    },
    {
      id:2,
      name:"White Sugar",
      brand:"COFCO",
      img_url:"https://images.unsplash.com/photo-1599599810694-b5ac4dd26432?w=400"
    },
    {
      id:3,
      name:"Eggs",
      brand:"Family Farm",
      img_url:"https://images.unsplash.com/photo-1599599810694-b5ac4dd26432?w=400"
    },
    {
      id:4,
      name:"Butter",
      brand:"Anchor",
      img_url:"https://images.unsplash.com/photo-1589985643862-18b1783be60a?w=400"
    },
    {
      id:5,
      name:"Milk",
      brand:"Mengniu",
      img_url:"https://images.unsplash.com/photo-1550583874-4b7555b50d7e?w=400"
    }
  ],
  ingredients: [
    {
      id:1,
      name:"Water"
    },
    {
      id:2,
      name:"Wheat Flour"
    },
    {
      id:3,
      name:"Sugar"
    },
    {
      id:4,
      name:"Salt"
    },
    {
      id:5,
      name:"Yeast"
    },
    {
      id:6,
      name:"Butter"
    },
    {
      id:7,
      name:"Oil"
    },
    {
      id:8,
      name:"Eggs"
    },
    {
      id:9,
      name:"Milk"
    },
    {
      id:10,
      name:"Milk Powder"
    },
    {
      id:11,
      name:"Baking Powder"
    },
    {
      id:12,
      name:"Baking Soda"
    },
    {
      id:13,
      name:"Emulsifier"
    },
    {
      id:14,
      name:"Potassium Sorbate (Preservative)"
    },
    {
      id:15,
      name:"Preservative"
    },
    {
      id:16,
      name:"Dough Conditioner"
    },
    {
      id:17,
      name:"Flavoring"
    },
    {
      id:18,
      name:"Vanilla Extract"
    },
    {
      id:19,
      name:"Cocoa Powder"
    },
    {
      id:20,
      name:"Honey"
    },
    {
      id:21,
      name:"Walnut"
    },
    {
      id:22,
      name:"Almond"
    },
    {
      id:23,
      name:"Cashew"
    },
    {
      id:24,
      name:"Peanut"
    },
    {
      id:25,
      name:"Raisin"
    },
    {
      id:26,
      name:"Cranberry"
    },
    {
      id:27,
      name:"Blackcurrant"
    },
    {
      id:28,
      name:"Oats"
    },
    {
      id:29,
      name:"Rye Flour"
    },
    {
      id:30,
      name:"Cornmeal"
    },
    {
      id:31,
      name:"Syrup"
    },
    {
      id:32,
      name:"Chocolate Chips"
    },
    {
      id:33,
      name:"Cinnamon"
    },
    {
      id:34,
      name:"Ginger Powder"
    },
    {
      id:35,
      name:"Cardamom"
    }
  ],
  dish_nutrients: [
    // Black Rye Bread (dish_id: 1)
    { dish_id: 1, nutrient_id: 1, amount: 9, unit: "g" },
    { dish_id: 1, nutrient_id: 2, amount: 2, unit: "g" },
    { dish_id: 1, nutrient_id: 3, amount: 48, unit: "g" },
    { dish_id: 1, nutrient_id: 4, amount: 3, unit: "g" },
    { dish_id: 1, nutrient_id: 5, amount: 245, unit: "kcal" },
    { dish_id: 1, nutrient_id: 7, amount: 0.35, unit: "mg" },
    { dish_id: 1, nutrient_id: 18, amount: 2.5, unit: "mg" },
    { dish_id: 1, nutrient_id: 21, amount: 280, unit: "mg" },
    // Whole Wheat Toast (dish_id: 2)
    { dish_id: 2, nutrient_id: 1, amount: 8, unit: "g" },
    { dish_id: 2, nutrient_id: 2, amount: 2.5, unit: "g" },
    { dish_id: 2, nutrient_id: 3, amount: 45, unit: "g" },
    { dish_id: 2, nutrient_id: 4, amount: 3.5, unit: "g" },
    { dish_id: 2, nutrient_id: 5, amount: 230, unit: "kcal" },
    { dish_id: 2, nutrient_id: 18, amount: 2.2, unit: "mg" },
    { dish_id: 2, nutrient_id: 21, amount: 260, unit: "mg" },
    // Raisin Bread (dish_id: 3)
    { dish_id: 3, nutrient_id: 1, amount: 8.5, unit: "g" },
    { dish_id: 3, nutrient_id: 2, amount: 3, unit: "g" },
    { dish_id: 3, nutrient_id: 3, amount: 52, unit: "g" },
    { dish_id: 3, nutrient_id: 4, amount: 2.5, unit: "g" },
    { dish_id: 3, nutrient_id: 5, amount: 270, unit: "kcal" },
    { dish_id: 3, nutrient_id: 5, amount: 15, unit: "g" },
    { dish_id: 3, nutrient_id: 21, amount: 320, unit: "mg" },
    { dish_id: 3, nutrient_id: 18, amount: 1.8, unit: "mg" },
    // Almond Biscuits (dish_id: 4)
    { dish_id: 4, nutrient_id: 1, amount: 10, unit: "g" },
    { dish_id: 4, nutrient_id: 2, amount: 8, unit: "g" },
    { dish_id: 4, nutrient_id: 3, amount: 35, unit: "g" },
    { dish_id: 4, nutrient_id: 5, amount: 280, unit: "kcal" },
    { dish_id: 4, nutrient_id: 14, amount: 60, unit: "mg" },
    { dish_id: 4, nutrient_id: 17, amount: 150, unit: "mg" },
    // Honey Oatmeal Cookies (dish_id: 5)
    { dish_id: 5, nutrient_id: 1, amount: 6, unit: "g" },
    { dish_id: 5, nutrient_id: 2, amount: 6, unit: "g" },
    { dish_id: 5, nutrient_id: 3, amount: 40, unit: "g" },
    { dish_id: 5, nutrient_id: 4, amount: 2, unit: "g" },
    { dish_id: 5, nutrient_id: 5, amount: 250, unit: "kcal" },
    { dish_id: 5, nutrient_id: 18, amount: 2, unit: "mg" },
    { dish_id: 5, nutrient_id: 21, amount: 200, unit: "mg" }
  ]
};

export { data };
