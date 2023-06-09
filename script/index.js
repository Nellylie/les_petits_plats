import { recipes } from '../dataJson/recipes.js'
import { IngredientDiv } from './factory/IngredientDiv.js'
import { RecipeDiv } from './factory/RecipeDiv.js'
import { tagButton, displayTagClickDom, hideTagClickDom, angleIconeMove } from './tagButton.js'
import { formatOneData, caseData } from './utilitairesfonctions.js'

// creation de tableaux vides qui seront remplis dynamiquement
let arrayRecipesFiltred = [] // la liste des recettes
let listAllIngredient = [] // liste des ingredients en tag
let listAllAppliance = [] // liste des appareils en tag
let listAllUstensil = [] // liste des ustensiles en tag

// constantes globales pour acceder aux elements du DOM utilisés
const globalSearch = document.querySelector('.inputSearch')
const globalSearchButton = document.querySelector('.icone')
const inputTagIngredient = document.querySelector('[name = "ingredient-name"]')
const inputTagAppliance = document.querySelector('[name = "appliance-name"]')
const inputTagUstensil = document.querySelector('[name = "ustensil-name"]')
const idIconeIngredients = document.querySelector('#i-0')
const idIconeAppliances = document.querySelector('#i-1')
const idIconeUstensiles = document.querySelector('#i-2')

// initialise le tableau dynamique des recettes, utile pour lancer des le chargement de la page la construction
// des recettes
function fullArrayRecipes () {
  arrayRecipesFiltred.push(...recipes)
}

fullArrayRecipes()

// appel la fonction pour construire les recettes
displayRecipesDom()
// concerne les interactions utilisateurs avec l'interface
function interactionSearchGlobal () {
  // par défaut au chargement, la barre de recherche n'a pas de mot clé.
  // ici est actualisé le tableau des recettes sans mots clé.
  updateArrayRecipesFiltred('')

  // concerne la barre de recherche globale à l'appuie d'une touche de caractère
  globalSearch.addEventListener('input', () => {
    // récupère la valeur de l'input de la barre
    const searchWord = globalSearch.value
    // si + 3 ou vide, actualise le tableau des recettes avec le mot clé entré par l'utilisateur
    if (searchWord.length >= 3) {
      updateArrayRecipesFiltred(searchWord)
      filtredRecipesDomByTag()

      // appel la fonction pour construire les recettes
      displayRecipesDom()
      // actualise les listes de tags avec les recettes visibles
      displayTagsDom('')
    } else {
      updateArrayRecipesFiltred('')
      filtredRecipesDomByTag()
      displayRecipesDom()
      displayTagsDom('')
    }
  })
  globalSearchButton.addEventListener('click', (e) => {
    e.preventDefault()
  })

  // concerne la liste de tags ingredient à l'entrée d'un caractère de l'utilisateur
  inputTagIngredient.addEventListener('input', (e) => {
    const keyWord = e.target.value
    inputTagIngredient.style.opacity = '1'
    if (keyWord.length >= 2 || keyWord.length === 0) {
      // actualise l'affichage de la liste selon les premiers caractères entrés par l'utilisateur
      displayTagsDom(keyWord); displayTagClickDom('ingredients') // gère l'affichage de la liste concernée
    }
  })
  // concerne la liste de tags des appareils à l'entrée des caractères de l'utilisateur
  inputTagAppliance.addEventListener('input', (e) => {
    const keyWord = e.target.value
    inputTagAppliance.style.opacity = '1'
    if (keyWord.length >= 2 || keyWord.length === 0) {
      displayTagsDom(keyWord); displayTagClickDom('appareils')
    }
  })
  // concerne la liste de tags des ustensiles à l'entrée des caractères de l'utilisateur
  inputTagUstensil.addEventListener('input', (e) => {
    const keyWord = e.target.value
    inputTagUstensil.style.opacity = '1'
    if (keyWord.length >= 2 || keyWord.length === 0) {
      displayTagsDom(keyWord); displayTagClickDom('ustensiles')
    }
  })

  let clickI = false
  let clickA = false
  let clickU = false
  // agit au click de l'utilisateur sur le bouton et le champs input des ingredients, appareils et ustensiles
  idIconeIngredients.addEventListener('click', (e) => {
    if (!clickI) {
      clickI = true
      openListTagIngredient()
    } else {
      clickI = false
      hideTagClickDom('ingredients', '0')
      angleIconeMove('down', '0')
      inputTagIngredient.placeholder = 'Ingrédients'; inputTagIngredient.style.width = '120px'
      inputTagIngredient.style.opacity = '1'
    }
  })

  idIconeAppliances.addEventListener('click', () => {
    if (!clickA) {
      clickA = true
      openListTagAppliance()
    } else {
      clickA = false
      hideTagClickDom('appareils', '1')
      angleIconeMove('down', '1')
      inputTagAppliance.placeholder = 'Appareils'; inputTagAppliance.style.width = '100px'
      inputTagAppliance.style.opacity = '1'
    }
  })

  idIconeUstensiles.addEventListener('click', () => {
    if (!clickU) {
      clickU = true
      openListTagUstensiles()
    } else {
      clickU = false
      hideTagClickDom('ustensiles', '2')
      angleIconeMove('down', '2')
      inputTagUstensil.placeholder = 'Ustensiles'
      inputTagUstensil.style.width = '100px'
      inputTagUstensil.style.opacity = '1'
    }
  })

  inputTagIngredient.addEventListener('click', () => {
    openListTagIngredient()
    clickI = true
  })

  inputTagAppliance.addEventListener('click', () => {
    openListTagAppliance()
    clickA = true
  })
  inputTagUstensil.addEventListener('click', () => {
    openListTagUstensiles()
    clickU = true
  })
  // agit au click de l'utilisateur sur le document html
  document.addEventListener('click', (e) => {
    // si le click concerne un tag ingredient/appareil/ustensile met à jour les recettes filtré selon les tags de selectionnés
    // ou déselectionnés
    if (e.target.className === 'tag-ingredient tag col-sm-auto' || e.target.className === 'tag-appliance tag col-sm-auto' || e.target.className === 'tag-ustensil tag col-sm-auto' || e.target.classList.contains('close')) {
      const globalSearchWord = globalSearch.value
      updateArrayRecipesFiltred(globalSearchWord)
      filtredRecipesDomByTag()
      displayTagsDom('')

      // appel la fonction pour construire les recettes
      displayRecipesDom()
    }
  })
}
interactionSearchGlobal()

