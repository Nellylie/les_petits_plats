export class RecipeDiv {
  constructor (id, name, listeIngredients, time, description) {
    this.id = id
    this.name = name
    this.listeIngredients = listeIngredients
    this.time = time
    this.description = description
  }

  cardsFactory () {
    const recipes = document.createElement('article')
    const recipesImgContain = document.createElement('div')
    const descriptionRecipes = document.createElement('div')
    const headRecipe = document.createElement('div')
    const headH2Recipe = document.createElement('h2')
    const containTimeRecipe = document.createElement('div')
    const iconeTime = document.createElement('i')
    const timeRecipe = document.createElement('div')
    const globalRecipe = document.createElement('div')
    const ingredientRecipe = document.createElement('div')
    const adviceRecipe = document.createElement('div')

    recipes.setAttribute('id', this.id)
    recipes.setAttribute('class', 'recettes-article')
    recipesImgContain.setAttribute('class', 'recettes__image')
    descriptionRecipes.setAttribute('class', 'recettes__detail')
    headRecipe.setAttribute('class', 'description-header row')
    headH2Recipe.setAttribute('class', 'recettes__entete col-9')
    containTimeRecipe.setAttribute('class', 'entete__temps-preparation col-3 row justify-content-end align-self-top')
    iconeTime.setAttribute('class', 'fa-regular fa-clock col-2 align-self-top justify-content-end')
    timeRecipe.setAttribute('class', 'preparation-temps col-3 align-self-top justify-content-end')
    globalRecipe.setAttribute('class', 'recettes__corps row')
    ingredientRecipe.setAttribute('class', 'corps__ingredient col-6')
    adviceRecipe.setAttribute('class', 'corps__indications col-6')
    headH2Recipe.textContent = this.name
    timeRecipe.textContent = this.time
    new Array(this.listeIngredients)[0].forEach((ingredient) => { ingredientRecipe.appendChild(ingredient) })
    adviceRecipe.textContent = this.description

    recipes.appendChild(recipesImgContain)
    recipes.appendChild(descriptionRecipes)
    descriptionRecipes.appendChild(headRecipe)
    descriptionRecipes.appendChild(globalRecipe)
    headRecipe.appendChild(headH2Recipe)
    headRecipe.appendChild(containTimeRecipe)
    containTimeRecipe.appendChild(iconeTime)
    containTimeRecipe.appendChild(timeRecipe)
    globalRecipe.appendChild(ingredientRecipe)
    globalRecipe.appendChild(adviceRecipe)

    return recipes
  }
}
