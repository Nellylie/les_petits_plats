import { recipes } from '../dataJson/recipes.js'
import { IngredientDiv } from './factory/IngredientDiv.js'
import { RecipeDiv } from './factory/RecipeDiv.js'
import { tagButton, displayTagClickDomIngredient, displayTagClickDomAppliance, displayTagClickDomUstensil, hideTagClickDomIngredient, hideTagClickDomAppliance, hideTagClickDomUstensil } from './tagButton.js'
import { formatData, caseData } from './utilitairesfonctions.js'
let arrayRecipesFiltred = []
let arrayIngredient = []
let listAllIngredient = []
let listAllAppliance = []
let listAllUstensil = []

function fullArrayRecipes () {
  arrayRecipesFiltred.push(...recipes)
}

fullArrayRecipes()

function interactionSearchGlobal () {
  const globalSearch = document.querySelector('.inputSearch')
  const globalSearchButton = document.querySelector('.icone')
  const inputTagIngredient = document.querySelector('[name = "ingredient-name"')
  const inputTagAppliance = document.querySelector('[name = "appliance-name"')
  const inputTagUstensil = document.querySelector('[name = "ustensil-name"')

  updateArrayRecipesFiltred('')

  globalSearch.addEventListener('input', () => {
    const searchWord = globalSearch.value
    if (searchWord.length >= 3 || searchWord === '') {
      updateArrayRecipesFiltred(searchWord)
    }
  })
  globalSearchButton.addEventListener('click', () => {
    const searchWord = globalSearch.value
    updateArrayRecipesFiltred(searchWord)
  })

  inputTagIngredient.addEventListener('input', (e) => {
    const keyWord = e.target.value
    if (keyWord.length >= 2 || keyWord.length === 0) {
      displayTagsDom(keyWord); displayTagClickDomIngredient()
    }
  })
  inputTagAppliance.addEventListener('input', (e) => {
    const keyWord = e.target.value
    if (keyWord.length >= 2 || keyWord.length === 0) {
      displayTagsDom(keyWord); displayTagClickDomAppliance()
    }
  })
  inputTagUstensil.addEventListener('input', (e) => {
    const keyWord = e.target.value
    if (keyWord.length >= 2 || keyWord.length === 0) {
      displayTagsDom(keyWord); displayTagClickDomUstensil()
    }
  })

  inputTagIngredient.addEventListener('click', (e) => {
    const keyWord = e.target.value
    inputTagIngredient.placeholder = 'Rechercher un ingrédient'; inputTagIngredient.style.width = '250px'
    inputTagUstensil.placeholder = 'Ustensils'; inputTagUstensil.style.width = '100px'
    inputTagAppliance.placeholder = 'Appareils'; inputTagAppliance.style.width = '100px'

    displayTagsDom(keyWord); displayTagClickDomIngredient()
    hideTagClickDomAppliance()
    hideTagClickDomUstensil()
  })
  inputTagAppliance.addEventListener('click', (e) => {
    const keyWord = e.target.value
    inputTagAppliance.placeholder = 'Rechercher un appareil'; inputTagAppliance.style.width = '250px'
    inputTagIngredient.placeholder = 'Ingrédients'; inputTagIngredient.style.width = '100px'
    inputTagUstensil.placeholder = 'Ustensils'; inputTagUstensil.style.width = '100px'
    displayTagsDom(keyWord); displayTagClickDomAppliance()
    hideTagClickDomIngredient()
    hideTagClickDomUstensil()
  })
  inputTagUstensil.addEventListener('click', (e) => {
    const keyWord = e.target.value
    inputTagUstensil.placeholder = 'Rechercher un ustensil'; inputTagUstensil.style.width = '250px'
    inputTagIngredient.placeholder = 'Ingrédients'; inputTagIngredient.style.width = '100px'
    inputTagAppliance.placeholder = 'Appareils'; inputTagAppliance.style.width = '100px'

    displayTagsDom(keyWord); displayTagClickDomUstensil()
    hideTagClickDomIngredient()
    hideTagClickDomAppliance()
  })

  document.addEventListener('click', (e) => {
    console.log(e.target.className)
    if (e.target.className !== 'ingredients-input' && e.target.className !== 'appareils-input' && e.target.className !== 'ustensiles-input' && e.target.className !== 'tag') {
      hideTagClickDomUstensil()
      hideTagClickDomIngredient()
      hideTagClickDomAppliance()
      inputTagUstensil.placeholder = 'Ustensil'; inputTagUstensil.style.width = '100px'
      inputTagIngredient.placeholder = 'Ingrédients'; inputTagIngredient.style.width = '120px'
      inputTagAppliance.placeholder = 'Appareils'; inputTagAppliance.style.width = '100px'
    }
  }
  )
}

interactionSearchGlobal()

function regexWordArrayRecipes (searchWord, recipe) {
  const searchBar = new RegExp(searchWord, 'gi')
  const resultat = searchBar.test(JSON.stringify(recipe))
  return resultat
}

function regexWordArrayTagList (searchWord, arrayTagList) {
  const searchBarTag = new RegExp(searchWord, 'gi')
  const resultat = arrayTagList.filter((tag) => searchBarTag.test(tag))
  return resultat
}

function updateArrayRecipesFiltred (searchWord) {
  arrayRecipesFiltred = []; arrayIngredient = []; listAllIngredient = []; listAllAppliance = []; listAllUstensil = []
  recipes.forEach((recipe) => {
    if (regexWordArrayRecipes(searchWord, recipe)) {
      arrayRecipesFiltred.push(recipe)
      recipe.ingredients.forEach((ingredient) => {
        arrayIngredient.push(ingredient.ingredient)
        listAllIngredient.push(caseData(ingredient.ingredient))
      })
      listAllAppliance.push(caseData(recipe.appliance))
      recipe.ustensils.forEach((ustensil) => {
        listAllUstensil.push(caseData(ustensil))
      })
    }
  })
  displayRecipesDom()
}

function displayRecipesDom () {
  const allRecipes = document.querySelector('.recettes')
  allRecipes.innerHTML = ''

  arrayRecipesFiltred.forEach((recipe) => {
    const { id, name, ingredients, time, description, appliance, ustensils } = recipe
    const arrayIngredients = []
    ingredients.forEach((oneIngredient) => {
      const { ingredient, quantity, unit } = oneIngredient
      arrayIngredients.push(new IngredientDiv(ingredient, quantity, unit).detailIngredients())
    })
    const cardRecipe = new RecipeDiv(id, name, arrayIngredients, time, description, appliance, ustensils).cardsFactory()
    allRecipes.appendChild(cardRecipe)
  })
}

function displayTagsDom (keyWord) {
  const listeIngredient = document.querySelector('.ingredients-groupe'); listeIngredient.innerHTML = ''
  const listeAppliance = document.querySelector('.appareils-groupe'); listeAppliance.innerHTML = ''
  const listeUstensil = document.querySelector('.ustensiles-groupe'); listeUstensil.innerHTML = ''

  formatData(regexWordArrayTagList(keyWord, listAllIngredient)).forEach((ingredient) => {
    listeIngredient.appendChild(tagButton(ingredient, 'ingredient'))
  })
  formatData(regexWordArrayTagList(keyWord, listAllAppliance)).forEach((appliance) => {
    listeAppliance.appendChild(tagButton(appliance, 'appliance'))
  })
  formatData(regexWordArrayTagList(keyWord, listAllUstensil)).forEach((ustensil) => {
    listeUstensil.appendChild(tagButton(ustensil, 'ustensil'))
  })
}