function regexWordArrayRecipes (searchWord, recipe, type) {
  let resultat = false
  const searchRegex = new RegExp(searchWord, 'gi')
  switch (type) {
    case 'search': if (recipe.name.toLowerCase().includes(searchWord.toLowerCase()) || recipe.description.toLowerCase().includes(searchWord.toLowerCase())) {
      resultat = true
    } else {
      for (const ingredientValue of recipe.ingredients) {
        if (ingredientValue.ingredient.toLowerCase().includes(searchWord.toLowerCase())) {
          resultat = true
        }
      }
    }
      break
    case 'tag-ingredient': if (searchRegex.test(JSON.stringify(recipe.ingredients))) {
      resultat = true
    }
      break
    case 'tag-appliance': if (searchRegex.test(JSON.stringify(recipe.appliance))) {
      resultat = true
    }
      break
    case 'tag-ustensil' : if (searchRegex.test(JSON.stringify(recipe.ustensils))) {
      resultat = true
    }
      break
  }
  return resultat
}

// utilisée pour la mise à jour du contenu des listes selon les caractères entrés par l'utilisateur
function regexWordArrayTagList (searchWord, arrayTagList) {
  const searchBarTag = new RegExp(searchWord, 'gi')
  // retourne un tableau correspondant aux mots clés, utilisé pour avoir une liste filtrée de tags
  const resultat = arrayTagList.filter((tag) => searchBarTag.test(tag))
  // retourne la liste
  return resultat
}

// lance la recherche et boucle sur les recettes
function updateArrayRecipesFiltred (searchWord) {
  // vide le tableau dynamique des recettes et des ingredients qui va la composer
  arrayRecipesFiltred = []
  for (let i = 0; i < recipes.length; i++) {
    if (regexWordArrayRecipes(searchWord, recipes[i], 'search')) {
      // ajoute la recette au tableau
      arrayRecipesFiltred.push(recipes[i])
    }
  }
}

