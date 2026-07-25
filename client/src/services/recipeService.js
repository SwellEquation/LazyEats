const getAllRecipes = async ()=>{
    const response = await fetch(`/recipes/`)
    return await response.json()
}

const getRecipeById = async(id)=>{
    const response = await fetch(`/recipes/${id}`)
    return await response.json()
}

const createRecipe = async(recipe)=>{
    const options= {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(recipe)
    }
    const response = await fetch('/recipes',options)
    return response.json()
}

const updateRecipeById=async(recipe,id)=>{
    const options= {
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    }
    const response = await fetch(`/recipes/${id}`,options)
    return response.json()
}

const deleteRecipe = async(id)=>{
    const options = {
        method: 'DELETE',
    }
    const response = await fetch(`/recipes/${id}`,options)
    return response.json()
}

export { getAllRecipes, getRecipeById, createRecipe, updateRecipeById, deleteRecipe }
