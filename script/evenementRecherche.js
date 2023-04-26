import { declencheurTriArticleAffiche } from './filtreArticleAffiche.js'
import { Tag } from './Tag.js'
import { EffaceDoubleDonnees } from './utilitairesfonctions.js'

export function interactionRecherche () {
  const rechercheBar = document.querySelector('.inputSearch')
  const boutonRechercheBar = document.querySelector('.icone')

  rechercheBar.addEventListener('input', (e) => {
    const motRecherche = e.target.value
    if (motRecherche.length >= 3) {
      declencheurTriArticleAffiche(motRecherche)
    }
    if (motRecherche === '') {
      declencheurTriArticleAffiche(motRecherche)
    }
  })

  boutonRechercheBar.addEventListener('click', (e) => {
    const motRecherche = e.target.value
    declencheurTriArticleAffiche(motRecherche)
  })

  const inputIngredientTag = document.querySelector('.ingredients-input')
  const inputAppliancesTag = document.querySelector('.appareils-input')
  const inputUstensilsTag = document.querySelector('.ustensiles-input')

  const groupeIngredientTag = document.querySelector('.ingredients-groupe')
  const groupeAppareilTag = document.querySelector('.appareils-groupe')
  const groupeUstensilTag = document.querySelector('.ustensiles-groupe')

  inputIngredientTag.addEventListener('click', () => {
    groupeAppareilTag.className = 'appareils-groupe'
    groupeIngredientTag.className = 'ingredients-groupe--deploye'
    groupeUstensilTag.className = 'ustensiles-groupe'
    groupeAppareilTag.innerHTML = ''
    groupeUstensilTag.innerHTML = ''
    const recettesAffichees = document.querySelectorAll('article:not(.invisible)')

    const tableauIngredients = []
    const tableauAppareils = []
    const tableauUstensiles = []
    recettesAffichees.forEach((recetteAffiche) => {
      const chaqueIngredient = recetteAffiche.querySelectorAll('.ingredient')
      const chaqueAppareils = recetteAffiche.querySelectorAll('.appareil')
      const chaqueUstensiles = recetteAffiche.querySelectorAll('.ustensile')

      chaqueIngredient.forEach((ingredient) => tableauIngredients.push(ingredient.textContent))
      chaqueAppareils.forEach((appareil) => tableauAppareils.push(appareil.textContent))
      chaqueUstensiles.forEach((ustensile) => tableauUstensiles.push(ustensile.textContent))
    })

    const chaqueIngredientSansDoublons = EffaceDoubleDonnees(tableauIngredients)

    if (groupeIngredientTag !== null) { groupeIngredientTag.innerHTML = '' }
    chaqueIngredientSansDoublons.forEach((motIngredientTag) => {
      groupeIngredientTag.appendChild(new Tag().tagDivIngredient(motIngredientTag))
    })
  })
  inputAppliancesTag.addEventListener('click', () => {
    const recettesAffichees = document.querySelectorAll('article:not(.invisible)')
    groupeAppareilTag.className = 'appareils-groupe--deploye'
    groupeIngredientTag.className = 'ingredients-groupe'
    groupeUstensilTag.className = 'ustensiles-groupe'
    groupeIngredientTag.innerHTML = ''
    groupeUstensilTag.innerHTML = ''
    const tableauIngredients = []
    const tableauAppareils = []
    const tableauUstensiles = []
    recettesAffichees.forEach((recetteAffiche) => {
      const chaqueIngredient = recetteAffiche.querySelectorAll('.ingredient')
      const chaqueAppareils = recetteAffiche.querySelectorAll('.appareil')
      const chaqueUstensiles = recetteAffiche.querySelectorAll('.ustensile')

      chaqueIngredient.forEach((ingredient) => tableauIngredients.push(ingredient.textContent))
      chaqueAppareils.forEach((appareil) => tableauAppareils.push(appareil.textContent))
      chaqueUstensiles.forEach((ustensile) => tableauUstensiles.push(ustensile.textContent))
    })
    const chaqueAppareilsSansDoublons = EffaceDoubleDonnees(tableauAppareils)

    if (groupeAppareilTag !== null) { groupeAppareilTag.innerHTML = '' }
    chaqueAppareilsSansDoublons.forEach((motAppareilTag) => {
      groupeAppareilTag.appendChild(new Tag().tagDivAppareil(motAppareilTag))
    })
  })
  inputUstensilsTag.addEventListener('click', () => {
    const recettesAffichees = document.querySelectorAll('article:not(.invisible)')
    groupeAppareilTag.className = 'appareils-groupe'
    groupeIngredientTag.className = 'ingredients-groupe'
    groupeUstensilTag.className = 'ustensiles-groupe--deploye'
    groupeAppareilTag.innerHTML = ''
    groupeIngredientTag.innerHTML = ''
    const tableauIngredients = []
    const tableauAppareils = []
    const tableauUstensiles = []
    recettesAffichees.forEach((recetteAffiche) => {
      const chaqueIngredient = recetteAffiche.querySelectorAll('.ingredient')
      const chaqueAppareils = recetteAffiche.querySelectorAll('.appareil')
      const chaqueUstensiles = recetteAffiche.querySelectorAll('.ustensile')

      chaqueIngredient.forEach((ingredient) => tableauIngredients.push(ingredient.textContent))
      chaqueAppareils.forEach((appareil) => tableauAppareils.push(appareil.textContent))
      chaqueUstensiles.forEach((ustensile) => tableauUstensiles.push(ustensile.textContent))
    })
    const chaqueUstensilesSansDoublons = EffaceDoubleDonnees(tableauUstensiles)

    if (groupeUstensilTag !== null) { groupeUstensilTag.innerHTML = '' }
    chaqueUstensilesSansDoublons.forEach((motUstensilTag) => {
      groupeUstensilTag.appendChild(new Tag().tagDivUstensil(motUstensilTag))
    })
  })
}
