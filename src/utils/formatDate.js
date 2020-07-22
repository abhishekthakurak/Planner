export const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  export default (date, getArr) => {
    let d = (date && new Date(date)) || new Date()
    const result = [d.getDate(), months[d.getMonth()], d.getFullYear()]
    if (getArr) {
      return result
    }
    //  Month Date, Year eg May 24, 2019
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
  }