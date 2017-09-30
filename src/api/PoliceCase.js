import fetch from 'src/util/fetch'

export function fetchList(query) {
    return fetch({
        url: '/fzzx/jjd/data',
        method: 'get',
        params: query
    })
}

export function fetchMenu() {
    return fetch({
        url: '/fzzx/jjd/diclist',
        method:'get'
    })
}

export function addCase(params) {
    return fetch({
        url: '/fzzx/jjd/edit',
        method: 'post',
        data: params
    })
}

export function delById(query) {
    return fetch({
        url: '/fzzx/jjd/deleteid',
        method: 'get',
        params: query
    })
}

export function fetchById(query) {
    return fetch({
        url: '/fzzx/jjd/selectid',
        method: 'get',
        params: query
    })
}

export function fetchMobileInfo(query) {
    return fetch({
        url: '/fzzx/jjd/mobileAttribution',
        method: 'get',
        params: query
    })
}

export function fetchBankcardInfo(query) {
    return fetch({
        url: '/fzzx/jjd/bankSearch',
        method: 'get',
        params: query
    })
}

export function fetchAnalysisInfo(params) {
    return fetch({
        url: '/fzzx/jjd/caseAnalysis',
        method: 'post',
        data: params
    })
}

export function downloadFile() {
    return fetch({
        url: '/fzzx/jjd/export',
        method: 'get',
    })
}

export function fetchOrganization(query) {
    return fetch({
        url: 'fzzx/jjd/selectLikeDw',
        method: 'get',
        params: query
    })
}

export function fetchOrganizationById(query) {
    return fetch({
        url: 'fzzx/jjd/selectDwById',
        method: 'get',
        params: query
    })
}
