import { getRecipes } from './getdata.js'
import { Recettefactory } from './Recettefactory.js'
const lesRecettes = await getRecipes()
const parentCartes = document.querySelector('.recettes')
console.log('div', parentCartes)
parentCartes.innerHTML = new Recettefactory(lesRecettes).factoryCartes()
