
export class Recettefactory {
  constructor (recipes) {
    this.recipes = recipes
  }

  factoryCartes () {
    let chaqueRecette = ''
    this.recipes.forEach((recipe) => {
      const ingredientContenu = recipe.ingredients.map((contenu) => {
        return contenu.ingredient + ' ' + contenu.quantity + ' ' + contenu.unit + '<br>'
      })
      chaqueRecette += `
        <article id="${recipe.id}" class="recettes-article col-4">
                <div class ="recettes__image row">
                </div>
                <div class="recettes__detail">
                <div class="recettes__entete row">
                    <h2 class="entete__titre col-9 ">${recipe.name}</h2>
                    <div class="entete__temps-preparation col-3 row justify-content-end align-self-top">
                        <i class="fa-regular fa-clock col-2 align-self-top justify-content-end"></i>
                        <div class="preparation-temps col-3 align-self-top justify-content-end">${recipe.time}</div>
                        </div>
                    </div>
                    <div class="recettes__corps row">
                        <div class="corps__ingredient col-5">
                                ${ingredientContenu}
                                </div>
                                <div class="corps__indications col-7">${recipe.description}</div>
                                </div>
                            </div>
        </article>
        `
    })
    return chaqueRecette
  }
}
