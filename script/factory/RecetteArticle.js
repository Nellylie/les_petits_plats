export class RecetteArticle {
  constructor (id, name, listeIngredients, time, description, appareil, ustensil) {
    this.id = id
    this.name = name
    this.listeIngredients = listeIngredients
    this.time = time
    this.description = description
    this.appareil = appareil
    this.ustensil = ustensil
  }

  cardsFactory () {
    const articleRecette = document.createElement('article')
    const conteneurImageRecette = document.createElement('div')
    // const imgRecette = document.createElement('img')
    const recetteDescription = document.createElement('div')
    const enteteRecette = document.createElement('div')
    const titreH2Recette = document.createElement('h2')
    const conteneurTempsRecette = document.createElement('div')
    const iconeTemps = document.createElement('i')
    const tempsRecette = document.createElement('div')
    const corpsRecette = document.createElement('div')
    const ingredientRecette = document.createElement('div')
    const noticeRecette = document.createElement('div')

    articleRecette.setAttribute('id', this.id)
    articleRecette.setAttribute('class', 'recettes-article')
    conteneurImageRecette.setAttribute('class', 'recettes__image')
    recetteDescription.setAttribute('class', 'recettes__detail')
    enteteRecette.setAttribute('class', 'description-header row')
    titreH2Recette.setAttribute('class', 'recettes__entete col-9')
    conteneurTempsRecette.setAttribute('class', 'entete__temps-preparation col-3 row justify-content-end align-self-top')
    iconeTemps.setAttribute('class', 'fa-regular fa-clock col-2 align-self-top justify-content-end')
    tempsRecette.setAttribute('class', 'preparation-temps col-3 align-self-top justify-content-end')
    corpsRecette.setAttribute('class', 'recettes__corps row')
    ingredientRecette.setAttribute('class', 'corps__ingredient col-6')
    noticeRecette.setAttribute('class', 'corps__indications col-6')
    titreH2Recette.textContent = this.name
    tempsRecette.textContent = this.time
    new Array(this.listeIngredients)[0].forEach((ingredient) => { ingredientRecette.appendChild(ingredient) })
    noticeRecette.textContent = this.description

    const appareils = document.createElement('div')
    const appareil = document.createElement('div')
    appareils.setAttribute('class', 'appareil-conteneur row')
    appareil.setAttribute('class', 'appareil col-auto align-self-start')
    appareil.textContent = `${this.appareil}`
    appareils.appendChild(appareil)
    ingredientRecette.appendChild(appareils)

    const ustensiles = document.createElement('div')
    this.ustensil.forEach((ustensilOne) => {
      const ustensil = document.createElement('div')
      ustensiles.setAttribute('class', 'ustensil-conteneur row')
      ustensil.setAttribute('class', 'ustensile col-auto align-self-start')
      ustensil.textContent = `${ustensilOne}`
      ustensiles.appendChild(ustensil)
      ingredientRecette.appendChild(ustensiles)
    })

    articleRecette.appendChild(conteneurImageRecette)
    articleRecette.appendChild(recetteDescription)
    recetteDescription.appendChild(enteteRecette)
    recetteDescription.appendChild(corpsRecette)
    enteteRecette.appendChild(titreH2Recette)
    enteteRecette.appendChild(conteneurTempsRecette)
    conteneurTempsRecette.appendChild(iconeTemps)
    conteneurTempsRecette.appendChild(tempsRecette)
    corpsRecette.appendChild(ingredientRecette)
    corpsRecette.appendChild(noticeRecette)

    return articleRecette
  }
}
