

export const groupBy = (list:any[],fun:Function)=>{
  const groupData = {}
  list.forEach((item)=>{
      const con = fun(item)
      // 对象key 唯一
      groupData[con] = groupData[con] || []
      groupData[con].push(item)
  })
  return groupData
}
