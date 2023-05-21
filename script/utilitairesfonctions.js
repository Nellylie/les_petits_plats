// permet de retourner un seul element des multiples elements en comparant les index
export function formatOneData (datas) {
  const oneData = datas.filter((data, index) => {
    return datas.indexOf(data) === index
  })
  return oneData
}

// 1er caractère en majuscule
export function caseData (data) {
  const lowerCase = data.toLowerCase()
  return (lowerCase + '').charAt(0).toUpperCase() + lowerCase.substr(1)
}
