import fetch from 'src/util/fetch'

export function fetchR(query) {
    return fetch({
        url: '',
        method: 'get',
        data: query
    })
}
