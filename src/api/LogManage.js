import fetch from 'src/util/fetch'

export function fetchLog(query) {
    return fetch({
        url: '',
        method: 'get',
        data: query
    })
}
