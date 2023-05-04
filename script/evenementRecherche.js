import { declencheurTriArticleAffiche } from './filtreArticleAffiche.js'
import { tagDivAppareil, tagDivUstensil, tagDivIngredient } from './tag.js'
import { effaceDoubleDonnees } from './utilitairesfonctions.js'
import { rechercherTag } from './tagRecherche.js'
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

  document.querySelector('.recettes').addEventListener('mouseover', () => {
    groupeIngredientTag.innerHTML = ''
    groupeAppareilTag.innerHTML = ''
    groupeUstensilTag.innerHTML = ''
    inputIngredientTag.value = ''
    inputAppliancesTag.value = ''
    inputUstensilsTag.value = ''
    inputAppliancesTag.className = ('appareils-input')
    inputUstensilsTag.className = ('ustensiles-input')
    inputIngredientTag.className = ('ingredients-input')
    document.getElementsByName('ingredients-name')[0].placeholder = 'Ingredients'
    document.getElementsByName('appareils-name')[0].placeholder = 'Appareils'
    document.getElementsByName('ustensiles-name')[0].placeholder = 'Ustensiles'
  })

  inputIngredientTag.addEventListener('click', () => {
    document.getElementsByName('ingredients-name')[0].placeholder = 'Rechercher un ingredient'
    inputIngredientTag.className = ('ingredients-input--taille')
    inputAppliancesTag.className = ('appareils-input')
    inputUstensilsTag.className = ('ustensiles-input')
  })
  inputAppliancesTag.addEventListener('click', () => {
    document.getElementsByName('appareils-name')[0].placeholder = 'Rechercher un appareil'
    inputIngredientTag.className = ('ingredients-input')
    inputAppliancesTag.className = ('appareils-input--taille')
    inputUstensilsTag.className = ('ustensiles-input')
  })
  inputUstensilsTag.addEventListener('click', () => {
    document.getElementsByName('ustensiles-name')[0].placeholder = 'Rechercher un ustensile'
    inputIngredientTag.className = ('ingredients-input')
    inputAppliancesTag.className = ('appareils-input')
    inputUstensilsTag.className = ('ustensiles-input--taille')
  })

  inputIngredientTag.addEventListener('input', (e) => {
    const motRecherche = e.target.value
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

      chaqueIngredient.forEach((ingredient) => tableauIngredients.push(ingredient.textContent.toLowerCase()))
      chaqueAppareils.forEach((appareil) => tableauAppareils.push(appareil.textContent.toLowerCase()))
      chaqueUstensiles.forEach((ustensile) => tableauUstensiles.push(ustensile.textContent.toLowerCase()))
    })

    const chaqueIngredientSansDoublons = effaceDoubleDonnees(tableauIngredients)

    const tagsCorrespondants = rechercherTag(motRecherche, chaqueIngredientSansDoublons)
    if (groupeIngredientTag !== null) { groupeIngredientTag.innerHTML = '' }
    tagsCorrespondants.forEach((motIngredientTag) => {
      groupeIngredientTag.appendChild(tagDivIngredient(motIngredientTag))
    })
  })
  inputAppliancesTag.addEventListener('input', (e) => {
    const motRecherche = e.target.value
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

      chaqueIngredient.forEach((ingredient) => tableauIngredients.push(ingredient.textContent.toLowerCase()))
      chaqueAppareils.forEach((appareil) => tableauAppareils.push(appareil.textContent.toLowerCase()))
      chaqueUstensiles.forEach((ustensile) => tableauUstensiles.push(ustensile.textContent.toLowerCase()))
    })
    const chaqueAppareilsSansDoublons = effaceDoubleDonnees(tableauAppareils)
    const tagsCorrespondants = rechercherTag(motRecherche, chaqueAppareilsSansDoublons)
    if (groupeAppareilTag !== null) { groupeAppareilTag.innerHTML = '' }
    tagsCorrespondants.forEach((motAppareilTag) => {
      groupeAppareilTag.appendChild(tagDivAppareil(motAppareilTag))
    })
  })
  inputUstensilsTag.addEventListener('input', (e) => {
    const motRecherche = e.target.value
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

      chaqueIngredient.forEach((ingredient) => tableauIngredients.push(ingredient.textContent.toLowerCase()))
      chaqueAppareils.forEach((appareil) => tableauAppareils.push(appareil.textContent.toLowerCase()))
      chaqueUstensiles.forEach((ustensile) => tableauUstensiles.push(ustensile.textContent.toLowerCase()))
    })
    const chaqueUstensilesSansDoublons = effaceDoubleDonnees(tableauUstensiles)
    const tagsCorrespondants = rechercherTag(motRecherche, chaqueUstensilesSansDoublons)

    if (groupeUstensilTag !== null) { groupeUstensilTag.innerHTML = '' }
    tagsCorrespondants.forEach((motUstensilTag) => {
      groupeUstensilTag.appendChild(tagDivUstensil(motUstensilTag))
    })
  })
}
