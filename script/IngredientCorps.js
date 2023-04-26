export class IngredientCorps {
  constructor (ingredient, quantite, unite) {
    this.ingredient = ingredient
    this.quantite = quantite
    this.unite = unite
  }

  detailIngredients () {
    const ingredients = document.createElement('div')
    const ingredient = document.createElement('div')
    const quantite = document.createElement('div')
    const unite = document.createElement('div')

    ingredients.setAttribute('class', 'ingredientsConteneur row')
    ingredient.setAttribute('class', 'ingredient col-auto align-self-start')
    quantite.setAttribute('class', 'quantite col-auto align-self-start')
    unite.setAttribute('class', 'unite col-auto align-self-start')

    ingredient.textContent = `${this.ingredient}`
    quantite.textContent = `: ${this.quantite} `
    if (this.unite !== undefined) {
      unite.textContent = this.unite
    }

    ingredients.appendChild(ingredient)
    ingredients.appendChild(quantite)
    ingredients.appendChild(unite)

    return ingredients
  }
}
