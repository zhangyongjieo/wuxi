import fetch from 'src/util/fetch'

export function fetchStatistics(query) {
    return fetch({
        url: '/fzzx/jjd/dataStatistical',
        method: 'get',
        params: query
    })
}
