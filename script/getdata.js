import { recipes } from '../dataJson/recipes.js'

export async function getRecipes () {
  console.log(recipes)
  return recipes
}