// construction des recettes dans le DOM
function displayRecipesDom () {
  // selectionne le conteneur des recettes dans le DOM
  const allRecipes = document.querySelector('.recettes')
  // le vide
  allRecipes.innerHTML = ''
  // verifie si le tableau des recettes filtrées est plein
  if (arrayRecipesFiltred.length !== 0) {
  // parcourt le tableau des recettes bien filtrés précédemment par les mots clés utilisateur
    for (let i = 0; i < arrayRecipesFiltred.length; i++) {
      const { id, name, ingredients, time, description } = arrayRecipesFiltred[i]
      const arrayIngredients = []
      ingredients.forEach((oneIngredient) => {
        const { ingredient, quantity, unit } = oneIngredient
        arrayIngredients.push(new IngredientDiv(ingredient, quantity, unit).detailIngredients())
      })
      const cardRecipe = new RecipeDiv(id, name, arrayIngredients, time, description).cardsFactory()
      allRecipes.appendChild(cardRecipe)
    }
  } else {
  // si le tableau des recettes filtrées est vide, affiche un message avertissant l'utilisateur
    const messageDiv = document.createElement('div')
    messageDiv.setAttribute('class', 'message')
    messageDiv.textContent = 'Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc...'
    allRecipes.appendChild(messageDiv)
  }
}

// filtre les recettes par tag
function filtredRecipesDomByTag () {
  const allTags = document.querySelector('.tag-affiche')
  const tags = allTags.querySelectorAll('.tag')
  const recipeCheckFalse = [] // un tableau qui récupère les ids des recettes qui ne répond pas aux tags
  const recipeCheckTrue = [] // un tableau qui récupère les ids des recettes qui répondent vrai aux tags
  const recipesVisible = [] // tableau pour stocker les ids des recettes qui ne sont fausses pour aucun tags
  // initialise les listes à zero
  listAllIngredient = []; listAllAppliance = []; listAllUstensil = []
  // s'il n'y a pas de tags, les listes des tags sont mises à jour sur les recettes filtrées par la recherche globale
  if (tags.length === 0) {
    arrayRecipesFiltred.forEach((recipeValide) => {
      recipeValide.ingredients.forEach((ingredientOne) => {
        listAllIngredient.push(caseData(ingredientOne.ingredient))
      })
      recipeValide.ustensils.forEach((ustensil) => { listAllUstensil.push(caseData(ustensil)) })
      listAllAppliance.push(caseData(recipeValide.appliance))
    })
  } else {
    // initialise les listes à zero
    listAllIngredient = []; listAllAppliance = []; listAllUstensil = []
    console.log(tags)
    // s'il y a des tags, cela vérifie pour chacun d'eux la validité des recettes
    tags.forEach((tag) => {
      arrayRecipesFiltred.forEach((recipe) => {
        if (tag.classList.contains('tag-ingredient')) {
        // si la verification retourne : faux
          if (!regexWordArrayRecipes(tag.getAttribute('name'), recipe, 'tag-ingredient')) {
          // cela l'ajoute dans le tableau des faux
            recipeCheckFalse.push(recipe.id)
          } else {
          // cela l'ajoute dans le tableau des vrais
            recipeCheckTrue.push(recipe.id)
          }
        } else if (tag.classList.contains('tag-appliance')) {
          if (!regexWordArrayRecipes(tag.getAttribute('name'), recipe, 'tag-appliance')) {
            recipeCheckFalse.push(recipe.id)
          } else {
            recipeCheckTrue.push(recipe.id)
          }
        } else if (tag.classList.contains('tag-ustensil')) {
          if (!regexWordArrayRecipes(tag.getAttribute('name'), recipe, 'tag-ustensil')) {
            recipeCheckFalse.push(recipe.id)
          } else {
            recipeCheckTrue.push(recipe.id)
          }
        }
      })
    })
    // rend visible uniquement les recettes valides à tous les tags présents
    recipeCheckTrue.forEach((recipeVisible) => {
      // pour cela, verifie que la recette vrai n'a pas son id presente dans le tableau des faux
      if (recipeCheckFalse.indexOf(recipeVisible) === -1) {
        arrayRecipesFiltred = []
        recipesVisible.push(recipeVisible)
      }
    }
    )

    // ajoute la recette dans le tableau verifié des recettes qui répondent vraies à tous les tags
    const recipesValidate = recipes.filter((recipe) => { return recipesVisible.includes(recipe.id) })
    arrayRecipesFiltred = recipesValidate
    // pour l'actualisation des listes de tags sur les recettes visibles
    arrayRecipesFiltred.forEach((recipeValide) => {
      recipeValide.ingredients.forEach((ingredientOne) => {
        listAllIngredient.push(caseData(ingredientOne.ingredient))
      })
      recipeValide.ustensils.forEach((ustensil) => { listAllUstensil.push(caseData(ustensil)) })
      listAllAppliance.push(caseData(recipeValide.appliance))
    })
  }
}

