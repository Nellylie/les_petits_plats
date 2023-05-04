import { ajouteElementTags, effaceElementTags } from './utilitairesfonctions.js'

export function tagDivIngredient (tagIngredients) {
  let clickBooleenVerification = false
  const baliseTagIngredient = document.createElement('div')
  baliseTagIngredient.setAttribute('class', 'tag-ingredient tag col-sm-auto')
  baliseTagIngredient.textContent = tagIngredients
  const tagIngredientId = tagIngredients.replaceAll(' ', '')
  baliseTagIngredient.setAttribute('id', tagIngredientId)
  baliseTagIngredient.addEventListener('click', () => {
    if (!clickBooleenVerification) {
      ajouteElementTags(baliseTagIngredient, tagIngredientId); clickBooleenVerification = true
    } else {
      effaceElementTags(tagIngredientId); clickBooleenVerification = false
    }
  })
  return baliseTagIngredient
}

export function tagDivAppareil (tagAppliance) {
  let clickBooleenVerification = false
  const baliseTagAppareil = document.createElement('div')
  baliseTagAppareil.setAttribute('class', 'tag-appareil tag col-sm-auto')
  baliseTagAppareil.textContent = tagAppliance
  const tagApplianceId = tagAppliance.replaceAll(' ', '')
  baliseTagAppareil.setAttribute('id', tagApplianceId)

  baliseTagAppareil.addEventListener('click', () => {
    if (!clickBooleenVerification) {
      ajouteElementTags(baliseTagAppareil, tagApplianceId); clickBooleenVerification = true
    } else {
      effaceElementTags(tagApplianceId); clickBooleenVerification = false
    }
  })
  return baliseTagAppareil
}

export function tagDivUstensil (tagUstensile) {
  let clickBooleenVerification = false
  const baliseTagUstensile = document.createElement('div')
  baliseTagUstensile.setAttribute('class', 'tag-ustensile tag col-sm-auto')
  baliseTagUstensile.textContent = tagUstensile
  const tagUstensileId = tagUstensile.replaceAll(' ', '')
  baliseTagUstensile.setAttribute('id', tagUstensileId)

  baliseTagUstensile.addEventListener('click', () => {
    if (!clickBooleenVerification) {
      ajouteElementTags(baliseTagUstensile, tagUstensileId); clickBooleenVerification = true
    } else {
      effaceElementTags(tagUstensileId); clickBooleenVerification = false
    }
  })
  return baliseTagUstensile
}
