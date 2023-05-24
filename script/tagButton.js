// construit le bouton pour les tags
export function tagButton (tagData, type) {
  let clickBooleenVerification = false
  const divTagButton = document.createElement('div')
  divTagButton.setAttribute('class', `tag-${type} tag col-sm-auto`)
  divTagButton.textContent = tagData
  divTagButton.setAttribute('name', tagData.split('(')[0])
  const tagId = tagData.replaceAll(' ', '').replaceAll("'", '').replaceAll('%', '').split('(')[0]
  divTagButton.setAttribute('id', tagId)
  // le rend cliquable
  divTagButton.addEventListener('click', () => {
    // cette variable permet de le selectionner et le deselectionner
    if (!clickBooleenVerification) {
      // communique en parametre sa balise + son id
      addTag(divTagButton, tagId); clickBooleenVerification = true
    } else {
      deleteTag(tagId); clickBooleenVerification = false
    }
  })
  return divTagButton
}

// permet d'ajouter le tag à la selection
function addTag (divTagButton, tagId) {
  const tagContain = document.querySelector('.tag-affiche')
  if (tagContain.querySelector(`#${tagId}`) === null) {
    const iconeCross = document.createElement('i')
    iconeCross.setAttribute('class', 'fa-regular fa-circle-xmark fa-padding close')
    divTagButton.appendChild(iconeCross)
    tagContain.appendChild(divTagButton)
  }
}
// permet d'effacer le tag de la selection
function deleteTag (tagId) {
  const tagContain = document.querySelector('.tag-affiche')
  const divTagButton = document.querySelector(`#${tagId}`)
  tagContain.removeChild(divTagButton)
}

// gère la position du chevron
export function angleIconeMove (direction, index) {
  document.getElementById(`i-${index}`).className = `fa-solid fa-angle-${direction} fa-xl icone-position col-1`
}

// gère l'affichage sur l'interface des listes
export function displayTagClickDom (type) {
  const liste = document.querySelector(`.${type}-groupe`)
  liste.classList.add(`${type}-groupe--visible`)
}

// gère l'effacement sur l'interface des listes
export function hideTagClickDom (type) {
  const liste = document.querySelector(`.${type}-groupe--visible`)
  if (liste !== null) {
    liste.classList.remove(`${type}-groupe--visible`)
  }
}
