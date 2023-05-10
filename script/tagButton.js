export function tagButton (tagData, type) {
  let clickBooleenVerification = false
  const divTagButton = document.createElement('div')
  divTagButton.setAttribute('class', `tag-${type} tag col-sm-auto`)
  divTagButton.textContent = tagData
  const tagId = tagData.replaceAll(' ', '')
  divTagButton.setAttribute('id', tagId)
  divTagButton.addEventListener('click', () => {
    if (!clickBooleenVerification) {
      addTag(divTagButton, tagId); clickBooleenVerification = true
    } else {
      deleteTag(tagId); clickBooleenVerification = false
    }
  })
  return divTagButton
}

function addTag (divTagButton, tagId) {
  const tagContain = document.querySelector('.tag-affiche')
  console.log('e', tagContain.querySelector(`#${tagId}`))
  if (tagContain.querySelector(`#${tagId}`) === null) {
    const iconeCross = document.createElement('i')
    iconeCross.setAttribute('class', 'fa-regular fa-circle-xmark fa-padding')
    divTagButton.appendChild(iconeCross)
    tagContain.appendChild(divTagButton)
  }
}

function deleteTag (tagId) {
  const tagContain = document.querySelector('.tag-affiche')
  const divTagButton = document.querySelector(`#${tagId}`)
  tagContain.removeChild(divTagButton)
}

export function angleIconeMove (direction, index) {
  document.getElementById(`i-${index}`).className = `fa-solid fa-angle-${direction} fa-xl icone-position col-1`
}

export function displayTagClickDomIngredient () {
  const listeIngredient = document.querySelector('.ingredients-groupe')
  listeIngredient.classList.add('ingredients-groupe--visible')
  angleIconeMove('up', '0')
  angleIconeMove('down', '1')
  angleIconeMove('down', '2')
}

export function displayTagClickDomAppliance () {
  const listeAppliance = document.querySelector('.appareils-groupe')
  listeAppliance.classList.add('appareils-groupe--visible')
  angleIconeMove('up', '1')
  angleIconeMove('down', '0')
  angleIconeMove('down', '2')
}

export function displayTagClickDomUstensil () {
  const listeUstensil = document.querySelector('.ustensiles-groupe')
  listeUstensil.classList.add('ustensiles-groupe--visible')
  angleIconeMove('up', '2')
  angleIconeMove('down', '1')
  angleIconeMove('down', '0')
}

export function hideTagClickDomIngredient () {
  const listeIngredient = document.querySelector('.ingredients-groupe--visible')
  if (listeIngredient !== null) {
    listeIngredient.classList.remove('ingredients-groupe--visible')
    angleIconeMove('down', '0')
  }
}

export function hideTagClickDomAppliance () {
  const listeAppliance = document.querySelector('.appareils-groupe--visible')
  if (listeAppliance !== null) {
    listeAppliance.classList.remove('appareils-groupe--visible')
    angleIconeMove('down', '1')
  }
}

export function hideTagClickDomUstensil () {
  const listeUstensil = document.querySelector('.ustensiles-groupe--visible')
  if (listeUstensil !== null) {
    listeUstensil.classList.remove('ustensiles-groupe--visible')
    angleIconeMove('down', '2')
  }
}
