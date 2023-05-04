import { recipes } from '../dataJson/recipes.js'
import { RecetteArticle } from './factory/RecetteArticle.js'
import { IngredientCorps } from './factory/IngredientCorps.js'
import { interactionRecherche } from './evenementRecherche.js'

async function getRecipes () {
  const recettesTableau = recipes
  const conteneurToutesRecettes = document.querySelector('.recettes')
  recettesTableau.forEach((recette) => {
    const { id, name, ingredients, time, description, appliance, ustensils } = recette
    const corpsIngredients = []
    ingredients.forEach((ingredientUnique) => {
      const { ingredient, quantity, unit } = ingredientUnique
      corpsIngredients.push(new IngredientCorps(ingredient, quantity, unit).detailIngredients())
    })
    const carteRecette = new RecetteArticle(id, name, corpsIngredients, time, description, appliance, ustensils).cardsFactory()
    conteneurToutesRecettes.appendChild(carteRecette)
  })

  interactionRecherche()
}

getRecipes()
