import * as fetch from 'axios';

export function formatDate(unix) {
    function fixedZero(num) {
        return num >= 10 ? ('' + num) : ('0' + num)
    }

    let date = new Date(unix)

    let year = date.getFullYear()
    let month = fixedZero(date.getMonth() + 1)
    let day = fixedZero(date.getDate())
    let hour = fixedZero(date.getHours())
    let min = fixedZero(date.getMinutes())
    let seconds = fixedZero(date.getSeconds())

    let timeStr = `${year}-${month}-${day} ${hour}:${min}:${seconds}`
    return timeStr
}

// const instance = fetch.create({
//     baseURL: 'http://t.weather.sojson.com/api/weather/city',
//     timeout: 15000
// })
//
// export const xhr = {
//     get(url, data, config) {
//         return new Promise((resolve, reject) => {
//             instance.get(url, {params: data}, config).then(res => {
//                 resolve(res.data)
//             }).catch(err => {
//                 reject(err)
//             })
//         })
//     }
// }

