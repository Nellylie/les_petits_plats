
export function formatData (datas) {
  const oneData = datas.filter((data, index) => {
    return datas.indexOf(data) === index
  })
  return oneData
}

export function caseData (data) {
  return data.toLowerCase()
}
