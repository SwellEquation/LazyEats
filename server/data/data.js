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
    },
    {
      id:6,
      name:"Instant Noodles",
      brand:"Top Ramen",
      img_url:"https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400"
    },
    {
      id:7,
      name:"Processed Cheese Slices",
      brand:"Kraft",
      img_url:"https://images.unsplash.com/photo-1452894696563-c2a7014e5a7a?w=400"
    },
    {
      id:8,
      name:"Canned Spam",
      brand:"Hormel",
      img_url:"https://images.unsplash.com/photo-1599599810694-b5ac4dd26432?w=400"
    },
    {
      id:9,
      name:"Flavored Potato Chips",
      brand:"Lay's",
      img_url:"https://images.unsplash.com/photo-1585518419759-872ce6f6b2fe?w=400"
    }
  ],
  ingredients: [
    {
      id:1,
      name:"Water",
      type:"safe",
      description:"Essential for hydration and baking. No health concerns."
    },
    {
      id:2,
      name:"Wheat Flour",
      type:"safe",
      description:"Good source of carbohydrates and fiber. Contains gluten - avoid if celiac."
    },
    {
      id:3,
      name:"Sugar",
      type:"caution",
      description:"High calorie content. Excessive consumption linked to obesity and diabetes."
    },
    {
      id:4,
      name:"Salt",
      type:"caution",
      description:"Essential mineral but high sodium can increase blood pressure. Use in moderation."
    },
    {
      id:5,
      name:"Yeast",
      type:"safe",
      description:"Natural fermentation agent. Rich in B vitamins. Generally safe in normal amounts."
    },
    {
      id:6,
      name:"Butter",
      type:"caution",
      description:"High in saturated fat. Can raise cholesterol levels. Use sparingly."
    },
    {
      id:7,
      name:"Oil",
      type:"caution",
      description:"High calorie, high fat content. Choose healthy oils like olive oil."
    },
    {
      id:8,
      name:"Eggs",
      type:"safe",
      description:"Excellent protein source with essential amino acids. Rich in choline and lutein."
    },
    {
      id:9,
      name:"Milk",
      type:"safe",
      description:"Good source of calcium and vitamin D. Avoid if lactose intolerant."
    },
    {
      id:10,
      name:"Milk Powder",
      type:"safe",
      description:"Concentrated milk product with calcium and protein. More shelf-stable than fresh milk."
    },
    {
      id:11,
      name:"Baking Powder",
      type:"risk",
      description:"Chemical leavening agent. Contains aluminum compounds - may accumulate in body with high intake."
    },
    {
      id:12,
      name:"Baking Soda",
      type:"risk",
      description:"Sodium bicarbonate. High sodium content. Can affect electrolyte balance if overconsumed."
    },
    {
      id:13,
      name:"Emulsifier",
      type:"risk",
      description:"Synthetic additive to improve texture. May disrupt gut bacteria and intestinal inflammation."
    },
    {
      id:14,
      name:"Potassium Sorbate",
      type:"risk",
      description:"Synthetic preservative. May cause allergic reactions in sensitive individuals. Linked to metabolic issues."
    },
    {
      id:15,
      name:"Preservative",
      type:"risk",
      description:"Chemical additive to extend shelf life. May contain harmful compounds like TBHQ or BHA."
    },
    {
      id:16,
      name:"Dough Conditioner",
      type:"risk",
      description:"Industrial additive to improve dough handling. Contains chemicals like potassium iodate - health risks unclear."
    },
    {
      id:17,
      name:"Flavoring",
      type:"risk",
      description:"Artificial flavoring agents. May contain undisclosed ingredients. Some linked to neurotoxicity."
    },
    {
      id:18,
      name:"Vanilla Extract",
      type:"safe",
      description:"Natural flavoring from vanilla pods. Contains antioxidants. Safe in normal culinary amounts."
    },
    {
      id:19,
      name:"Cocoa Powder",
      type:"safe",
      description:"Rich in antioxidants and magnesium. Lower sugar varieties are healthier."
    },
    {
      id:20,
      name:"Honey",
      type:"safe",
      description:"Natural sweetener with antimicrobial properties. High in antioxidants. Not suitable for infants under 1 year."
    },
    {
      id:21,
      name:"Walnut",
      type:"safe",
      description:"Excellent source of omega-3 fatty acids. May improve heart and brain health."
    },
    {
      id:22,
      name:"Almond",
      type:"safe",
      description:"High in protein and healthy fats. Good for heart health. May cause allergies."
    },
    {
      id:23,
      name:"Cashew",
      type:"safe",
      description:"Rich in minerals like copper and magnesium. Lower fat than other nuts. May cause allergies."
    },
    {
      id:24,
      name:"Peanut",
      type:"safe",
      description:"Good protein source and healthy fats. Common allergen - check for allergies."
    },
    {
      id:25,
      name:"Raisin",
      type:"caution",
      description:"Natural sugars and fiber. Good for digestion but high in concentrated sugars."
    },
    {
      id:26,
      name:"Cranberry",
      type:"safe",
      description:"Rich in antioxidants and vitamin C. May help prevent urinary tract infections."
    },
    {
      id:27,
      name:"Blackcurrant",
      type:"safe",
      description:"High in vitamin C and antioxidants. May support immune function and eye health."
    },
    {
      id:28,
      name:"Oats",
      type:"safe",
      description:"Excellent source of soluble fiber. May help lower cholesterol. Safe for most except celiac disease sufferers."
    },
    {
      id:29,
      name:"Rye Flour",
      type:"safe",
      description:"Contains gluten but slightly lower than wheat. Good source of fiber and minerals."
    },
    {
      id:30,
      name:"Cornmeal",
      type:"safe",
      description:"Good source of carbohydrates. May be genetically modified - choose organic if concerned."
    },
    {
      id:31,
      name:"Syrup",
      type:"caution",
      description:"Concentrated sugar source. High glycemic index. Excessive consumption increases diabetes risk."
    },
    {
      id:32,
      name:"Chocolate Chips",
      type:"caution",
      description:"High in sugar and fat. May contain additives. Choose dark chocolate with high cocoa content."
    },
    {
      id:33,
      name:"Cinnamon",
      type:"safe",
      description:"Natural spice with anti-inflammatory properties. May help regulate blood sugar levels."
    },
    {
      id:34,
      name:"Ginger Powder",
      type:"safe",
      description:"Aids digestion and reduces nausea. Anti-inflammatory properties. Safe in normal culinary amounts."
    },
    {
      id:35,
      name:"Cardamom",
      type:"safe",
      description:"Natural spice with digestive benefits. Antioxidant properties. Safe in normal amounts."
    },
    {
      id:36,
      name:"MSG (Monosodium Glutamate)",
      type:"risk",
      description:"Flavor enhancer commonly used in processed foods. May cause sensitivity in some people. Very high sodium content per serving. Linked to headaches and allergic reactions."
    },
    {
      id:37,
      name:"TBHQ (Tertiary Butylhydroquinone)",
      type:"risk",
      description:"Synthetic antioxidant and preservative. Linked to potential health risks with high consumption. Common in processed foods, oils, and instant noodles. May cause allergic reactions and breathing issues."
    },
    {
      id:38,
      name:"Sodium Carbonate",
      type:"risk",
      description:"Chemical additive used in instant noodles to improve texture. Highly alkaline compound. May cause digestive issues and nutrient absorption problems."
    },
    {
      id:39,
      name:"Palm Oil",
      type:"caution",
      description:"High in saturated fat which can raise cholesterol. Environmental and sustainability concerns. May contribute to heart disease."
    },
    {
      id:40,
      name:"Tapioca Starch",
      type:"caution",
      description:"Refined carbohydrate with minimal nutritional value. High glycemic index. Can spike blood sugar levels."
    },
    {
      id:41,
      name:"BHA (Butylated Hydroxyanisole)",
      type:"risk",
      description:"Synthetic preservative banned in EU and Japan. Classified as possible human carcinogen. May cause allergic reactions."
    },
    {
      id:42,
      name:"Sodium Nitrite",
      type:"risk",
      description:"Preservative used in processed meats. Can form carcinogenic compounds (nitrosamines) in the stomach. Linked to increased cancer risk."
    },
    {
      id:43,
      name:"High Fructose Corn Syrup",
      type:"risk",
      description:"Processed sweetener linked to obesity and type 2 diabetes. May increase triglycerides and fatty liver disease. More harmful than regular sugar."
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
  ],
  food_ingredients: [
    // Wheat Flour (food_id: 1)
    { food_id: 1, ingredient_id: 2, amount: 500, unit: "g" },
    { food_id: 1, ingredient_id: 4, amount: 10, unit: "g" },
    { food_id: 1, ingredient_id: 1, amount: 150, unit: "ml" },
    // White Sugar (food_id: 2)
    { food_id: 2, ingredient_id: 3, amount: 1000, unit: "g" },
    // Eggs (food_id: 3)
    { food_id: 3, ingredient_id: 8, amount: 1, unit: "pcs" },
    // Butter (food_id: 4)
    { food_id: 4, ingredient_id: 6, amount: 250, unit: "g" },
    // Milk (food_id: 5)
    { food_id: 5, ingredient_id: 9, amount: 1000, unit: "ml" },
    // Instant Noodles (food_id: 6)
    { food_id: 6, ingredient_id: 2, amount: 85, unit: "g" },
    { food_id: 6, ingredient_id: 39, amount: 15, unit: "g" },
    { food_id: 6, ingredient_id: 40, amount: 8, unit: "g" },
    { food_id: 6, ingredient_id: 4, amount: 2, unit: "g" },
    { food_id: 6, ingredient_id: 36, amount: 0.5, unit: "g" },
    { food_id: 6, ingredient_id: 38, amount: 1, unit: "g" },
    { food_id: 6, ingredient_id: 3, amount: 4, unit: "g" },
    { food_id: 6, ingredient_id: 37, amount: 0.1, unit: "g" },
    // Processed Cheese Slices (food_id: 7)
    { food_id: 7, ingredient_id: 9, amount: 100, unit: "ml" },
    { food_id: 7, ingredient_id: 4, amount: 3, unit: "g" },
    { food_id: 7, ingredient_id: 13, amount: 2, unit: "g" },
    { food_id: 7, ingredient_id: 15, amount: 1, unit: "g" },
    { food_id: 7, ingredient_id: 41, amount: 0.05, unit: "g" },
    { food_id: 7, ingredient_id: 38, amount: 0.5, unit: "g" },
    // Canned Spam (food_id: 8)
    { food_id: 8, ingredient_id: 4, amount: 1.5, unit: "g" },
    { food_id: 8, ingredient_id: 42, amount: 0.08, unit: "g" },
    { food_id: 8, ingredient_id: 3, amount: 3, unit: "g" },
    { food_id: 8, ingredient_id: 15, amount: 0.5, unit: "g" },
    // Flavored Potato Chips (food_id: 9)
    { food_id: 9, ingredient_id: 7, amount: 20, unit: "g" },
    { food_id: 9, ingredient_id: 4, amount: 5, unit: "g" },
    { food_id: 9, ingredient_id: 36, amount: 0.3, unit: "g" },
    { food_id: 9, ingredient_id: 17, amount: 0.2, unit: "g" },
    { food_id: 9, ingredient_id: 43, amount: 8, unit: "g" }
  ],
  weight_records: [
    { user_id: 1, weight: 70.5, recorded_date: "2026-07-28" },
    { user_id: 1, weight: 70.2, recorded_date: "2026-07-29" },
    { user_id: 1, weight: 70.0, recorded_date: "2026-07-30" },
    { user_id: 1, weight: 69.8, recorded_date: "2026-07-31" },
    { user_id: 1, weight: 69.6, recorded_date: "2026-08-01" },
    { user_id: 1, weight: 69.5, recorded_date: "2026-08-02" },
    { user_id: 1, weight: 69.3, recorded_date: "2026-08-03" }
  ]
};

export { data };
