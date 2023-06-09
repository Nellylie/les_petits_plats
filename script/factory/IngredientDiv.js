import { caseData } from '../utilitairesfonctions.js'
// construit le modele pour la balise div de chaque ingredient
export class IngredientDiv {
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
    ingredient.setAttribute('class', 'ingredient')
    quantite.setAttribute('class', 'quantite')
    unite.setAttribute('class', 'unite')

    ingredient.textContent = `${caseData(this.ingredient)}`
    ingredients.appendChild(ingredient)

    if (this.quantite !== undefined) {
      quantite.textContent = `: ${this.quantite} `
      ingredients.appendChild(quantite)
    }
    if (this.unite !== undefined) {
      const unitefiltre = this.unite.replaceAll('grammes', 'g').replaceAll(' à soupe', '')
      unite.textContent = ` ${unitefiltre}`
      ingredients.appendChild(unite)
    }

    return ingredients
  }
}
