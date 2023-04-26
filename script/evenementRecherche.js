import { declencheurTriArticleAffiche } from './filtreArticleAffiche.js'

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
}
