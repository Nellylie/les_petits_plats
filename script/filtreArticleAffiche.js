
function matchRegexMot (motRecherche, balise) {
  const rechercheUtilisateur = new RegExp(motRecherche, 'gi')
  const baliseTexteBooleen = rechercheUtilisateur.test(balise.textContent)
  return baliseTexteBooleen
}
export function declencheurTriArticleAffiche (motRecherche) {
  const tousArticles = document.querySelectorAll('.recettes-article')
  tousArticles.forEach((elementArticle) => {
    const articleClass = 'recettes-article'
    if (matchRegexMot(motRecherche, elementArticle)) {
      elementArticle.className = articleClass
    } else if (!matchRegexMot(motRecherche, elementArticle)) {
      elementArticle.className = articleClass + ' invisible'
    }
  })
}
