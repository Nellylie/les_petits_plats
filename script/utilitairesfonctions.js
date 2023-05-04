export function ajouteElementTags (elementTag, idTag) {
  const tagContain = document.querySelector('.tag-affiche')
  console.log('e', tagContain.querySelector(`#${idTag}`))
  if (tagContain.querySelector(`#${idTag}`) === null) {
    const iconeCross = document.createElement('i')
    iconeCross.setAttribute('class', 'fa-regular fa-circle-xmark fa-padding')
    elementTag.appendChild(iconeCross)
    tagContain.appendChild(elementTag)
  }
}

export function effaceElementTags (tagIngredientId) {
  const tagContain = document.querySelector('.tag-affiche')
  const tagBaliseIngredientId = document.querySelector(`#${tagIngredientId}`)
  tagContain.removeChild(tagBaliseIngredientId)
}

export function effaceDoubleDonnees (donnees) {
  const chaqueDonnees = donnees.filter((donnee, index) => {
    return donnees.indexOf(donnee) === index
  })

  return chaqueDonnees
}