// affichage des tags en tant que bouton dans le DOM
function displayTagsDom (keyWord) {
  // vide les listes dans le DOM
  const listeIngredient = document.querySelector('.ingredients-groupe'); listeIngredient.innerHTML = ''
  const listeAppliance = document.querySelector('.appareils-groupe'); listeAppliance.innerHTML = ''
  const listeUstensil = document.querySelector('.ustensiles-groupe'); listeUstensil.innerHTML = ''

  // parcourt les tableaux des listes et appelle la fonction qui leur créer leur structure en tant que bouton
  formatOneData(regexWordArrayTagList(keyWord, listAllIngredient)).forEach((ingredientOne) => {
    listeIngredient.appendChild(tagButton(caseData(ingredientOne), 'ingredient'))// informe le textContent et le type
  })
  formatOneData(regexWordArrayTagList(keyWord, listAllAppliance)).forEach((appliance) => {
    listeAppliance.appendChild(tagButton(caseData(appliance), 'appliance'))
  })
  formatOneData(regexWordArrayTagList(keyWord, listAllUstensil)).forEach((ustensil) => {
    listeUstensil.appendChild(tagButton(caseData(ustensil), 'ustensil'))
  })
}

// rassemble les fonctions dédiées à l'ouverture des tags, la réactualisation de l'affichage de la liste des tags
// et la réactualisation de l'affichage des recettes
// utilisées pour chaque bouton spécifique lié à la nature du tag
function openListTagIngredient () {
  // recupere la valeur de l'input
  const keyWord = inputTagIngredient.value
  // change l'apparence pour le placeholder
  inputTagIngredient.style.opacity = '0.5'
  inputTagIngredient.placeholder = 'Rechercher un ingrédient'; inputTagIngredient.style.width = '250px'
  inputTagUstensil.placeholder = 'Ustensiles'; inputTagUstensil.style.width = '100px'; inputTagUstensil.style.opacity = '1'
  inputTagAppliance.placeholder = 'Appareils'; inputTagAppliance.style.width = '100px'; inputTagAppliance.style.opacity = '1'

  // filtre les recettes selon les tags de selectionnés par l'utilisateur
  filtredRecipesDomByTag()
  // appel la fonction pour construire les recettes
  displayRecipesDom()
  // actualise les tags selon les caractères entrés de l'utilisateur
  displayTagsDom(keyWord); displayTagClickDom('ingredients')// affiche la liste des tags
  // gère l'affichage du chevron
  angleIconeMove('up', '0')
  angleIconeMove('down', '1')
  angleIconeMove('down', '2')
  hideTagClickDom('appareils', '1')
  hideTagClickDom('ustensiles', '2')
}

function openListTagAppliance () {
  const keyWord = inputTagAppliance.value
  inputTagAppliance.style.opacity = '0.5'
  inputTagAppliance.placeholder = 'Rechercher un appareil'; inputTagAppliance.style.width = '250px'
  inputTagIngredient.placeholder = 'Ingrédients'; inputTagIngredient.style.width = '100px'; inputTagIngredient.style.opacity = '1'
  inputTagUstensil.placeholder = 'Ustensiles'; inputTagUstensil.style.width = '100px'; inputTagUstensil.style.opacity = '1'
  filtredRecipesDomByTag()
  // appel la fonction pour construire les recettes
  displayRecipesDom()
  displayTagsDom(keyWord); displayTagClickDom('appareils')
  angleIconeMove('up', '1')
  angleIconeMove('down', '0')
  angleIconeMove('down', '2')
  hideTagClickDom('ingredients', '0')
  hideTagClickDom('ustensiles', '2')
}

function openListTagUstensiles () {
  const keyWord = inputTagUstensil.value
  inputTagUstensil.style.opacity = '0.5'
  inputTagUstensil.placeholder = 'Rechercher un ustensile'; inputTagUstensil.style.width = '250px'
  inputTagIngredient.placeholder = 'Ingrédients'; inputTagIngredient.style.width = '100px'; inputTagIngredient.style.opacity = '1'
  inputTagAppliance.placeholder = 'Appareils'; inputTagAppliance.style.width = '100px'; inputTagAppliance.style.opacity = '1'
  filtredRecipesDomByTag()
  displayTagsDom(keyWord); displayTagClickDom('ustensiles')
  // appel la fonction pour construire les recettes
  displayRecipesDom()
  angleIconeMove('up', '2')
  angleIconeMove('down', '1')
  angleIconeMove('down', '0')
  hideTagClickDom('ingredients', '0')
  hideTagClickDom('appareils', '1')
}
