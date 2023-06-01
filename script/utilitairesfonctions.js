// permet de retourner un seul element des multiples elements en comparant les index
export function formatOneData (datas) {
  const dataNoMultiple = datas.filter((data, index) => {
    return datas.indexOf(data) === index
  })
  const dataNoS = []
  dataNoMultiple.forEach((data, index, parent) => {
    if (data.charAt(data.length - 1) === 's' && parent.includes(data.substr(0, data.length - 1)) === false) {
      dataNoS.push(data)
    } else if (data.charAt(data.length - 1) !== 's') {
      dataNoS.push(data)
    }
  })
  return dataNoS
}

// 1er caractère en majuscule
export function caseData (data) {
  const lowerCase = data.toLowerCase()
  return (lowerCase + '').charAt(0).toUpperCase() + lowerCase.substr(1)
}
