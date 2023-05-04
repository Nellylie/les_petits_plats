export function rechercherTag (mot, listeTags) {
  const rechercheUtilisateur = new RegExp(mot, 'gi')
  const listeTagsActualise = listeTags.filter((tag) => tag.match(rechercheUtilisateur))
  return listeTagsActualise
}
